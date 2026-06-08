export type ProductType =
  | 'template'
  | 'prompt-pack'
  | 'course'
  | 'preset'
  | 'printable'
  | 'ai-asset'
  | 'hybrid';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  banner: string;
  verified?: boolean;
  sales: number;
  rating: number;
}

export interface Product {
  id: string;
  title: string;
  type: ProductType;
  category: string;
  price: number;
  oldPrice?: number;
  currency: string;
  creatorId: string;
  cover: string;
  gallery: string[];
  previewVideo?: string;
  description: string;
  whatYouGet: string[];
  tags: string[];
  rating: number;
  reviews: number;
  sales: number;
  views: number;
  trending?: boolean;
  featured?: boolean;
  aiEnhanced?: boolean;
  fileSize?: string;
  updatedAt: string;
}

const creators: Creator[] = [
  {
    id: 'c1',
    name: 'Aurora Vance',
    handle: 'aurora',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Aurora&backgroundColor=b6e3f4',
    bio: 'Notion systems architect building calm, powerful workflows for modern teams.',
    banner: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600',
    verified: true,
    sales: 2840,
    rating: 4.9,
  },
  {
    id: 'c2',
    name: 'Kai Mensah',
    handle: 'kai.builds',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kai&backgroundColor=c0aede',
    bio: 'Prompt engineer. AI workflows. Building the future of thought.',
    banner: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=1600',
    verified: true,
    sales: 5120,
    rating: 4.8,
  },
  {
    id: 'c3',
    name: 'Studio Oryx',
    handle: 'oryx',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Oryx&backgroundColor=ffdfbf',
    bio: 'A boutique design studio shipping cinematic LUTs & editorial presets since 2021.',
    banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600',
    verified: true,
    sales: 1720,
    rating: 4.9,
  },
  {
    id: 'c4',
    name: 'Noor Farouk',
    handle: 'noorwrites',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Noor&backgroundColor=ffd5dc',
    bio: 'Writes deep playbooks for solo founders. Micro-courses, eBooks & systems.',
    banner: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1600',
    verified: false,
    sales: 860,
    rating: 4.7,
  },
  {
    id: 'c5',
    name: 'Pixel Hive',
    handle: 'pixelhive',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Pixel&backgroundColor=d1d4f9',
    bio: 'Icon packs, UI kits & illustrations — crafted in Figma, used by thousands.',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600',
    verified: true,
    sales: 3410,
    rating: 4.8,
  },
  {
    id: 'c6',
    name: 'Ines Diallo',
    handle: 'ines',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ines&backgroundColor=b6e3f4',
    bio: 'Planner nerd. Printable designer. Sunday-reset enthusiast.',
    banner: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600',
    verified: false,
    sales: 540,
    rating: 4.6,
  },
];

const covers = {
  notion1: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80',
  notion2: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&q=80',
  ai1: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  ai2: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80',
  preset1: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80',
  preset2: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80',
  course1: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
  course2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
  print: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80',
  icon: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
  hybrid: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
  aiAsset: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1200&q=80',
};

