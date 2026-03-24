// src/utils/simulateBreach.js
import { securityEngine } from '../lib/alertsEngine.js';

/**
 * Simulates a "Scouting" behavior signature for testing the STP model.
 * Injects a sequence of telemetry events that should trigger a High-Confidence AI Prediction.
 */
export async function simulateScoutingBreach() {
    const visitorId = "V-SURV-99";
    console.log(`[SIMULATION] Starting scouting signature for ${visitorId}...`);
    
    // Step 1: Normal entry
    await securityEngine.processEvent({ type: 'CHECK_IN' }, { visitorId, zone: 'Reception' });

    // Step 2: Telemetry sequence showing dwelling near high-value zone
    const trajectorySteps = [
        { x: 0.1, y: 0.1, thermal: 36.8, sentiment: 'Calm' },
        { x: 0.4, y: 0.4, thermal: 36.9, sentiment: 'Calm' },
        { x: 0.8, y: 0.1, thermal: 37.2, sentiment: 'Neutral' }, // Moving toward sensitive area
        { x: 0.85, y: 0.12, thermal: 38.4, sentiment: 'Agitated' }, // High dwell + Thermal spike
        { x: 0.86, y: 0.11, thermal: 38.6, sentiment: 'Agitated' }, 
        { x: 0.85, y: 0.13, thermal: 38.9, sentiment: 'Agitated' }
    ];

    for (const step of trajectorySteps) {
        await new Promise(r => setTimeout(r, 1000)); // 1s intervals
        console.log(`[SIMULATION] Sending telemetry: Coord(${step.x}, ${step.y})`);
        
        await securityEngine.processEvent({ type: 'TELEMETRY' }, {
            visitorId,
            ...step,
            accessLevel: 1,
            currentZoneName: 'Main Vault Corridor'
        });
    }

    console.log("[SIMULATION] Scouting signature complete. Check the Cyber-Grid Dashboard for AI-Predicted alerts.");
}

// Auto-run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    simulateScoutingBreach();
}
