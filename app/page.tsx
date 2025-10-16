'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Download, Trash2, Bot, User } from 'lucide-react';
import { searchAtlasCards } from '@/lib/atlas/cards';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// Atlas cards and search are provided by lib/atlas/cards

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from sessionStorage on component mount; upgrade to Atlas v2 schema
  useEffect(() => {
    const STORAGE_KEY = 'chatMessages';
    const STORAGE_VERSION_KEY = 'chatMessagesVersion';
    const CURRENT_VERSION = 'atlas-v2';

    const currentVersion = sessionStorage.getItem(STORAGE_VERSION_KEY);
    const savedMessages = sessionStorage.getItem(STORAGE_KEY);

    // Purge old demo cache if version mismatch or demo text detected
    const shouldReset =
      currentVersion !== CURRENT_VERSION ||
      (savedMessages && savedMessages.includes('Dit is een demo')) ||
      (savedMessages && savedMessages.includes('Ik heb je bericht ontvangen'));

    if (shouldReset) {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
      setMessages([]);
      return;
    }

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch {
        // If parsing fails, reset cache
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
        setMessages([]);
      }
    } else {
      sessionStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
    }
  }, []);

  // Save messages to sessionStorage whenever messages change with version tag
  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    sessionStorage.setItem('chatMessagesVersion', 'atlas-v2');
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
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now()
    }]);

    try {
      // Use Atlas knowledge from shared module
      const relevantCards = searchAtlasCards(userMessage);

      let responseText = '';
      if (relevantCards.length > 0) {
        responseText += '🔍 Atlas Kennis Gevonden!\n\n';
        responseText += `Ik heb ${relevantCards.length} relevante concepten gevonden voor "${userMessage}":\n\n`;

        relevantCards.forEach(card => {
          responseText += `• ${card.title}\n`;
          responseText += `${card.content}\n`;
          responseText += `🏷️ Tags: ${card.tags.join(', ')}\n\n`;
        });

        if (relevantCards.length >= 2) {
          responseText += `💡 Synergie: De combinatie van ${relevantCards[0].title} en ${relevantCards[1].title} kan tot innovatie leiden!`;
        }
      } else {
        responseText += `Hallo! Je vroeg: "${userMessage}"\n\n`;
        responseText += 'Ik heb geen directe matches in de Atlas. Probeer: "AI", "quantum", "gezondheidszorg" of "tech".';
      }
      
      let accumulatedText = '';
      for (let i = 0; i < responseText.length; i++) {
        accumulatedText += responseText[i];
        setMessages(prev => prev.map(msg => 
          msg.id === assistantId 
            ? { ...msg, content: accumulatedText }
            : msg
        ));
        await new Promise(resolve => setTimeout(resolve, 20)); // Simulate typing speed
      }
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === assistantId 
          ? { ...msg, content: 'Sorry, er ging iets mis. Probeer het opnieuw.' }
          : msg
      ));
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
                <h1 className="text-xl font-bold text-slate-100">Atlas Supermachine Chat</h1>
                <p className="text-sm text-slate-400">AI-powered met Atlas kennis</p>
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
                Welkom bij Atlas Supermachine Chat
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Stel vragen over AI, quantum computing, gezondheidszorg en meer. Ik gebruik de Atlas kennisbank!
              </p>
              
              {/* Quick Start Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {[
                  'AI in gezondheidszorg',
                  'Quantum computing',
                  'Digitale mentale gezondheid',
                  'Hoe gaat het?'
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
                placeholder="Vraag iets over AI, quantum, gezondheidszorg..."
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
            {isStreaming ? 'Atlas zoekt kennis...' : 'Shift+Enter voor nieuwe regel'}
          </div>
        </div>
      </div>
    </div>
  );
}
