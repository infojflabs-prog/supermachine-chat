'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Download, Trash2, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from sessionStorage on component mount
  useEffect(() => {
    const savedMessages = sessionStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to sessionStorage whenever messages change
  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    await streamResponse(input.trim());
  };

  const streamResponse = async (userMessage: string) => {
    setIsStreaming(true);
    const assistantId = (Date.now() + 1).toString();

    // Add empty assistant message
    setMessages(prev => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: Date.now()
      }
    ]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      if (!res.ok) {
        throw new Error('API error');
      }

      const data = await res.json();
      const { matches = [], synergies = [], ai } = data || {};

      const lines: string[] = [];
      if (ai && ai.trim()) {
        lines.push(ai.trim());
        lines.push('\n—');
      }

      if (matches.length > 0) {
        lines.push('Relevante kaarten:');
        for (const m of matches.slice(0, 5)) {
          lines.push(`• ${m.title}${m.tags?.length ? ` [${m.tags.join(', ')}]` : ''}`);
        }
      } else {
        lines.push('Geen directe matches gevonden in je Atlas.');
      }

      if (synergies.length > 0) {
        lines.push('\nMogelijke synergieën:');
        for (const s of synergies.slice(0, 3)) {
          lines.push(`• ${s.a.title} ↔ ${s.b.title} — ${s.rationale}`);
        }
      }

      const responseText = lines.join('\n');

      // Type-out effect for consistency with existing UI
      let accumulatedText = '';
      for (let i = 0; i < responseText.length; i++) {
        accumulatedText += responseText[i];
        setMessages(prev =>
          prev.map(msg => (msg.id === assistantId ? { ...msg, content: accumulatedText } : msg))
        );
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    } catch (error) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? { ...msg, content: 'Sorry, er ging iets mis. Probeer het opnieuw.' }
            : msg
        )
      );
    }

    setIsStreaming(false);
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.role === 'user' ? 'Jij' : 'Assistant'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    if (confirm('Weet je zeker dat je de chatgeschiedenis wilt wissen?')) {
      setMessages([]);
      sessionStorage.removeItem('chatMessages');
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('nl-NL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-100">Supermachine Chat</h1>
                <p className="text-sm text-slate-400">AI-powered conversations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={exportChat}
                disabled={messages.length === 0}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              
              <button
                onClick={clearChat}
                disabled={messages.length === 0}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Wissen
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                <Bot className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 mb-3">
                Welkom bij Supermachine Chat
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Stel een vraag of start een gesprek. Ik help je graag met alles wat je nodig hebt.
              </p>
              
              {/* Quick Start Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {[
                  "Leg quantum computing uit in eenvoudige taal",
                  "Hoe maak ik een React component?",
                  "Schrijf een korte gedicht over technologie",
                  "Wat zijn de voordelen van AI?"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(suggestion)}
                    className="p-4 text-left rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all text-slate-300 hover:text-slate-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div
                  className={`flex-1 max-w-[80%] ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-500/20 text-blue-100 border border-blue-500/30'
                        : 'bg-slate-800/50 text-slate-100 border border-slate-700/50'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                  </div>
                  <div
                    className={`text-xs text-slate-500 mt-2 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Typ je bericht... (Enter om te verzenden, Shift+Enter voor nieuwe regel)"
                disabled={isStreaming}
                rows={1}
                className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{ minHeight: '52px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="px-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium"
            >
              {isStreaming ? (
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Versturen
                </>
              )}
            </button>
          </form>
          
          <div className="text-xs text-slate-500 mt-2 text-center">
            {isStreaming ? 'AI is aan het typen...' : 'Shift+Enter voor nieuwe regel'}
          </div>
        </div>
      </div>
    </div>
  );
}
