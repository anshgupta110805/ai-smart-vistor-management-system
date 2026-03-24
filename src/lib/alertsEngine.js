// src/lib/alertsEngine.js
import { stpModel, SCOUTING_CLASSES } from './predictionModel.js';

export const SEVERITY = {
    CRITICAL: 'CRITICAL',
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW',
    AI_PREDICTED: 'AI_PREDICTED' // New level for probabilistic alerts
};

// 1. Immutable Rules Database Configuration
const alertRules = [
    {
        id: 'rule_1_v1',
        name: 'Wandering Visitor',
        severity: SEVERITY.HIGH,
        active: true,
        evaluate: (event, context) => {
            return event.type === 'ZONE_CHANGE' &&
                context.visitor?.authorizedZone !== event.targetZone;
        }
    },
    {
        id: 'rule_2_v1',
        name: 'After-Hours Access Attempt',
        severity: SEVERITY.HIGH,
        active: true,
        evaluate: (event, context) => {
            const currentHour = new Date().getHours();
            return event.type === 'CHECK_IN' && (currentHour < 6 || currentHour > 18);
        }
    },
    {
        id: 'rule_3_v1',
        name: 'Repeated Failed Biometrics',
        severity: SEVERITY.CRITICAL,
        active: true,
        evaluate: (event, context) => {
            return event.type === 'BIOMETRIC_FAIL' && context.recentFails >= 3;
        }
    },
    {
        id: 'rule_4_v1',
        name: 'Passback Violation / Badge Cloned',
        severity: SEVERITY.CRITICAL,
        active: true,
        evaluate: (event, context) => {
            return event.type === 'DUPLICATE_SCAN' && context.distanceBetweenScans > 100;
        }
    }
];

class SecurityAlertsSystem {
    constructor() {
        this.subscribers = [];
        this.activeAlerts = [];
        this.visitorStates = new Map(); // Store trajectory & metadata history for AI inference

        // Asynchronous initialization of the TF.js model
        setTimeout(async () => {
            try {
                await stpModel.init();
                console.log("[STP-MODEL] AI System Online - Predictive Threat Modeling Active.");
            } catch (err) {
                console.error("[STP-MODEL] Initialization failed:", err);
            }
        }, 100);
    }

    /**
     * AI-Powered Behavior Prediction
     * @param {string} visitorId
     * @param {Object} event
     * @param {Object} metadata - { x, y, accessLevel, thermal, sentiment, currentZoneName, visitFrequency }
     */
    async predictBehavior(visitorId, event, metadata) {
        if (!this.visitorStates.has(visitorId)) {
            this.visitorStates.set(visitorId, { trajectory: [], metadata: {} });
        }

        const state = this.visitorStates.get(visitorId);
        const lastStep = state.trajectory[state.trajectory.length - 1];
        const timestamp = Date.now();
        const timeDelta = lastStep ? (timestamp - lastStep.timestamp) / 1000 : 0;

        // Record normalized movement
        state.trajectory.push({
            x: metadata.x !== undefined ? metadata.x : 0.5,
            y: metadata.y !== undefined ? metadata.y : 0.5,
            timeDelta,
            timestamp
        });

        // Windowing for sequence models
        if (state.trajectory.length > 10) state.trajectory.shift();

        state.metadata = {
            accessLevel: metadata.accessLevel || 1,
            thermalNormalized: metadata.thermal > 37.5 ? 1.0 : 0.0,
            sentimentScore: metadata.sentiment === 'Agitated' ? 0.9 : 0.2,
            currentZoneID: metadata.currentZoneID || 1,
            currentZoneName: metadata.currentZoneName || 'General Zone',
            visitFrequency: metadata.visitFrequency || 1
        };

        try {
            // TF.js Inference
            const prediction = await stpModel.predict({
                trajectory: state.trajectory,
                metadata: state.metadata
            });

            // Threshold for triggering predictive alerts
            const TRIGGER_THRESHOLD = 0.65;

            if (prediction.breachProbability > TRIGGER_THRESHOLD && prediction.classification !== SCOUTING_CLASSES.NORMAL) {
                console.info(`[STP-MODEL] Predictive Alert: ${prediction.classification} (Prob: ${prediction.breachProbability.toFixed(3)})`);

                this.createNewAlert({
                    ruleId: 'ai_stp_v2',
                    name: `AI PREDICTION: ${prediction.classification.replace(/_/g, ' ')}`,
                    severity: prediction.breachProbability > 0.85 ? SEVERITY.CRITICAL : SEVERITY.AI_PREDICTED,
                    context: {
                        probability: (prediction.breachProbability * 100).toFixed(1) + '%',
                        confidence: (prediction.confidence * 100).toFixed(1) + '%',
                        behavior: prediction.classification,
                        evidence: prediction.evidenceChain,
                        visitorId: visitorId,
                        zone: state.metadata.currentZoneName
                    }
                });
            }
        } catch (error) {
            console.error("[STP-MODEL] Inference failed, falling back to deterministic rules:", error);
        }
    }

