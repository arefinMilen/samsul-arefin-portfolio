'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Minimize2,
  ExternalLink,
  Calendar,
  Mail,
  User,
  ChevronRight,
} from 'lucide-react';
import { personalDetails } from '@/data/portfolioData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isFallback?: boolean;
}

const STARTER_ROW_1 = [
  '🚀 Tell me about Samsul\'s key projects',
  '⚡ What are his top skills & AI tools?',
  '💼 Samsul\'s experience at AppifyDevs',
  '🛡️ Tell me about TechnovaMartBD & SirajTech',
];

const STARTER_ROW_2 = [
  '📅 How can I book a call with Samsul?',
  '🤖 Tell me about Samsul\'s AI agent workflows',
  '🎓 What is Samsul\'s CSE degree & CGPA?',
  '🏆 What certifications does Samsul have?',
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('arefin_ai_chat_history');
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        // Initial welcome message
        setMessages([
          {
            id: 'welcome-1',
            role: 'assistant',
            content: `👋 Hi! I am **Arefin AI Assistant** powered by Gemini.\n\nAsk me anything about Samsul's **full-stack projects**, **AI Agent workflows**, **skills**, or **work experience**!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (e) {
      console.error('Failed to load chat history', e);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('arefin_ai_chat_history', JSON.stringify(messages));
      } catch (e) {
        console.error('Failed to save chat history', e);
      }
    }
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'I could not generate a response. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: data.isFallback,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '⚠️ Network connection issue. Please check your connection and try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    const welcomeMsg: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `👋 Chat history cleared. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([welcomeMsg]);
    localStorage.removeItem('arefin_ai_chat_history');
  };

  // Helper to render markdown formatting cleanly
  const renderFormattedText = (text: string) => {
    // Split into paragraphs / lines
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      if (!line.trim()) return <div key={lineIdx} className="h-2" />;

      // Simple markdown bold & link processing
      let formatted: React.ReactNode[] = [];
      let remaining = line;
      let keyCounter = 0;

      // Regex for **bold**, `code`, [link](url)
      const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
      const parts = remaining.split(tokenRegex);

      formatted = parts.map((part) => {
        keyCounter++;
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={keyCounter} className="font-semibold text-cyan-300">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={keyCounter} className="bg-slate-900 text-amber-300 text-xs px-1.5 py-0.5 rounded border border-slate-700 font-mono">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('[') && part.includes('](')) {
          const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            return (
              <a
                key={keyCounter}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-1"
              >
                {match[1]}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            );
          }
        }
        return part;
      });

      // Check if bullet point
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-cyan-400 font-bold">•</span>
            <div className="flex-1">{formatted}</div>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="my-1 leading-relaxed">
          {formatted}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group p-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-cyan-900/40 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center border border-cyan-300/30"
        aria-label="Toggle AI Assistant Chatbot"
      >
        {/* Glow backdrop pulse */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 blur opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse" />
        
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6 text-white transition-transform duration-200" />
          ) : (
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/90 shadow-md">
              <Image
                src={personalDetails.avatar}
                alt="Arefin AI Avatar"
                fill
                sizes="32px"
                className="object-cover"
              />
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-0.5 border border-cyan-400 shadow-sm" />
            </div>
          )}
        </div>

        {/* Unread badge */}
        {!isOpen && hasUnread && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
          </span>
        )}

        {/* Hover Tooltip when closed */}
        {!isOpen && (
          <div className="absolute right-full mr-3 hidden group-hover:flex items-center pointer-events-none">
            <div className="bg-slate-900/90 text-slate-100 text-xs px-3 py-1.5 rounded-lg border border-cyan-500/30 shadow-lg whitespace-nowrap backdrop-blur-md font-medium">
              Ask Samsul&apos;s AI Assistant ✨
            </div>
          </div>
        )}
      </motion.button>

      {/* Floating Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="absolute bottom-20 right-0 w-[92vw] sm:w-[420px] max-h-[600px] h-[78vh] flex flex-col bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/80 overflow-hidden overscroll-contain"
          >
            {/* Header */}
            <div className="p-4 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-md ring-2 ring-cyan-500/20">
                    <Image
                      src={personalDetails.avatar}
                      alt="Arefin AI Avatar"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-sm z-10" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Arefin AI Assistant
                  </h3>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Samsul&apos;s Portfolio Agent
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title="Clear Conversation"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 p-4 overflow-y-auto overscroll-contain space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* AI Avatar */}
                  {msg.role === 'assistant' && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-400/60 shrink-0 mt-0.5 shadow-sm ring-1 ring-cyan-500/30">
                      <Image
                        src={personalDetails.avatar}
                        alt="Arefin AI"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Message Box */}
                  <div className={`max-w-[84%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md shadow-cyan-900/30'
                          : 'bg-slate-800/90 text-slate-200 border border-slate-700/70 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {renderFormattedText(msg.content)}
                    </div>

                    {/* Timestamp & fallback note */}
                    <div className="flex items-center gap-2 mt-1 px-1">
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                      {msg.isFallback && (
                        <span className="text-[10px] text-amber-400 font-mono">
                          (Preview Mode)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-blue-600 border border-blue-400/40 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-400/60 shrink-0 mt-0.5 shadow-sm ring-1 ring-cyan-500/30">
                    <Image
                      src={personalDetails.avatar}
                      alt="Arefin AI"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3.5 bg-slate-800/90 border border-slate-700/70 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Pills (2 horizontal animated marquee rows - forward & reverse) */}
            {messages.length <= 2 && !isLoading && (
              <div className="py-2.5 border-t border-slate-800 bg-slate-900/80 overflow-hidden select-none">
                <p className="px-4 text-[11px] text-slate-400 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" /> Suggested questions:
                </p>

                {/* Row 1: Leftward smooth continuous marquee */}
                <div className="overflow-hidden whitespace-nowrap mb-1.5 flex py-0.5">
                  <div className="animate-marquee-left flex gap-2 pr-2">
                    {[...STARTER_ROW_1, ...STARTER_ROW_1].map((prompt, idx) => (
                      <button
                        key={`row1-${idx}`}
                        onClick={() => handleSend(prompt)}
                        className="inline-flex items-center gap-1.5 text-[11px] bg-slate-800/90 hover:bg-cyan-950 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-200 border border-slate-700/70 px-3 py-1 rounded-full transition-all duration-200 shadow-sm shrink-0 cursor-pointer"
                      >
                        <span>{prompt}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 2: Rightward (reverse) smooth continuous marquee */}
                <div className="overflow-hidden whitespace-nowrap flex py-0.5">
                  <div className="animate-marquee-right flex gap-2 pr-2">
                    {[...STARTER_ROW_2, ...STARTER_ROW_2].map((prompt, idx) => (
                      <button
                        key={`row2-${idx}`}
                        onClick={() => handleSend(prompt)}
                        className="inline-flex items-center gap-1.5 text-[11px] bg-slate-800/90 hover:bg-cyan-950 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-200 border border-slate-700/70 px-3 py-1 rounded-full transition-all duration-200 shadow-sm shrink-0 cursor-pointer"
                      >
                        <span>{prompt}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Footer Buttons */}
            <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <a
                href={personalDetails.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium hover:underline"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Call
              </a>
              <a
                href={`mailto:${personalDetails.email}`}
                className="text-slate-400 hover:text-slate-200 flex items-center gap-1 hover:underline"
              >
                <Mail className="w-3.5 h-3.5" /> Send Email
              </a>
              <a
                href={personalDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-200 flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" /> GitHub
              </a>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-slate-800/90 border-t border-slate-700/70 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Arefin's AI Assistant..."
                disabled={isLoading}
                className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-900/40 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
