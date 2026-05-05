import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Phone, X, Send, Bot, User, Mic, MicOff, Volume2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { AGENCY_KNOWLEDGE } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function AIAssistant({ 
  isOpen, 
  setIsOpen, 
  mode, 
  setMode 
}: { 
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mode: 'chat' | 'voice';
  setMode: (mode: 'chat' | 'voice') => void;
}) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: `Hello, I'm the Workriva AI. I can explain our HR infrastructure, ROI metrics, or help you book a strategy session. How can I assist today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = `
        You are the AI Assistant for WORKRIVA, a premium B2B AI agency specializing in HR Tech & Workforce AI infrastructure.
        
        AGENCY KNOWLEDGE:
        ${JSON.stringify(AGENCY_KNOWLEDGE, null, 2)}
        
        INSTRUCTIONS:
        - Be authoritative, highly professional, and outcome-focused.
        - Emphasize ROI, strategic transformation, and real HR practitioner experience.
        - Encourage booking a discovery call at the booking link: ${AGENCY_KNOWLEDGE.bookingLink}
        - Do NOT invent services not listed in the knowledge.
        - If asked about pricing, state that precise ROI-based modeling is part of the custom strategy session.
        
        USER QUESTION: ${userMessage}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const assistantContent = response.text || "I apologize, I'm having trouble processing that right now. Please reach out to our team directly.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
      
      if (mode === 'voice' && assistantContent) {
        speak(assistantContent);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error. Please try again or book a session directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const speak = (content: string) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 1.0;
    utterance.pitch = 0.9; // Lower pitch for technical/authoritative feel
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Voice recognition is not supported in this browser. Please use Chrome or Safari for the best experience." 
      }]);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleSend(transcript);
      };
      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "Microphone access was denied. This often happens because the app is running in a preview window. Please open the app in a new tab or check your site permissions to use the voice assistant." 
          }]);
        }
      };
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      console.error("Failed to start recognition:", err);
      setIsListening(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-[90vw] max-w-[400px] h-[600px] glass-card rounded-2xl flex flex-col overflow-hidden border-brand-red/30 shadow-[0_0_50px_rgba(255,31,31,0.2)] mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-brand-red flex items-center justify-between text-black">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-black animate-pulse" />
                </div>
                <span className="font-display font-bold uppercase text-xs tracking-widest">Workriva Agent</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    const newMode = mode === 'chat' ? 'voice' : 'chat';
                    setMode(newMode);
                    if (newMode === 'voice') {
                      setMessages(prev => [...prev, { role: 'assistant', content: "Voice Assistant Activated. Use the microphone button below to speak." }]);
                    }
                  }}
                  className={`p-1.5 px-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    mode === 'voice' ? 'bg-black text-brand-red' : 'bg-black/10 hover:bg-black/20 text-black'
                  } text-[10px] font-bold uppercase tracking-tighter`}
                >
                  {mode === 'chat' ? <Mic className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                  {mode === 'chat' ? 'Switch to Voice' : 'Chat Mode'}
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:opacity-60 transition-opacity"><X className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-black/40 scrollbar-thin scrollbar-thumb-brand-red">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-brand-red text-black font-medium' 
                    : 'bg-white/5 border border-white/10 text-white/90'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-red" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-white/5 bg-zinc-900/50">
              {mode === 'chat' ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about HR AI infrastructure..."
                    className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-red transition-colors"
                  />
                  <button 
                    onClick={() => handleSend()}
                    className="p-2 bg-brand-red text-black rounded-lg hover:bg-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 py-8">
                  <motion.button
                    animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    onClick={toggleListening}
                    className={`p-10 rounded-full transition-all duration-300 ${
                      isListening ? 'bg-brand-red text-black shadow-[0_0_30px_rgba(255,31,31,0.5)]' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {isListening ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10" />}
                  </motion.button>
                  <p className="text-xs font-mono uppercase text-white/50 animate-pulse text-center px-4">
                    {isListening ? 'Listening for strategic query...' : 'Tap for Voice AI Interface'}
                  </p>
                  {!isListening && (
                    <a 
                      href={window.location.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-brand-red uppercase tracking-widest hover:underline mt-2 p-2"
                    >
                      Open in New Tab for Mic Access
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-red text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,31,31,0.4)] hover:scale-110 active:scale-95 transition-all z-[1100]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </div>
  );
}
