/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  UserPlus, 
  AlertCircle, 
  ChevronDown,
  X,
  Phone,
  Bot,
  Mic
} from 'lucide-react';
import { AGENCY_KNOWLEDGE } from './constants';
import { AIAssistant } from './components/AIAssistant';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMode, setAssistantMode] = useState<'chat' | 'voice'>('chat');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const launchVoiceAssistant = () => {
    setAssistantMode('voice');
    setIsAssistantOpen(true);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-red selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-x-0 border-t-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-red rounded-sm flex items-center justify-center font-bold text-black rotate-45">W</div>
            <span className="font-display font-bold text-2xl tracking-tighter uppercase italic">{AGENCY_KNOWLEDGE.name}</span>
          </div>
          <button 
            onClick={openModal}
            className="group relative px-6 py-2 bg-brand-red text-black font-semibold uppercase text-sm tracking-widest hover:bg-white transition-colors duration-300"
          >
            AI Strategy Session
            <span className="absolute -inset-1 border border-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-brand-red opacity-10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-brand-red opacity-5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 glass-card mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                {AGENCY_KNOWLEDGE.tagline}
              </span>
            </div>
            
            <h1 className="font-display font-extrabold text-6xl md:text-8xl tracking-tight leading-[0.9] mb-8 uppercase italic">
              HR AI <span className="red-gradient-text block">Growth Infrastructure.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-12 font-light max-w-2xl">
              Stop deploying chatbots. Start building transformation. Integrated with <span className="text-brand-red font-semibold">Voice-AI Screener</span> & Multi-agent Infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openModal}
                className="px-10 py-5 bg-brand-red text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,31,31,0.3)]"
              >
                Secure AI Roadmap
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={launchVoiceAssistant}
                className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest hover:border-brand-red hover:text-brand-red transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Launch Voice Concierge
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Pain Points */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {AGENCY_KNOWLEDGE.stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2 text-center md:text-left"
              >
                <div className="text-4xl md:text-6xl font-display font-extrabold red-gradient-text tracking-tighter">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {stat.label}
                  {stat.duration && <span className="block opacity-50">({stat.duration})</span>}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32">
            <div className="mb-12">
              <h2 className="font-display font-bold text-3xl uppercase italic tracking-tight">The Cost of <span className="text-brand-red">Inaction</span></h2>
              <p className="text-white/40 font-mono text-sm uppercase mt-2">Critical bottlenecks bleeding HR budgets</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {AGENCY_KNOWLEDGE.problems.map((prob, i) => (
                <div key={i} className="glass-card p-8 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-red/20 group-hover:bg-brand-red transition-colors" />
                  <div className="text-3xl font-display font-black mb-1">{prob.stat}</div>
                  <p className="text-sm text-white/60 leading-snug">{prob.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offer Stack */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase italic tracking-tighter mb-6">
              3-Tier INFRASTRUCTURE <span className="red-gradient-text">SYSTEMS.</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              We don't build projects. We build the architecture for your next decade of growth. Choose your level of transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {AGENCY_KNOWLEDGE.tiers.map((tier, i) => (
              <div 
                key={tier.id}
                className={`glass-card p-10 rounded-2xl flex flex-col relative overflow-hidden transition-all duration-500 ${
                  tier.popular ? 'border-brand-red/50 shadow-[0_0_50px_rgba(255,31,31,0.1)] scale-105 z-20' : 'hover:scale-[1.02] z-10'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-brand-red text-black font-bold uppercase text-[10px] tracking-widest py-1 px-4 transform rotate-45 translate-x-10 translate-y-2">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="font-display font-bold text-xl uppercase italic mb-2">{tier.name}</h3>
                  <p className="text-sm text-white/40 font-mono tracking-tight">{tier.focus}</p>
                </div>

                <div className="flex-grow space-y-6 mb-10">
                  <div className="space-y-4">
                    {tier.includes.map((msg, idx) => (
                      <div key={idx} className="flex gap-3 text-sm leading-tight text-white/70">
                        <Zap className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                        <span>{msg}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/5 mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-brand-red" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red">Projected ROI</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed italic">{tier.outcomes}</p>
                </div>

                <button 
                  onClick={tier.id === 'tier-1' ? launchVoiceAssistant : openModal}
                  className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                    tier.popular 
                    ? 'bg-brand-red text-black hover:bg-white' 
                    : 'bg-white/5 text-white border border-white/10 hover:border-brand-red hover:text-brand-red'
                  }`}
                >
                  {tier.id === 'tier-1' ? 'Demo Voice Interface' : 'Initiate System Build'}
                </button>
                
                <p className="text-[10px] text-center text-white/30 uppercase mt-4 tracking-tighter">
                  Best for: {tier.audience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-24 bg-zinc-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-red mb-6">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-mono text-sm uppercase tracking-[0.3em]">Institutional Grade</span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl uppercase italic tracking-tight mb-8">
                Data Sovereignty & <span className="red-gradient-text italic">Zero-Trust</span> Compliance.
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Privacy First", text: "Proprietary models run in secure, isolated environments. Your training data never leaves your infrastructure." },
                  { title: "Legal Compliant", text: "Hardened against GDPR, EEOC, and the EU AI Act. Built-in bias scanners for all recruitment workflows." },
                  { title: "System Ready", text: "Native API integration with Workday, Greenhouse, SuccessFactors, and custom legacy HRIS." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 h-auto bg-brand-red/30 rounded-full" />
                    <div>
                      <h4 className="font-display font-semibold text-lg uppercase tracking-tight">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square glass-card rounded-2xl flex items-center justify-center p-12 overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 opacity-10"
                >
                  <div className="w-full h-full border border-dashed border-brand-red rounded-full m-4" />
                </motion.div>
                <div className="relative z-10 text-center">
                  <div className="text-8xl mb-8 flex justify-center"><AlertCircle className="w-24 h-24 text-brand-red animate-pulse" /></div>
                  <h3 className="font-display font-black text-2xl uppercase italic tracking-tighter">Secured HR Infrastructure</h3>
                  <p className="font-mono text-[10px] text-white/40 mt-2 uppercase tracking-widest">MD5 Sum: F4829-XR-992-001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-black text-4xl uppercase italic tracking-tighter mb-16 text-center">Deployment <span className="red-gradient-text">Intelligence.</span></h2>
          <div className="space-y-4">
            {AGENCY_KNOWLEDGE.faq.map((faq, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-display font-bold uppercase tracking-tight text-lg">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-red opacity-[0.03]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase italic tracking-tighter mb-8 leading-none">
              Build your <span className="red-gradient-text">Moat</span> with AI Infrastructure.
            </h2>
            <p className="text-xl text-white/50 mb-12 font-light">
              The high cost of inaction is compounding. Secure your vertical offer today.
            </p>
            <button 
              onClick={openModal}
              className="px-12 py-6 bg-brand-red text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 text-lg shadow-[0_0_50px_rgba(255,31,31,0.4)]"
            >
              Start Implementation Audit
            </button>
            <div className="mt-8 flex items-center justify-center gap-8 opacity-40 grayscale">
               <span className="font-bold tracking-tighter uppercase italic text-2xl">Workday</span>
               <span className="font-bold tracking-tighter uppercase italic text-2xl">Greenhouse</span>
               <span className="font-bold tracking-tighter uppercase italic text-2xl">SAP</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center font-bold text-black text-[10px] rotate-45">W</div>
              <span className="font-display font-bold text-lg tracking-tighter uppercase italic">{AGENCY_KNOWLEDGE.name}</span>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em]">
              © 2026 WORKRIVA SYSTEMS · ALL RIGHTS RESERVED
            </div>
            <div className="flex gap-6 text-[10px] font-mono uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-brand-red">Privacy</a>
              <a href="#" className="hover:text-brand-red">Compliance</a>
              <a href="#" className="hover:text-brand-red">Status</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={closeModal} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[80vh] glass-card rounded-2xl overflow-hidden border-brand-red/30 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex flex-col">
                  <h3 className="font-display font-bold uppercase italic tracking-tight text-xl">AI Strategy Session</h3>
                  <p className="text-[10px] font-mono uppercase text-brand-red tracking-widest">Architecting your HR AI Moat</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-grow overflow-hidden bg-white">
                <iframe 
                  src={AGENCY_KNOWLEDGE.bookingLink}
                  className="w-full h-full"
                  frameBorder="0"
                  title="Schedule Strategy Session"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Button */}
      <AIAssistant 
        isOpen={isAssistantOpen} 
        setIsOpen={setIsAssistantOpen} 
        mode={assistantMode} 
        setMode={setAssistantMode} 
      />
    </div>
  );
}
