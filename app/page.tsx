'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  MessageCircle, 
  Phone, 
  Bot, 
  FileText, 
  TrendingUp,
  Send,
  Download,
  Upload,
  Video,
  Mic,
  Monitor,
  X,
  CheckCircle,
  Users,
  DollarSign,
  Mail,
  Target
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: Date;
}

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  icon: string;
}

interface CallStatus {
  active: boolean;
  type: string;
  startTime: Date | null;
}

export default function BusinessApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🚀 Welkom bij Ultimate Business App!',
      sender: 'system',
      timestamp: new Date()
    }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>({ active: false, type: '', startTime: null });
  const [stats, setStats] = useState({
    revenue: 125430,
    users: 2847,
    messages: 1234,
    conversion: 3.2,
    traffic: 45678
  });
  const [activities, setActivities] = useState([
    '• Systeem gereed',
    '• Nieuw contract: €50,000 van TechCorp',
    '• Team call voltooid: Q4 Planning sesie',
    '• 25 nieuwe leads deze week'
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  const aiResponses = [
    "📊 Gebaseerd op jouw data: Je conversie is 23% gestegen! Dit komt door de optimalisatie van je landing page.",
    "💡 Suggestie: Investeer meer in video marketing. Dit geeft 3x beter engagement.",
    "✨ Interessant: Je team is 40% productiever met deze tool!",
    "🎯 Analyse: Je klanten zijn het meest tevreden op vrijdagen.",
    "📈 Forecast: Volgende kwartaal verwacht ik 15% groei.",
    "💰 Financial insight: Je CAC is 30% gedaald, LTV gestegen met 25%.",
    "🚀 Growth opportunity: Implementeer referral program, verwacht 20% meer klanten.",
    "📱 Mobile first: 68% van je traffic is mobiel, optimaliseer daarop.",
  ];

  const files: FileItem[] = [
    { id: '1', name: 'Q4_Report.pdf', size: '2.3 MB', type: 'pdf', icon: '📊' },
    { id: '2', name: 'Meeting_Notes.docx', size: '156 KB', type: 'docx', icon: '📋' },
    { id: '3', name: 'Analytics.xlsx', size: '892 KB', type: 'xlsx', icon: '📈' },
    { id: '4', name: 'Design_Mockup.png', size: '1.2 MB', type: 'png', icon: '🎨' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Live stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 200),
        users: prev.users + Math.floor(Math.random() * 10),
        messages: prev.messages + Math.floor(Math.random() * 5),
        traffic: prev.traffic + Math.floor(Math.random() * 50)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Activity updates
  useEffect(() => {
    const activityList = [
      '• Nieuw contract: €50,000 van TechCorp',
      '• Team call voltooid: Q4 Planning sesie',
      '• 25 nieuwe leads deze week',
      '• Product update live: v2.1.3',
      '• 3 klanten meerderjarig bereikt',
      '• Marketing campagne gestart',
      '• Nieuwe klant onboarded',
      '• Systeem backup voltooid'
    ];

    const interval = setInterval(() => {
      const randomActivity = activityList[Math.floor(Math.random() * activityList.length)];
      setActivities(prev => [randomActivity, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessageInput('');
      
      // Auto response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: '✅ Bericht ontvangen!',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 800);
    }
  };

  const askAI = () => {
    if (aiInput.trim()) {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setAiResponse(response);
      setShowAiResponse(true);
      setAiInput('');
    }
  };

  const startCall = (type: string) => {
    setCallStatus({
      active: true,
      type,
      startTime: new Date()
    });
  };

  const endCall = () => {
    setCallStatus({ active: false, type: '', startTime: null });
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }
  };

  const downloadFile = (fileName: string) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName;
    link.click();
    alert(`Download gestart: ${fileName}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (startTime: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-5">
      <div className="w-full max-w-7xl h-[90vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-gradient-to-b from-indigo-500 to-purple-600 text-white p-6 flex flex-col gap-4">
          <div className="text-2xl font-bold text-center mb-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
            🏢 UltimateBusiness
          </div>
          
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'chat', label: 'Team Chat', icon: MessageCircle },
            { id: 'calls', label: 'Video Calls', icon: Phone },
            { id: 'ai', label: 'AI Assistant', icon: Bot },
            { id: 'files', label: 'File Sharing', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                activeTab === id
                  ? 'bg-white text-indigo-600 font-semibold shadow-lg'
                  : 'bg-white/15 hover:bg-white/25 hover:translate-x-2'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab === 'dashboard' && '📊 Dashboard'}
              {activeTab === 'chat' && '💬 Team Chat'}
              {activeTab === 'calls' && '📞 Video Calls'}
              {activeTab === 'ai' && '🤖 AI Assistant'}
              {activeTab === 'files' && '📎 File Sharing'}
              {activeTab === 'analytics' && '📈 Analytics'}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              👤 Whitney Ravenberg
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">
                      €{stats.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">+12% deze maand</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Active Users</h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">
                      {stats.users.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">+8% deze week</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">
                      {stats.messages.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">+23% vandaag</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Conversion</h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">
                      {stats.conversion}%
                    </div>
                    <div className="text-sm text-gray-600">+0.5% deze maand</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    📈 Recent Activity
                  </h3>
                  <div className="space-y-2">
                    {activities.map((activity, index) => (
                      <p key={index} className="text-gray-700">{activity}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-2xl p-4 mb-6 h-96 overflow-y-auto border border-gray-200">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 rounded-2xl max-w-xs ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white ml-auto'
                            : message.sender === 'ai'
                            ? 'bg-green-50 text-gray-800 border-l-4 border-green-500'
                            : 'bg-white text-gray-800 border-l-4 border-indigo-500'
                        }`}
                      >
                        <div className="break-words">{message.text}</div>
                        <div className="text-xs opacity-70 mt-2">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-gray-50 rounded-2xl border-2 border-gray-200">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Typ je bericht..."
                    className="flex-1 p-4 border-2 border-gray-300 rounded-xl text-base focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <Send size={20} />
                    Verstuur
                  </button>
                </div>
              </div>
            )}

            {/* Calls Tab */}
            {activeTab === 'calls' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <Mic size={48} className="mx-auto mb-4 text-indigo-600" />
                    <h3 className="text-lg font-semibold mb-2">Audio Call</h3>
                    <p className="text-gray-600 mb-4">Snelle team calls</p>
                    <button
                      onClick={() => startCall('Audio')}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Start Audio
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <Video size={48} className="mx-auto mb-4 text-indigo-600" />
                    <h3 className="text-lg font-semibold mb-2">Video Call</h3>
                    <p className="text-gray-600 mb-4">HD video meetings</p>
                    <button
                      onClick={() => startCall('Video')}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Start Video
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <Monitor size={48} className="mx-auto mb-4 text-indigo-600" />
                    <h3 className="text-lg font-semibold mb-2">Screen Share</h3>
                    <p className="text-gray-600 mb-4">Deel je scherm</p>
                    <button
                      onClick={() => startCall('Screen')}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Share Screen
                    </button>
                  </div>
                </div>

                {callStatus.active && (
                  <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-yellow-800 mb-2">
                          🎯 Call Actief!
                        </div>
                        <p className="text-yellow-700">
                          {callStatus.type} call is actief. Gebruik je microfoon en camera.
                          {callStatus.startTime && (
                            <span className="ml-2 font-mono">
                              ({formatDuration(callStatus.startTime)})
                            </span>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={endCall}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        <X size={20} className="inline mr-2" />
                        Beëindig Call
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AI Tab */}
            {activeTab === 'ai' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-2xl p-6 mb-6 border-l-4 border-indigo-500">
                  <h3 className="text-xl font-semibold mb-2">🤖 AI Business Assistant</h3>
                  <p className="text-gray-700">
                    Stel vragen over strategie, marketing, financiën, productiviteit of ander business onderwerpen.
                  </p>
                </div>

                <div className="flex gap-4 mb-6">
                  <textarea
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Bijv: 'Hoe verhoog ik mijn conversie?' of 'Wat zijn beste marketing strategieën?'"
                    className="flex-1 p-4 border-2 border-gray-300 rounded-xl text-sm font-inherit resize-y min-h-24 focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    onClick={askAI}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 self-start"
                  >
                    Ask AI
                  </button>
                </div>

                {showAiResponse && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Bot className="text-indigo-600" size={20} />
                      AI Response:
                    </h4>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {aiResponse}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="text-5xl mb-4">{file.icon}</div>
                      <div className="font-semibold text-gray-800 mb-2">{file.name}</div>
                      <div className="text-gray-600 text-sm mb-4">{file.size}</div>
                      <button
                        onClick={() => downloadFile(file.name)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Website Traffic</h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">
                      {stats.traffic.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Unieke bezoekers deze maand</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Phone className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Mobile Usage</h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">68%</div>
                    <div className="text-sm text-gray-600">Van alle bezoekers</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Avg. Session</h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">4m 32s</div>
                    <div className="text-sm text-gray-600">Gemiddelde sessie tijd</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="text-indigo-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Bounce Rate</h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">23%</div>
                    <div className="text-sm text-gray-600">Lager dan industrie</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}