const products: Product[] = [
  {
    id: 'p001',
    title: 'Calm OS — Minimal Notion Life System',
    type: 'template',
    category: 'Notion Templates',
    price: 29,
    oldPrice: 49,
    currency: 'USD',
    creatorId: 'c1',
    cover: covers.notion1,
    gallery: [covers.notion1, covers.notion2],
    description:
      'A beautifully minimal Notion workspace that consolidates goals, tasks, notes, finances, and reading into one calm, interconnected system. Used by founders, creators, and students in 40+ countries.',
    whatYouGet: [
      '1 master dashboard + 7 linked databases',
      'Weekly, quarterly & yearly review templates',
      'Reading & learning tracker',
      'Finance log with pre-built formulas',
      'Lifetime updates & onboarding video',
    ],
    tags: ['notion', 'productivity', 'lifeos', 'minimal', 'planner'],
    rating: 4.9,
    reviews: 312,
    sales: 1840,
    views: 24000,
    trending: true,
    featured: true,
    fileSize: '2.4 MB',
    updatedAt: '2026-01-18',
  },
  {
    id: 'p002',
    title: 'The Grok Master Pack — 420 Prompt Library',
    type: 'prompt-pack',
    category: 'AI Prompt Packs',
    price: 39,
    currency: 'USD',
    creatorId: 'c2',
    cover: covers.ai1,
    gallery: [covers.ai1, covers.ai2],
    description:
      '420 battle-tested prompts for Grok, GPT-5, Claude Opus & Gemini. Organized across 12 domains: writing, research, coding, image prompting, strategy, and more.',
    whatYouGet: [
      '420 tagged & categorized prompts (CSV + Notion)',
      'Prompt chaining framework',
      'Role-preset library for xAI Grok',
      'Weekly update feed (12 months)',
      'Private Discord invite',
    ],
    tags: ['ai', 'prompts', 'grok', 'chatgpt', 'writing', 'coding'],
    rating: 4.8,
    reviews: 518,
    sales: 3210,
    views: 48000,
    trending: true,
    featured: true,
    aiEnhanced: true,
    fileSize: '820 KB',
    updatedAt: '2026-02-02',
  },
  {
    id: 'p003',
    title: 'Cinematic LUTs Vol. 3 — Kodak Portra 400',
    type: 'preset',
    category: 'Presets & LUTs',
    price: 24,
    currency: 'USD',
    creatorId: 'c3',
    cover: covers.preset1,
    gallery: [covers.preset1, covers.preset2],
    description:
      '15 film-emulation LUTs crafted from real Portra 400 scans. Includes LOG and Rec.709 versions for Davinci Resolve, Premiere Pro, Final Cut & CapCut.',
    whatYouGet: [
      '15 .cube LUTs (LOG + Rec.709)',
      'Before/after reference stills',
      'Installation guide for 6 editors',
      'Matching Lightroom presets',
    ],
    tags: ['lut', 'preset', 'film', 'cinematic', 'color'],
    rating: 4.9,
    reviews: 202,
    sales: 1104,
    views: 18200,
    trending: true,
    fileSize: '36 MB',
    updatedAt: '2026-01-22',
  },
  {
    id: 'p004',
    title: 'The Solopreneur Launch Playbook',
    type: 'course',
    category: 'Micro-courses & eBooks',
    price: 59,
    oldPrice: 89,
    currency: 'USD',
    creatorId: 'c4',
    cover: covers.course1,
    gallery: [covers.course1, covers.course2],
    description:
      'A 4-module micro-course covering idea validation, positioning, launch copy, and first-100-customers. Includes workbook, templates, and 2 live Q&A recordings.',
    whatYouGet: [
      '4 video modules (3h 40m runtime)',
      '80-page PDF workbook',
      'Cold-outreach swipe file (40 templates)',
      'Launch checklist (Notion)',
      'Access to student Circle',
    ],
    tags: ['course', 'business', 'solopreneur', 'launch'],
    rating: 4.7,
    reviews: 184,
    sales: 760,
    views: 15400,
    featured: true,
    fileSize: '1.4 GB',
    updatedAt: '2026-02-10',
  },
  {
    id: 'p005',
    title: 'Glyph — 2400 Icon Library (Figma + SVG)',
    type: 'ai-asset',
    category: 'Graphics & Icons',
    price: 19,
    currency: 'USD',
    creatorId: 'c5',
    cover: covers.icon,
    gallery: [covers.icon, covers.aiAsset],
    description:
      '2400 pixel-perfect 24px icons designed in Figma. MIT-style license for personal & commercial work. Includes variants, weights, and a searchable component library.',
    whatYouGet: [
      '2400 SVG icons (single + sprite sheet)',
      'Figma component library with variants',
      'Searchable web preview',
      'React + Vue icon packages',
    ],
    tags: ['icons', 'figma', 'ui', 'svg', 'design-system'],
    rating: 4.8,
    reviews: 441,
    sales: 2890,
    views: 32100,
    trending: true,
    fileSize: '12 MB',
    updatedAt: '2026-02-08',
  },
  {
    id: 'p006',
    title: '2026 Sunday Reset Printable Planner Bundle',
    type: 'printable',
    category: 'Planners & Printables',
    price: 14,
    currency: 'USD',
    creatorId: 'c6',
    cover: covers.print,
    gallery: [covers.print],
    description:
      'A warm, printable weekly reset kit. 32 pages — weekly spread, meal plan, habit tracker, budget review, brain-dump, and a goal-setting spread.',
    whatYouGet: [
      '32-page PDF (A4 + US Letter)',
      'GoodNotes + Notability versions',
      'Neutral & pastel color variants',
      'Canva editable link',
    ],
    tags: ['printable', 'planner', 'wellness', 'organization'],
    rating: 4.6,
    reviews: 98,
    sales: 410,
    views: 9200,
    fileSize: '28 MB',
    updatedAt: '2026-01-05',
  },
  {
    id: 'p007',
    title: 'Voice-Clone Starter Kit (ElevenLabs + xAI)',
    type: 'hybrid',
    category: 'Hybrid Digital Assets',
    price: 44,
    currency: 'USD',
    creatorId: 'c2',
    cover: covers.hybrid,
    gallery: [covers.hybrid, covers.ai2],
    description:
      'A complete starter kit for deploying branded voice clones — script templates, sample audio packs, API glue code, and a working demo app.',
    whatYouGet: [
      'Voice-copy brief & consent templates',
      'Sample audio pack (8 voices, 40 clips)',
      'Next.js demo app (TypeScript, MIT)',
      'Prompt set for script generation',
      '60-min walkthrough video',
    ],
    tags: ['ai', 'voice', 'elevenlabs', 'developer', 'hybrid'],
    rating: 4.8,
    reviews: 88,
    sales: 320,
    views: 7100,
    aiEnhanced: true,
    fileSize: '620 MB',
    updatedAt: '2026-02-12',
  },
  {
    id: 'p008',
    title: 'Obsidian Graph Vault — Research Edition',
    type: 'template',
    category: 'Obsidian Templates',
    price: 22,
    currency: 'USD',
    creatorId: 'c1',
    cover: covers.notion2,
    gallery: [covers.notion2, covers.notion1],
    description:
      'A curated Obsidian vault pre-configured for academic & industry research: Zettelkasten flow, literature notes, citation templates, and 40+ Canvas views.',
    whatYouGet: [
      'Pre-configured Obsidian vault',
      '30+ community plugins configured',
      'Canvas research maps',
      'Citation + Zotero workflow',
      'Onboarding call (30 min, optional)',
    ],
    tags: ['obsidian', 'research', 'writing', 'zettelkasten'],
    rating: 4.7,
    reviews: 142,
    sales: 610,
    views: 11300,
    fileSize: '18 MB',
    updatedAt: '2026-01-30',
  },
  {
    id: 'p009',
    title: 'Brand Identity Kit — Modern Editorial',
    type: 'ai-asset',
    category: 'Graphics & Icons',
    price: 34,
    oldPrice: 54,
    currency: 'USD',
    creatorId: 'c3',
    cover: covers.preset2,
    gallery: [covers.preset2, covers.preset1],
    description:
      'A sophisticated editorial brand kit — 4 type pairings, 60 mark components, 12 palette presets, and 20 social templates for Figma & Canva.',
    whatYouGet: [
      'Figma components + type system',
      'Canva template link',
      '60 logo mark SVGs',
      'Brand guideline PDF',
    ],
    tags: ['brand', 'logo', 'figma', 'canva', 'editorial'],
    rating: 4.9,
    reviews: 76,
    sales: 280,
    views: 6400,
    fileSize: '84 MB',
    updatedAt: '2026-01-15',
  },
  {
    id: 'p010',
    title: 'Gemini Vision Prompt Library — 220 Use Cases',
    type: 'prompt-pack',
    category: 'AI Prompt Packs',
    price: 27,
    currency: 'USD',
    creatorId: 'c2',
    cover: covers.ai2,
    gallery: [covers.ai2, covers.ai1],
    description:
      '220 prompts optimized for Gemini 2.5 Pro Vision — screenshot-to-code, UI audit, OCR workflows, diagram reasoning, and chart analysis.',
    whatYouGet: [
      '220 vision-first prompts',
      'JSON & XML exportable',
      'Web-based prompt tester',
      'Monthly additions (6 months)',
    ],
    tags: ['gemini', 'google', 'vision', 'prompts', 'multimodal'],
    rating: 4.8,
    reviews: 203,
    sales: 980,
    views: 14800,
    aiEnhanced: true,
    fileSize: '540 KB',
    updatedAt: '2026-02-04',
  },
  {
    id: 'p011',
    title: 'Indie Finance Tracker (Google Sheets)',
    type: 'template',
    category: 'Spreadsheets',
    price: 18,
    currency: 'USD',
    creatorId: 'c6',
    cover: covers.print,
    gallery: [covers.print],
    description:
      'A single-tab Google Sheets finance tracker purpose-built for indie creators and micro-SaaS founders. MRR, runway, tax estimate, and payout logs.',
    whatYouGet: [
      'Google Sheets template (view/duplicate)',
      'Setup walkthrough (12 min)',
      'Multi-currency support',
      'Stripe + Lemon Squeezy import scripts',
    ],
    tags: ['finance', 'sheets', 'indie', 'mrr', 'saas'],
    rating: 4.7,
    reviews: 61,
    sales: 240,
    views: 5800,
    fileSize: '1 MB',
    updatedAt: '2025-12-18',
  },
  {
    id: 'p012',
    title: 'Daily UI Copywriting Handbook',
    type: 'course',
    category: 'Micro-courses & eBooks',
    price: 16,
    currency: 'USD',
    creatorId: 'c4',
    cover: covers.course2,
    gallery: [covers.course2, covers.course1],
    description:
      'A concise 88-page handbook for writing button labels, empty states, errors, onboarding, and pricing pages. Includes 200+ examples analyzed.',
    whatYouGet: [
      '88-page PDF + ePub',
      '200+ annotated examples',
      'Notion swipe-file template',
      'AI-polish checklist',
    ],
    tags: ['copywriting', 'ux', 'writing', 'design'],
    rating: 4.8,
    reviews: 137,
    sales: 620,
    views: 10900,
    fileSize: '14 MB',
    updatedAt: '2026-01-12',
  },
];

