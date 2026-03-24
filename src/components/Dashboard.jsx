import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserCheck, Clock, ArrowUpRight, ShieldAlert, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { securityEngine, SEVERITY } from '../lib/alertsEngine';

const Dashboard = ({ history }) => {
    const [alerts, setAlerts] = useState([]);

    // 7. Subscribe to real-time UI updates
    useEffect(() => {
        // Secure subscription using simulated token (Session-based, NOT API key)
        const unsubscribe = securityEngine.subscribe('valid_session_token', (currentAlerts) => {
            setAlerts(currentAlerts);
        });

        // Simulating real-time incoming anomaly events from sensors
        let anomalyTimer = setInterval(() => {
            const r = Math.random();
            if (r > 0.95) {
                // Rule D: Repeated Failed Biometrics simulation
                securityEngine.processEvent({ type: 'BIOMETRIC_FAIL' }, { recentFails: 3, zone: 'R&D Entrance' });
            } else if (r > 0.90) {
                // Rule A: Wandering Visitor simulation
                securityEngine.processEvent({ type: 'ZONE_CHANGE', targetZone: 'Server Room' }, { visitor: { authorizedZone: 'Lobby' } });
            }
        }, 10000);

        return () => {
            unsubscribe();
            clearInterval(anomalyTimer);
        };
    }, []);

    const acknowledgeAlert = (id) => {
        securityEngine.acknowledgeAlert(id);
    };

    const stats = [
        { label: 'Total Visitors Today', value: '24', icon: Users, color: 'text-blue-400', trend: '+12%' },
        { label: 'Currently in Building', value: '08', icon: UserCheck, color: 'text-emerald-400', trend: '-2%' },
        { label: 'Active Alerts', value: alerts.filter(a => a.status === 'NEW').length.toString().padStart(2, '0'), icon: ShieldAlert, color: 'text-rose-400', trend: 'LIVE' },
        { label: 'Avg. Check-in Time', value: '1.2m', icon: Clock, color: 'text-amber-400', trend: '-15%' },
    ];

const getSeverityStyles = (severity) => {
        switch (severity) {
            case SEVERITY.CRITICAL: return 'border-red-500/50 bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
            case SEVERITY.HIGH: return 'border-orange-500/50 bg-orange-500/10 text-orange-500';
            case SEVERITY.MEDIUM: return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500';
            case SEVERITY.AI_PREDICTED: return 'border-brand-primary/50 bg-brand-primary/10 text-brand-primary shadow-[0_0_15px_rgba(0,242,255,0.1)]';
            default: return 'border-blue-500/50 bg-blue-500/10 text-blue-500';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">System Overview</h2>
                    <p className="text-white/50 mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Zero-Trust Predictive Engine Active (v2.0-STP)
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => securityEngine.processEvent({ type: 'TELEMETRY' }, { 
                            x: 0.89, y: 0.12, thermal: 38.2, sentiment: 'Agitated', accessLevel: 1, currentZoneName: 'High-Value Asset Zone' 
                        })}
                        className="glass-button flex items-center gap-2 text-xs font-semibold hover:border-brand-primary/50 text-brand-primary"
                    >
                        <ShieldAlert className="w-4 h-4" />
                        SIMULATE AI BREACH SIGNATURE
                    </button>
                    <button
                        onClick={() => securityEngine.processEvent({ type: 'DUPLICATE_SCAN' }, { distanceBetweenScans: 200 })}
                        className="glass-button flex items-center gap-2 text-xs font-semibold hover:border-red-500/50"
                    >
                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                        PASSBACK TEST
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 group hover:border-brand-primary/30 transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-brand-primary/10 transition-colors" />
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-brand-primary'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-white/40 text-xs font-medium uppercase tracking-wider">{stat.label}</h3>
                        <p className={`text-3xl font-bold mt-1 tabular-nums ${stat.label === 'Active Alerts' && alerts.some(a => a.status === 'NEW') ? 'text-red-400 animate-pulse' : ''}`}>{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-card p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold flex items-center gap-2 text-lg">
                            <Clock className="w-5 h-5 text-brand-primary" />
                            Live Telemetry Stream
                        </h3>
                        <button className="text-xs text-brand-primary font-bold hover:underline underline-offset-4 tracking-widest uppercase">Export Logs</button>
                    </div>
                    <div className="space-y-4">
                        {history.slice(0, 5).map((visitor, i) => (
                            <motion.div
                                key={visitor.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center font-bold text-brand-primary text-sm border border-brand-primary/30">
                                    {visitor.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm tracking-wide">{visitor.name}</h4>
                                    <p className="text-xs text-white/40">{visitor.purpose}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-mono text-white/60">{visitor.time}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/5 ${visitor.status === 'Checked In' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                                        {visitor.status.toUpperCase()}
                                    </span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-brand-primary transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* AI Insights & Real-Time Alerts Queue */}
                <div className="glass-card p-8 bg-gradient-to-br from-brand-primary/5 to-transparent border-brand-primary/20 flex flex-col h-full min-h-[600px]">
                    <h3 className="font-bold flex items-center justify-between mb-6">
                        <span className="flex items-center gap-2 text-lg">
                            <ShieldAlert className="w-5 h-5 text-brand-primary" />
                            Zero-Trust Alert Queue
                        </span>
                        {alerts.filter(a => a.status === 'NEW').length > 0 && (
                            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-500 text-[10px] font-bold">ACTION REQUIRED</span>
                        )}
                    </h3>

                    <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1 mb-6">
                        <AnimatePresence mode="popLayout">
                            {alerts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                                    <CheckCircle className="w-12 h-12 mb-4 text-emerald-500" />
                                    <p className="text-sm font-medium italic">No active threats detected.</p>
                                    <p className="text-[10px] uppercase tracking-widest mt-2">All facility nodes secure</p>
                                </div>
                            ) : (
                                alerts.map((alert) => (
                                    <motion.div
                                        key={alert.id}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`p-5 rounded-2xl border ${getSeverityStyles(alert.severity)} transition-all backdrop-blur-md ${alert.status === 'ACKNOWLEDGED' ? 'opacity-40 grayscale blur-[0.5px]' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <Activity className={`w-4 h-4 ${alert.severity === SEVERITY.AI_PREDICTED ? 'animate-pulse' : ''}`} />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{alert.severity}</span>
                                            </div>
                                            <span className="text-[10px] opacity-70 font-mono bg-black/30 px-2 py-0.5 rounded">
                                                {new Date(alert.timestamp).toLocaleTimeString([], { hour12: false })}
                                            </span>
                                        </div>
                                        
                                        <h4 className="font-bold text-base mb-2 tracking-tight">{alert.name}</h4>
                                        
                                        {/* Predictive Analytics visualization */}
                                        {alert.severity === SEVERITY.AI_PREDICTED && (
                                            <div className="my-3 space-y-2">
                                                <div className="flex justify-between text-[10px] font-bold mb-1">
                                                    <span className="opacity-60 uppercase">Breach Probability</span>
                                                    <span className="text-brand-primary">{alert.context.probability}</span>
                                                </div>
                                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: alert.context.probability }}
                                                        className="h-full bg-brand-primary shadow-[0_0_8px_#00f2ff]"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-1 mt-4">
                                            {alert.context.evidence ? (
                                                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                                    <p className="text-[10px] text-white/40 uppercase font-bold mb-2 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> Evidence Chain
                                                    </p>
                                                    {alert.context.evidence.map((line, idx) => (
                                                        <div key={idx} className="text-[10px] font-mono text-white/70 py-0.5 border-l border-brand-primary/30 pl-2 mb-1">
                                                            {line}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-xs opacity-80 font-mono break-all bg-black/20 p-2 rounded">
                                                    {JSON.stringify(alert.context, null, 2)}
                                                </div>
                                            )}
                                        </div>

                                        {alert.status === 'NEW' ? (
                                            <button
                                                onClick={() => acknowledgeAlert(alert.id)}
                                                className={`w-full mt-4 py-2.5 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase transition-all ${
                                                    alert.severity === SEVERITY.CRITICAL 
                                                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20' 
                                                    : 'bg-brand-primary text-black hover:opacity-80 shadow-lg shadow-brand-primary/20'
                                                }`}
                                            >
                                                Acknowledge Thread
                                            </button>
                                        ) : (
                                            <div className="mt-4 flex items-center justify-center gap-2 py-2 text-[10px] font-black opacity-50 uppercase tracking-widest border border-white/10 rounded-xl">
                                                <CheckCircle className="w-3 h-3 text-emerald-500" />
                                                Threat Resolved
                                            </div>
                                        )}
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {/* AI Engine Status */}
                    <div className="pt-6 border-t border-brand-primary/10 mt-auto">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Neural Mesh Status</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-brand-primary font-mono select-none">STP-MODEL ONLINE</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-[9px] text-white/30 uppercase font-black mb-1">Inference Latency</p>
                                <p className="text-lg font-mono text-brand-primary font-bold">12ms</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-[9px] text-white/30 uppercase font-black mb-1">Model Confidence</p>
                                <p className="text-lg font-mono text-emerald-400 font-bold">99.4%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
