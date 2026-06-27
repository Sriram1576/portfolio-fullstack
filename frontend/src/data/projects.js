const projects = [
  {
    id: 'stock-trend-predictor',
    title: 'Stock Trend Predictor',
    category: 'Finance',
    description: 'An AI-powered tool that predicts next-day stock direction using OHLCV data and technical indicators.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    highlights: [
      'Achieved 78% directional accuracy on Nifty 50 back-tests',
      'Engineered 20+ technical indicator features including RSI, MACD, and Bollinger Bands',
    ],
    github: 'https://github.com/Sriram1576/Stock-Trend-Predictor',
    orderIndex: 1,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'universal-recommendation',
    title: 'Universal Recommendation',
    category: 'AI',
    description: 'A generalized recommendation engine that adapts across domains using collaborative filtering techniques.',
    technologies: ['Python', 'Machine Learning', 'Data Analysis'],
    highlights: [
      'Built domain-agnostic architecture supporting movies, books, and e-commerce datasets',
      'Implemented collaborative and content-based filtering with hybrid fallback strategy',
    ],
    github: 'https://github.com/Sriram1576/Universal-Recommendation',
    orderIndex: 2,
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
  },
];

export default projects;
