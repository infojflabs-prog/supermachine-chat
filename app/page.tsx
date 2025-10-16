'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Download, Trash2, User, Heart, Zap } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AtlasCard {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
}

// 🏥 ATLAS HEALTH EDITION - 35 GEZONDHEIDSZORG KAARTEN
const atlasCards: AtlasCard[] = [
  // DIAGNOSTIEK & MONITORING (8 kaarten)
  {
    id: 'ai-diagnostics',
    title: 'AI Diagnostiek',
    content: 'Machine learning voor vroege detectie van ziekten zoals kanker, hartaandoeningen en diabetes. Deep learning analyseert medische beelden sneller en nauwkeuriger dan menselijke experts.',
    tags: ['AI', 'diagnostiek', 'early detection', 'imaging', 'deep learning'],
    category: 'Diagnostiek & Monitoring'
  },
  {
    id: 'wearable-health-tech',
    title: 'Wearable Gezondheidstechnologie',
    content: 'Smartwatches en sensoren voor continue monitoring van hartslag, bloeddruk, bloedsuiker, zuurstof en slaap. Real-time data voor preventieve zorg.',
    tags: ['wearables', 'monitoring', 'preventie', 'IoT', 'sensors'],
    category: 'Diagnostiek & Monitoring'
  },
  {
    id: 'liquid-biopsy',
    title: 'Liquid Biopsy',
    content: 'Kankerdetectie via bloedtest in plaats van invasieve biopsie. Vroegtijdige detectie en monitoring van tumorDNA in bloedbaan.',
    tags: ['kanker', 'diagnostiek', 'bloedtest', 'early detection', 'minimal invasive'],
    category: 'Diagnostiek & Monitoring'
  },
  {
    id: 'breath-analysis',
    title: 'Ademanalyse Diagnostiek',
    content: 'Detectie van ziekten via uitgeademde lucht. Vluchtige organische stoffen (VOCs) identificeren diabetes, longkanker, en infecties.',
    tags: ['diagnostiek', 'breath', 'non-invasive', 'VOCs', 'early detection'],
    category: 'Diagnostiek & Monitoring'
  },
  {
    id: 'continuous-glucose',
    title: 'Continue Glucose Monitoring',
    content: 'Implanteerbare sensoren die 24/7 bloedsuikerspiegel meten. Alarmen bij hypo/hyperglycemie, integratie met insulinepompen.',
    tags: ['diabetes', 'glucose', 'monitoring', 'sensors', 'implantable'],
    category: 'Diagnostiek & Monitoring'
  },
  {
    id: 'smart-pills',
    title: 'Smart Pills',
    content: 'Ingesteerbare sensoren in pillen die medicatie-inname monitoren en data verzenden. Tracking van therapietrouw en gastro-intestinale parameters.',
    tags: ['medicatie', 'monitoring', 'adherence', 'IoT', 'ingestible'],
    category: 'Diagnostiek & Monitoring'
  },
  {
    id: 'ai-pathology',
    title: 'AI Pathologie',
    content: 'Digitale pathologie met AI voor snellere en nauwkeurigere analyse van weefselmonsters. Detectie van subtiele patronen die menselijk oog mist.',
    tags: ['AI', 'pathologie', 'weefsel', 'diagnostiek', 'digital'],
    category: 'Diagnostiek & Monitoring'
  },
  {
    id: 'remote-patient-monitoring',
    title: 'Remote Patient Monitoring',
    content: 'Thuismonitoring van vitale functies via IoT-devices. Ziekenhuiszorg naar huis brengen, reduceren heropnames, betere outcomes.',
    tags: ['remote', 'monitoring', 'IoT', 'thuiszorg', 'vitals'],
    category: 'Diagnostiek & Monitoring'
  },

  // BEHANDELING & THERAPIE (9 kaarten)
  {
    id: 'personalized-medicine',
    title: 'Gepersonaliseerde Geneeskunde',
    content: 'Medicijnen en behandelingen afgestemd op individueel genetisch profiel. Farmacogenomica voorkomt bijwerkingen en maximaliseert effectiviteit.',
    tags: ['personalized', 'genetica', 'farmaco', 'precision', 'DNA'],
    category: 'Behandeling & Therapie'
  },
  {
    id: 'immunotherapy',
    title: 'Immunotherapie',
    content: 'CAR-T cel therapie en checkpoint inhibitors die immuunsysteem activeren tegen kanker. Revolutionaire behandeling met langdurige remissie.',
    tags: ['immunotherapie', 'kanker', 'CAR-T', 'oncologie', 'biologisch'],
    category: 'Behandeling & Therapie'
  },
  {
    id: 'crispr-gene-therapy',
    title: 'CRISPR Gentherapie',
    content: 'Genetische schaar voor precisie-editing van DNA. Behandeling van erfelijke ziekten zoals sikkelcelanemie, hemofilie en spierziekten.',
    tags: ['CRISPR', 'gentherapie', 'genetica', 'editing', 'erfelijk'],
    category: 'Behandeling & Therapie'
  },
  {
    id: 'robotic-surgery',
    title: 'Robotchirurgie',
    content: 'Da Vinci robot voor minimaal invasieve operaties met extreme precisie. Sneller herstel, minder pijn, kleinere littekens.',
    tags: ['robot', 'chirurgie', 'minimal invasive', 'precisie', 'Da Vinci'],
    category: 'Behandeling & Therapie'
  },
  {
    id: 'nanomedicine',
    title: 'Nanogeneeskunde',
    content: 'Nanopartikels voor gerichte medicijnafgifte direct aan tumorcellen. Minimale bijwerkingen, maximale therapeutische werking.',
    tags: ['nano', 'medicijn', 'targeted', 'drug delivery', 'kanker'],
    category: 'Behandeling & Therapie'
  },
  {
    id: 'stem-cell-therapy',
    title: 'Stamceltherapie',
    content: 'Regeneratieve geneeskunde met stamcellen voor herstel van beschadigd weefsel. Behandeling van hartfalen, Parkinson, ruggenmergletsel.',
    tags: ['stamcellen', 'regeneratief', 'herstel', 'weefsel', 'therapie'],
    category: 'Behandeling & Therapie'
  },
  {
    id: '3d-bioprinting',
    title: '3D Bio-printing',
    content: 'Printen van levend weefsel, organen en implantaten. Toekomst: gepersonaliseerde orgaantransplantaties zonder donoren.',
    tags: ['3D printing', 'bioprinting', 'organen', 'weefsel', 'transplantatie'],
    category: 'Behandeling & Therapie'
  },
  {
    id: 'proton-therapy',
    title: 'Protontherapie',
    content: 'Gerichte bestralingstherapie met protonen voor kanker. Nauwkeurige tumor-targeting, minimale schade aan omliggend gezond weefsel.',
    tags: ['proton', 'bestraling', 'kanker', 'radiotherapie', 'precisie'],
    category: 'Behandeling & Therapie'
  },
  {
    id: 'focused-ultrasound',
    title: 'Focused Ultrasound',
    content: 'Non-invasieve behandeling van tumoren en essentiële tremor met gerichte ultrasoon. Geen snijden, geen straling.',
    tags: ['ultrasound', 'non-invasive', 'tumor', 'tremor', 'FUS'],
    category: 'Behandeling & Therapie'
  },

  // DIGITALE GEZONDHEID (7 kaarten)
  {
    id: 'telemedicine',
    title: 'Telegeneeskunde',
    content: 'Videoconsulten, e-consults en remote diagnose. Toegankelijke zorg voor afgelegen gebieden, tijdsbesparing, lagere kosten.',
    tags: ['telemedicine', 'video', 'remote', 'toegankelijk', 'digital'],
    category: 'Digitale Gezondheid'
  },
  {
    id: 'mental-health-apps',
    title: 'Mentale Gezondheid Apps',
    content: 'Digitale therapie voor depressie, angst en PTSD. CBT-apps, mindfulness, AI-chatbots voor 24/7 ondersteuning.',
    tags: ['mentaal', 'apps', 'therapie', 'CBT', 'mindfulness'],
    category: 'Digitale Gezondheid'
  },
  {
    id: 'ai-symptom-checker',
    title: 'AI Symptoomchecker',
    content: 'Slimme triagesystemen die symptomen analyseren en advies geven. Vermindering onnodige doktersbezoeken, snellere doorverwijzing.',
    tags: ['AI', 'symptomen', 'triage', 'diagnose', 'self-service'],
    category: 'Digitale Gezondheid'
  },
  {
    id: 'digital-therapeutics',
    title: 'Digital Therapeutics',
    content: 'Op bewijs gebaseerde digitale interventies als medicijn. FDA-goedgekeurde apps voor diabetes, astma, ADHD en verslaving.',
    tags: ['digital', 'therapeutics', 'app', 'FDA', 'interventie'],
    category: 'Digitale Gezondheid'
  },
  {
    id: 'blockchain-health-records',
    title: 'Blockchain Medisch Dossier',
    content: 'Gedecentraliseerde, onveranderbare patiëntendossiers. Patiënt heeft volledige controle, veilig delen tussen zorgverleners.',
    tags: ['blockchain', 'EPD', 'data', 'privacy', 'decentraal'],
    category: 'Digitale Gezondheid'
  },
  {
    id: 'vr-pain-management',
    title: 'VR Pijnbestrijding',
    content: 'Virtual reality voor afleiding bij acute en chronische pijn. Reductie opioid gebruik, effectief bij wondverzorging en fysiotherapie.',
    tags: ['VR', 'pijn', 'therapie', 'afleiding', 'non-farmacologisch'],
    category: 'Digitale Gezondheid'
  },
  {
    id: 'health-gamification',
    title: 'Gezondheid Gamification',
    content: 'Spelificatie van gezond gedrag: beweeg-apps, voedings-challenges, meditatie-streaks. Motivatie via rewards en social support.',
    tags: ['gamification', 'gedrag', 'preventie', 'motivatie', 'app'],
    category: 'Digitale Gezondheid'
  },

  // NEURO & BREIN (6 kaarten)
  {
    id: 'brain-computer-interface',
    title: 'Brein-Computer Interface',
    content: 'Directe communicatie tussen hersenen en computer. Neuralink en vergelijkbare technologie voor verlamden, Parkinson, epilepsie.',
    tags: ['BCI', 'neuralink', 'hersenen', 'neuraal', 'interface'],
    category: 'Neuro & Brein'
  },
  {
    id: 'deep-brain-stimulation',
    title: 'Diepe Hersenstimulatie',
    content: 'Implanteerbare neurostimulator voor Parkinson, dystonie en essentiële tremor. Elektrische pulsen moduleren hersenactiviteit.',
    tags: ['DBS', 'neurostimulatie', 'Parkinson', 'tremor', 'implantaat'],
    category: 'Neuro & Brein'
  },
  {
    id: 'neurofeedback',
    title: 'Neurofeedback Training',
    content: 'Real-time monitoring van hersenactiviteit met EEG. Trainen van hersengolven voor ADHD, angst, trauma en optimale performance.',
    tags: ['neurofeedback', 'EEG', 'training', 'brein', 'ADHD'],
    category: 'Neuro & Brein'
  },
  {
    id: 'transcranial-magnetic',
    title: 'Transcraniële Magnetische Stimulatie',
    content: 'TMS voor behandeling van therapie-resistente depressie. Non-invasieve magnetische pulsen stimuleren hersengebieden.',
    tags: ['TMS', 'depressie', 'magnetisch', 'non-invasive', 'neuropsychiatrie'],
    category: 'Neuro & Brein'
  },
  {
    id: 'ai-brain-imaging',
    title: 'AI Hersenscan Analyse',
    content: 'Machine learning detecteert vroege Alzheimer, tumoren en stroke op MRI/CT. Voorspelt ziekteprogressie en behandelrespons.',
    tags: ['AI', 'MRI', 'hersenen', 'Alzheimer', 'imaging'],
    category: 'Neuro & Brein'
  },
  {
    id: 'psychedelic-therapy',
    title: 'Psychedelische Therapie',
    content: 'Psilocybine, MDMA en ketamine voor PTSD, depressie en verslaving. Doorbraaktherapie onder medisch toezicht.',
    tags: ['psychedelisch', 'psilocybine', 'MDMA', 'PTSD', 'therapie'],
    category: 'Neuro & Brein'
  },

  // PREVENTIE & LEEFSTIJL (5 kaarten)
  {
    id: 'predictive-analytics',
    title: 'Predictieve Gezondheidsanalyse',
    content: 'AI voorspelt ziekterisico op basis van genetica, leefstijl en omgeving. Vroege interventie voorkomt ziekte-ontwikkeling.',
    tags: ['predictive', 'AI', 'preventie', 'risico', 'analytics'],
    category: 'Preventie & Leefstijl'
  },
  {
    id: 'microbiome-analysis',
    title: 'Microbioom Analyse',
    content: 'DNA-sequencing van darmbacteriën onthult link met obesitas, depressie, auto-immuun. Persoonlijke probiotica en dieet-advies.',
    tags: ['microbioom', 'darm', 'probiotica', 'DNA', 'personalized'],
    category: 'Preventie & Leefstijl'
  },
  {
    id: 'sleep-optimization',
    title: 'Slaapoptimalisatie Tech',
    content: 'Smart mattresses, slaap-tracking apps, lichttherapie en geluidsconditionering. Optimaliseer slaapkwaliteit voor gezondheid.',
    tags: ['slaap', 'optimization', 'tracking', 'licht', 'app'],
    category: 'Preventie & Leefstijl'
  },
  {
    id: 'nutrition-ai',
    title: 'AI Voedingscoach',
    content: 'Computer vision scant maaltijden, analyseert voedingswaarde en geeft persoonlijk advies. Integratie met wearables en bloedtests.',
    tags: ['voeding', 'AI', 'coaching', 'computer vision', 'personalized'],
    category: 'Preventie & Leefstijl'
  },
  {
    id: 'epigenetics',
    title: 'Epigenetica & Leefstijl',
    content: 'Hoe gedrag en omgeving genen aan/uit zetten. Leefstijlinterventies beïnvloeden gen-expressie en voorkomen ziekte.',
    tags: ['epigenetica', 'genen', 'leefstijl', 'preventie', 'expressie'],
    category: 'Preventie & Leefstijl'
  }
];

