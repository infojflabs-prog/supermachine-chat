export type AtlasCard = {
  id: string;
  title: string;
  content: string;
  tags: string[];
};

// Expanded to 8 cards; easy to extend to 20+
export const atlasCards: AtlasCard[] = [
  {
    id: 'ai-healthcare',
    title: 'AI in Gezondheidszorg',
    content:
      'Kunstmatige intelligentie voor medische diagnostiek, behandeling en patiëntenzorg. Machine learning modellen kunnen ziekten eerder detecteren en persoonlijke behandelplannen maken.',
    tags: ['AI', 'gezondheidszorg', 'diagnostiek', 'tech', 'innovatie']
  },
  {
    id: 'quantum-computing',
    title: 'Quantum Computing',
    content:
      'Revolutionaire rekenkracht gebaseerd op quantum mechanica. Kan complexe problemen oplossen die onmogelijk zijn voor klassieke computers, zoals medicijnontwikkeling en klimaatmodellen.',
    tags: ['quantum', 'computing', 'tech', 'innovatie', 'research']
  },
  {
    id: 'mental-health-tech',
    title: 'Digitale Mentale Gezondheid',
    content:
      'Apps en platformen voor psychologische ondersteuning, mindfulness en therapie. Bereikt nieuwe doelgroepen en vermindert drempels voor zorg.',
    tags: ['mentaal', 'gezondheid', 'apps', 'tech', 'zorg']
  },
  {
    id: 'blockchain-health',
    title: 'Blockchain in Gezondheidszorg',
    content:
      'Veilige, gedecentraliseerde opslag van medische data. Patiënten hebben controle over hun eigen gezondheidsinformatie en kunnen deze veilig delen.',
    tags: ['blockchain', 'data', 'veiligheid', 'zorg', 'tech']
  },
  {
    id: 'sustainable-energy',
    title: 'Duurzame Energie',
    content:
      'Zonne-energie, windenergie en groene waterstof voor een CO2-vrije toekomst. Smart grids en energieopslag voor betrouwbare duurzame stroom.',
    tags: ['energie', 'duurzaam', 'zon', 'wind', 'klimaat', 'tech']
  },
  {
    id: 'circular-economy',
    title: 'Circulaire Economie',
    content:
      'Zero-waste systemen waar afval niet bestaat en alles wordt hergebruikt. Van lineaire consumptie naar circulaire ecosystemen.',
    tags: ['circulair', 'economie', 'duurzaam', 'recycling', 'innovatie']
  },
  {
    id: 'fintech-innovation',
    title: 'Fintech Innovatie',
    content:
      'Blockchain, digitale euro, slimme contracten en AI-gestuurde investeringen. Democratisering van financiële diensten.',
    tags: ['fintech', 'blockchain', 'AI', 'banken', 'digitale valuta']
  },
  {
    id: 'smart-cities',
    title: 'Smart Cities',
    content:
      'IoT-sensoren, data-analyse en AI voor slimme stedelijke planning. Verkeersmanagement, energie-efficiëntie en digitale burgerdiensten.',
    tags: ['smart', 'cities', 'IoT', 'data', 'AI', 'urban']
  }
];

export function searchAtlasCards(query: string): AtlasCard[] {
  const queryLower = query.trim().toLowerCase();
  if (!queryLower) return [];
  return atlasCards.filter(card =>
    card.title.toLowerCase().includes(queryLower) ||
    card.content.toLowerCase().includes(queryLower) ||
    card.tags.some(tag => tag.toLowerCase().includes(queryLower))
  );
}