export const categories = [
  { name: 'All', slug: 'all', count: products.length },
  { name: 'Notion Templates', slug: 'notion', count: products.filter((p) => p.category === 'Notion Templates').length },
  { name: 'AI Prompt Packs', slug: 'prompts', count: products.filter((p) => p.category === 'AI Prompt Packs').length },
  { name: 'Micro-courses & eBooks', slug: 'courses', count: products.filter((p) => p.category === 'Micro-courses & eBooks').length },
  { name: 'Presets & LUTs', slug: 'presets', count: products.filter((p) => p.category === 'Presets & LUTs').length },
  { name: 'Planners & Printables', slug: 'planners', count: products.filter((p) => p.category === 'Planners & Printables').length },
  { name: 'Graphics & Icons', slug: 'graphics', count: products.filter((p) => p.category === 'Graphics & Icons').length },
  { name: 'Hybrid Assets', slug: 'hybrid', count: products.filter((p) => p.category === 'Hybrid Digital Assets').length },
  { name: 'Spreadsheets', slug: 'sheets', count: products.filter((p) => p.category === 'Spreadsheets').length },
];

export const PAYMENT_METHODS = [
  { id: 'paypal', name: 'PayPal', icon: '🅿️', detail: 'pay@brixnode.com', note: 'Friends & Family preferred' },
  { id: 'wise', name: 'Wise', icon: '🅦', detail: 'wise.com/pay/brixnode', note: 'Low-fx international' },
  { id: 'btc', name: 'Bitcoin', icon: '₿', detail: 'bc1q...hn4x (see checkout for full address)', note: 'Network: Bitcoin' },
  { id: 'usdt', name: 'USDT (TRC-20)', icon: '💎', detail: 'TQn9...mP4a', note: 'Tron network only' },
  { id: 'mpesa', name: 'M-Pesa', icon: '🇰🇪', detail: '+254 712 345 678', note: 'East Africa' },
  { id: 'opay', name: 'OPay', icon: '🟧', detail: '+234 803 000 1122', note: 'Nigeria' },
  { id: 'momo', name: 'MoMo (MTN)', icon: '🟨', detail: '+233 557 123 456', note: 'Ghana' },
  { id: 'bank', name: 'Bank Transfer (Wise)', icon: '🏦', detail: 'IBAN: BE79 9672 ...', note: 'SEPA / UK / US' },
];

export const DATA = { products, creators, categories };