// 🔍 SLIMME ZOEKFUNCTIE
function findRelevantCards(query: string): AtlasCard[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);
  
  return atlasCards.filter(card => {
    const searchText = `
      ${card.title.toLowerCase()}
      ${card.content.toLowerCase()} 
      ${card.tags.join(' ').toLowerCase()}
      ${card.category.toLowerCase()}
    `;
    
    return queryWords.some(word => searchText.includes(word));
  }).slice(0, 5);
}

// 💡 SYNERGY DETECTION
function findSynergy(cards: AtlasCard[]): string | null {
  if (cards.length < 2) return null;

  const synergies = [
    { combo: ['AI Diagnostiek', 'Wearable Gezondheidstechnologie'], message: 'AI + Wearables = continue intelligente gezondheidsmonitoring!' },
    { combo: ['CRISPR Gentherapie', 'Gepersonaliseerde Geneeskunde'], message: 'CRISPR + Personalized = genetische correctie op maat!' },
    { combo: ['Brein-Computer Interface', 'AI Hersenscan Analyse'], message: 'BCI + AI = revolutionaire neuro-diagnostiek en behandeling!' },
    { combo: ['Blockchain Medisch Dossier', 'Telegeneeskunde'], message: 'Blockchain + Telemedicine = veilige remote zorg met complete data!' },
    { combo: ['Nanogeneeskunde', 'AI Diagnostiek'], message: 'Nano + AI = precisie-medicijn met real-time feedback!' },
    { combo: ['3D Bio-printing', 'Stamceltherapie'], message: '3D Printing + Stamcellen = gepersonaliseerde organen op aanvraag!' },
    { combo: ['Predictieve Gezondheidsanalyse', 'Microbioom Analyse'], message: 'Predictive AI + Microbiome = preventie op DNA-niveau!' },
    { combo: ['VR Pijnbestrijding', 'Digital Therapeutics'], message: 'VR + Digital Therapeutics = medicijnvrije pijnbehandeling!' },
    { combo: ['Immunotherapie', 'AI Pathologie'], message: 'Immunotherapie + AI = personalized kankerbehandeling!' },
    { combo: ['Robotchirurgie', 'AI Diagnostiek'], message: 'Robotic Surgery + AI = autonome precisie-operaties!' }
  ];

  for (const syn of synergies) {
    if (cards.some(c => c.title === syn.combo[0]) && cards.some(c => c.title === syn.combo[1])) {
      return syn.message;
    }
  }

  return `${cards[0].title} + ${cards[1].title} = innovatieve gezondheidszorg!`;
}