    async processEvent(event, context) {
        const visitorId = context.visitorId || `v_${Math.random().toString(36).substr(2, 5)}`;

        // A. Deterministic Rules
        alertRules.filter(r => r.active).forEach(rule => {
            if (rule.evaluate(event, context)) {
                this.createNewAlert({
                    ruleId: rule.id,
                    name: rule.name,
                    severity: rule.severity,
                    context: { ...context, visitorId }
                });
            }
        });

        // B. Predictive Behavioral Logic
        const motionEvents = ['ZONE_CHANGE', 'SCAN_EVENT', 'HEARTBEAT', 'TELEMETRY'];
        if (motionEvents.includes(event.type)) {
            // Predictive models enrich signals in parallel
            this.predictBehavior(visitorId, event, context);
        }

        return this.activeAlerts;
    }

    async processBatch(events) {
        // High-performance batch processing for multiple visitors
        return Promise.all(events.map(e => this.processEvent(e.event, e.context)));
    }

    createNewAlert(config) {
        const newAlert = {
            id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            ruleId: config.ruleId,
            name: config.name,
            severity: config.severity,
            timestamp: new Date().toISOString(),
            context: config.context,
            status: 'NEW'
        };

        this.activeAlerts.unshift(newAlert);
        this.notifySubscribers();
        this.handleEscalation([newAlert]);
        return newAlert;
    }

    handleEscalation(alerts) {
        alerts.forEach(alert => {
            // T-Series Escalation Protocol Integration
            if (alert.severity === SEVERITY.CRITICAL || alert.severity === SEVERITY.AI_PREDICTED) {
                const isHighProbBreach = alert.severity === SEVERITY.AI_PREDICTED &&
                    parseFloat(alert.context.probability) > 85;

                // T+0: Instant Context Injection (CCTV/Lockdown Ready)
                console.warn(`[T+0s ESCALATION] ${alert.name} in ${alert.context.zone || 'Unknown Zone'}. Preparing CCTV context.`);

                // T+30: Manager Paging if unacknowledged
                setTimeout(() => {
                    const active = this.activeAlerts.find(a => a.id === alert.id);
                    if (active && active.status === 'NEW') {
                        console.error(`[T+30s ESCALATION] Alert ${alert.id} UNACKNOWLEDGED. Paging shift manager.`);

                        if (isHighProbBreach || alert.severity === SEVERITY.CRITICAL) {
                            // T+60: Global Escalation / Facility Lockdown
                            setTimeout(() => {
                                const stillActive = this.activeAlerts.find(a => a.id === alert.id);
                                if (stillActive && stillActive.status === 'NEW') {
                                    console.error(`[T+60s GLOBAL ESCALATION] CRITICAL BREACH PATTERN CONFIRMED. Initiating automated facility protocol.`);
                                }
                            }, 30000);
                        }
                    }
                }, 30000);
            }
        });
    }

    subscribe(sessionToken, callback) {
        this.subscribers.push(callback);
        callback([...this.activeAlerts]);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    notifySubscribers() {
        this.subscribers.forEach(cb => cb([...this.activeAlerts]));
    }

    acknowledgeAlert(alertId) {
        const alert = this.activeAlerts.find(a => a.id === alertId);
        if (alert) {
            alert.status = 'ACKNOWLEDGED';
            alert.resolutionTime = new Date().toISOString();
            this.notifySubscribers();
        }
    }
}

export const securityEngine = new SecurityAlertsSystem();
