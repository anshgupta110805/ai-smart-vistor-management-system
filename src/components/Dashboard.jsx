import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Clock, ArrowUpRight, ShieldAlert, Activity } from 'lucide-react';

const Dashboard = ({ history }) => {
    const stats = [
        { label: 'Total Visitors Today', value: '24', icon: Users, color: 'text-blue-400', trend: '+12%' },
        { label: 'Currently in Building', value: '08', icon: UserCheck, color: 'text-emerald-400', trend: '-2%' },
        { label: 'Unauthorized Attempts', value: '01', icon: ShieldAlert, color: 'text-rose-400', trend: '0%' },
        { label: 'Avg. Check-in Time', value: '1.2m', icon: Clock, color: 'text-amber-400', trend: '-15%' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
                    <p className="text-white/50 mt-1">Real-time monitoring of facility access and security.</p>
                </div>
                <div className="flex gap-3">
                    <button className="glass-button flex items-center gap-2 text-xs font-semibold">
                        <Activity className="w-4 h-4 text-brand-primary" />
                        LIVE DIAGNOSTICS
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
                        className="glass-card p-6 group hover:border-brand-primary/30 transition-all duration-500"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-white/40 text-xs font-medium uppercase tracking-wider">{stat.label}</h3>
                        <p className="text-3xl font-bold mt-1 tabular-nums">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-card p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold flex items-center gap-2 text-lg">
                            <Clock className="w-5 h-5 text-brand-primary" />
                            Recent Check-ins
                        </h3>
                        <button className="text-xs text-brand-primary font-bold hover:underline underline-offset-4">VIEW FULL LOGS</button>
                    </div>
                    <div className="space-y-4">
                        {history.slice(0, 5).map((visitor, i) => (
                            <motion.div
                                key={visitor.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center font-bold text-brand-primary text-sm">
                                    {visitor.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm tracking-wide">{visitor.name}</h4>
                                    <p className="text-xs text-white/40">{visitor.purpose}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-mono text-white/60">{visitor.time}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${visitor.status === 'Checked In' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'
                                        }`}>
                                        {visitor.status.toUpperCase()}
                                    </span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-brand-primary transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* AI Insights Card */}
                <div className="glass-card p-8 bg-gradient-to-br from-brand-primary/5 to-transparent border-brand-primary/20">
                    <h3 className="font-bold flex items-center gap-2 text-lg mb-6">
                        <ShieldAlert className="w-5 h-5 text-brand-primary" />
                        Security Intelligence
                    </h3>
                    <div className="space-y-6">
                        <div className="p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/10">
                            <p className="text-xs font-bold text-brand-primary uppercase mb-2">Zone 1 Status</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-sm">Secure - Optimized Throughput</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">AI Predictions</p>
                            {[
                                "Expected peak traffic at 14:00 (Interview Block).",
                                "Maintenance crew expected from 'SkyNet Corp'.",
                                "Anomaly check recommended for Service Entrance."
                            ].map((text, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="w-1 h-1 rounded-full bg-brand-primary mt-1.5 shadow-[0_0_5px_#00f2fe]"></div>
                                    <p className="text-xs text-white/60 leading-relaxed italic">"{text}"</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs text-white/40 uppercase">System Power</span>
                                <span className="text-xs font-mono text-brand-primary">98.4%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '98.4%' }}
                                    className="h-full bg-brand-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