// ✂️ KORTE SAMENVATTING
function summarize(text: string, maxLength: number): string {
  const firstSentence = (text.split(/(?<=\.)\s/)[0] || text).trim();
  if (firstSentence.length <= maxLength) {
    return firstSentence.endsWith('.') ? firstSentence : firstSentence + '.';
  }
  const clipped = firstSentence.slice(0, maxLength).trimEnd();
  return (clipped.endsWith('.') ? clipped : clipped + '…');
}

// 🧠 ANTWOORD GENERATOR (kort of normaal)
function generateResponseText(query: string, mode: 'concise' | 'normal'): string {
  const cards = findRelevantCards(query);
  if (cards.length === 0) {
    return [
      'Ik vond geen directe match.',
      'Noem 1 onderwerp (bijv. "CRISPR", "wearables") of vraag een voorbeeld.',
      'Wil je uitleg, voor- en nadelen, of implementatietips?'
    ].join('\n');
  }

  if (mode === 'concise') {
    const top = cards.slice(0, 3);
    let out = `Kort antwoord op "${query}":\n`;
    for (const c of top) {
      out += `- ${c.title}: ${summarize(c.content, 90)}\n`;
    }
    const syn = findSynergy(top);
    if (syn) out += `\n💡 Synergie: ${syn}`;
    out += `\n\nWil je meer details of voorbeelden?`;
    return out;
  }

  // Normale weergave: compact, max 3 kaarten
  const top = cards.slice(0, 3);
  let out = `Gevonden voor "${query}":\n\n`;
  top.forEach((card, idx) => {
    out += `${idx + 1}. ${card.title}\n`;
    out += `📁 ${card.category}\n`;
    out += `${summarize(card.content, 200)}\n`;
    out += `🏷️ ${card.tags.slice(0, 4).join(', ')}\n\n`;
  });
  const syn = findSynergy(top);
  if (syn) out += `💡 Synergie: ${syn}\n\n`;
  out += 'Kies: voorbeeld, voor- en nadelen, of implementatie?';
  return out;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [conciseMode, setConciseMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('chatMessages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load messages');
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

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
    
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now()
    }]);

    try {
      const responseText = generateResponseText(userMessage, conciseMode ? 'concise' : 'normal');
      // STREAM CHARACTER BY CHARACTER (sneller in korte modus)
      for (let i = 0; i < responseText.length; i++) {
        const char = responseText[i];
        setMessages(prev => prev.map(msg => 
          msg.id === assistantId 
            ? { ...msg, content: msg.content + char }
            : msg
        ));
        await new Promise(resolve => setTimeout(resolve, conciseMode ? 2 : 8));
      }
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === assistantId 
          ? { ...msg, content: 'Sorry, er ging iets mis.' }
          : msg
      ));
    }

    setIsStreaming(false);
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.role === 'user' ? 'Jij' : 'Atlas'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atlas-health-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    if (confirm('Chat wissen?')) {
      setMessages([]);
      sessionStorage.removeItem('chatMessages');
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('nl-NL', { 
      hour: '2-digit', minute: '2-digit' 
    });
  };

  const categories = [...new Set(atlasCards.map(c => c.category))];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
      <header className="border-b border-emerald-800/30 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-100">🏥 Atlas Health Edition</h1>
                <p className="text-sm text-emerald-300">35 Gezondheidszorg Innovaties</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setConciseMode(v => !v)}
                aria-pressed={conciseMode}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
                  conciseMode
                    ? 'text-emerald-300 border-emerald-600/40 bg-emerald-900/20'
                    : 'text-slate-400 border-slate-700/50 hover:text-slate-300 hover:border-emerald-600/40'
                }`}
                title="Schakel korte antwoorden in/uit"
              >
                <Zap className="w-4 h-4" />
                {conciseMode ? 'Korte antwoorden' : 'Uitgebreid'}
              </button>
              <button onClick={exportChat} disabled={messages.length === 0}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-300 disabled:opacity-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button onClick={clearChat} disabled={messages.length === 0}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors">
                <Trash2 className="w-4 h-4" />
                Wissen
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                <Heart className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 mb-3">
                Welkom bij Atlas Health Edition
              </h2>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Ontdek 35 baanbrekende gezondheidszorg innovaties: van AI diagnostiek tot CRISPR gentherapie!
              </p>
              
              <div className="space-y-8">
                {categories.map(category => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-emerald-300 mb-4 text-left">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {atlasCards.filter(c => c.category === category).map(card => (
                        <button
                          key={card.id}
                          onClick={() => setInput(card.title)}
                          className="group p-3 text-left rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-emerald-800/20 hover:border-emerald-600/50 transition-all"
                        >
                          <h4 className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 mb-1 leading-tight">
                            {card.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                            {card.content}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {card.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-slate-900/60 text-slate-500">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-500/20 text-blue-100 border border-blue-500/30'
                      : 'bg-slate-800/50 text-slate-100 border border-slate-700/50'
                  }`}>
                    <div className="whitespace-pre-wrap break-words">{message.content}</div>
                  </div>
                  <div className={`text-xs text-slate-500 mt-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-emerald-800/30 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto p-4">
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
                placeholder={conciseMode ? 'Stel je vraag (korte antwoorden aan)…' : 'Stel je vraag (uitgebreid)…'}
                disabled={isStreaming}
                rows={1}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none disabled:opacity-50 transition-all"
                style={{ minHeight: '52px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="px-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-medium"
            >
              {isStreaming ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Versturen
                </>
              )}
            </button>
          </form>
          {/* Snelle suggesties voor gebruiksvriendelijkheid */}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {['Leg uit in 2 zinnen', 'Voor- en nadelen', 'Praktisch voorbeeld', 'Privacy & ethiek', 'Implementatie tips'].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  const lastUser = [...messages].reverse().find(m => m.role === 'user');
                  const base = lastUser?.content || 'AI diagnostiek';
                  const prompt = `${base} — ${label.toLowerCase()}`;
                  setInput(prompt);
                }}
                className="text-xs px-2.5 py-1 rounded-full border border-slate-700/50 text-slate-400 hover:text-emerald-300 hover:border-emerald-600/50 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 mt-2 text-center">
            {isStreaming ? '⚡ Atlas schrijft...' : 'Shift+Enter voor nieuwe regel • 35 kenniskaarten geladen'}
          </div>
        </div>
      </div>
    </div>
  );
}
