import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanFace, User, Info, CheckCircle2, AlertTriangle, Fingerprint, ShieldCheck, X } from 'lucide-react';
import { analyzeVisitor, simulateFaceScan } from '../utils/aiEngine';
import confetti from 'canvas-confetti';

const SmartScan = ({ onCheckIn, setActiveTab }) => {
    const [step, setStep] = useState('scan'); // scan, detail, analyzing, success
    const [scanning, setScanning] = useState(false);
    const [visitorData, setVisitorData] = useState({ name: '', purpose: '', host: '' });
    const [analysis, setAnalysis] = useState(null);

    const startScan = async () => {
        setScanning(true);
        const result = await simulateFaceScan();
        setScanning(false);
        setAnalysis(result);
        setStep('detail');
    };

    const handleCheckIn = () => {
        setStep('analyzing');
        setTimeout(() => {
            const aiResult = analyzeVisitor(visitorData);
            onCheckIn({ ...visitorData, ...aiResult, status: 'Checked In' });
            setStep('success');
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00f2fe', '#4facfe', '#f093fb']
            });
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
                {step === 'scan' && (
                    <motion.div
                        key="scan"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="glass-card overflow-hidden"
                    >
                        <div className="aspect-video bg-black relative flex items-center justify-center group">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center grayscale" />

                            {/* Scan Overlay */}
                            <div className="relative w-64 h-64 border-2 border-brand-primary/30 rounded-3xl flex items-center justify-center overflow-hidden">
                                <ScanFace className={`w-32 h-32 text-brand-primary/40 ${scanning ? 'animate-pulse' : ''}`} />
                                {scanning && (
                                    <motion.div
                                        initial={{ top: 0 }}
                                        animate={{ top: '100%' }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        className="absolute left-0 w-full h-[2px] bg-brand-primary shadow-[0_0_15px_#00f2fe] z-10"
                                    />
                                )}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-primary" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-primary" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-primary" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-primary" />
                            </div>

                            <div className="absolute top-8 left-8 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Live Biometric Feed</span>
                            </div>
                        </div>

                        <div className="p-12 text-center">
                            <h2 className="text-3xl font-bold mb-4">Facial Recognition Check-in</h2>
                            <p className="text-white/50 mb-8 max-w-md mx-auto">
                                Please position yourself in front of the camera for high-integrity identification via SecureAccess AI.
                            </p>
                            <button
                                onClick={startScan}
                                disabled={scanning}
                                className="px-12 py-4 bg-brand-primary text-bg-dark font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(0,242,254,0.3)]"
                            >
                                {scanning ? 'SCANNING BIOMETRICS...' : 'START SECURE SCAN'}
                                <Fingerprint className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 'detail' && (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        <div className="glass-card p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">Identity Verified</h3>
                                    <p className="text-xs text-white/40">Confidence Score: {analysis?.confidence}%</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={visitorData.name}
                                        onChange={(e) => setVisitorData({ ...visitorData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Purpose of Visit</label>
                                    <select
                                        value={visitorData.purpose}
                                        onChange={(e) => setVisitorData({ ...visitorData, purpose: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-primary outline-none transition-all"
                                    >
                                        <option value="" className="bg-bg-dark">Select Purpose</option>
                                        <option value="Interview" className="bg-bg-dark">Interview</option>
                                        <option value="Maintenance" className="bg-bg-dark">Maintenance</option>
                                        <option value="Delivery" className="bg-bg-dark">Delivery</option>
                                        <option value="Meeting" className="bg-bg-dark">Professional Meeting</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Host Name</label>
                                    <input
                                        type="text"
                                        placeholder="Who are you meeting?"
                                        value={visitorData.host}
                                        onChange={(e) => setVisitorData({ ...visitorData, host: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-primary outline-none"
                                    />
                                </div>
                                <button
                                    onClick={handleCheckIn}
                                    disabled={!visitorData.name || !visitorData.purpose}
                                    className="w-full py-4 bg-brand-primary text-bg-dark font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                                >
                                    COMPLETE CHECK-IN
                                    <ShieldCheck className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="glass-card p-8 bg-brand-primary/5 border-brand-primary/20">
                                <h4 className="font-bold flex items-center gap-2 mb-4">
                                    <Info className="w-5 h-5 text-brand-primary" />
                                    AI Security Assessment
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-white/50 uppercase">Identity Hash</span>
                                        <span className="font-mono text-brand-primary">{analysis?.biometricHash}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-white/50 uppercase">Risk Level</span>
                                        <span className="font-bold text-emerald-400">NEGLIGIBLE</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-xs leading-relaxed text-white/70 italic">
                                            "Biometric signature matches high-integrity standards. No known alerts for this pattern."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6 border-amber-500/20 bg-amber-500/5">
                                <div className="flex gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                                    <div>
                                        <h5 className="text-xs font-bold text-amber-500 uppercase mb-1">Entry Protocol</h5>
                                        <p className="text-[11px] text-white/60">
                                            Standard safety briefing must be completed before gate access is granted.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'analyzing' && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <div className="relative w-32 h-32 mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-4 border-brand-primary/20 border-t-brand-primary rounded-full"
                            />
                            <ShieldCheck className="absolute inset-0 m-auto w-12 h-12 text-brand-primary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Finalizing Security Protocols</h2>
                        <p className="text-white/50 tracking-widest text-[10px] font-bold uppercase">Synthesizing Check-in Data...</p>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-12 text-center"
                    >
                        <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Access Granted</h2>
                        <p className="text-white/60 mb-12 max-w-md mx-auto italic">
                            "Check-in complete. Please proceed to the elevator bank. Host notified."
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className="glass-button font-bold text-sm px-8"
                            >
                                RETURN TO DASHBOARD
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SmartScan;
