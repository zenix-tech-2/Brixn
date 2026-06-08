import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { DATA } from '../lib/data';
import { useApp } from '../lib/state';
import ProductCard from '../components/ProductCard';
import {
  Heart,
  Star,
  Shield,
  Check,
  ArrowRight,
  Sparkle,
  Eye,
  Clock,
  Download,
  Brain,
  Play,
  Tag,
  Link as LinkIcon,
} from '../components/Icons';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = DATA.products.find((p) => p.id === id);
  const { favorites, toggleFavorite, user, addToCart, library } = useApp();
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<'desc' | 'preview' | 'reviews' | 'ai'>('desc');
  const [aiDemo, setAiDemo] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const creator = useMemo(
    () => (product ? DATA.creators.find((c) => c.id === product.creatorId) : undefined),
    [product],
  );
  const related = useMemo(
    () =>
      product
        ? DATA.products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)
        : [],
    [product],
  );

  if (!product || !creator) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center">
        <p className="text-zinc-400">Product not found.</p>
        <Link to="/browse" className="text-violet-300 underline text-sm">Back to browse</Link>
      </div>
    );
  }

  const safeProduct = product;
  const isFav = favorites.includes(safeProduct.id);
  const owned = library.includes(product.id);

  async function runAi(e: React.FormEvent) {
    e.preventDefault();
    if (!aiDemo.trim()) return;
    setAiLoading(true);
    setAiResponse('');
    await new Promise((r) => setTimeout(r, 900));
    const samples = [
      `Based on "${safeProduct.title}" — here's a tailored approach:\n\n1. Start by duplicating the template and reviewing the database schema for 10 minutes.\n2. Customize the 3 core properties to match your workflow.\n3. Use the weekly review template each Sunday for 30 days to build the habit.\n4. Connect your existing notes via the import map (included in the pack).\n\nPro tip: pair this with the Grok prompt pack for auto-categorizing new entries.`,
      `Great question! "${safeProduct.title}" works best when you:\n\n• Spend 15 min in the onboarding video first (it's short).\n• Personalize tags before adding your own data — this prevents cleanup later.\n• Duplicate the examples database so you always have a clean reference.\n\nWant me to walk you through a specific scenario? Just ask.`,
    ];
    const txt = samples[Math.floor(Math.random() * samples.length)];
    for (let i = 0; i < txt.length; i++) {
      setAiResponse(txt.slice(0, i + 1));
      await new Promise((r) => setTimeout(r, 8));
    }
    setAiLoading(false);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Link to="/browse" className="text-sm text-zinc-500 hover:text-white inline-flex items-center gap-1 mb-6">
        ← Back to browse
      </Link>

      <div className="grid lg:grid-cols-[1.2fr,1fr] gap-10">
        <div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
            <img src={product.gallery[activeImg] || product.cover} alt={product.title} className="w-full h-full object-cover" />
            {product.aiEnhanced && (
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/70 border border-white/10 backdrop-blur text-white inline-flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-violet-300" /> Live AI preview
              </div>
            )}
            {product.previewVideo && (
              <button className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white inline-flex items-center justify-center">
                <Play className="w-6 h-6 ml-0.5" />
              </button>
            )}
          </div>
          {product.gallery.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition ${
                    activeImg === i ? 'border-violet-500' : 'border-transparent'
                  }`}
                >
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Preview / "what you'll get" */}
          <div className="card-glass rounded-2xl p-5 mt-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-violet-300" /> What you'll get
            </h3>
            <ul className="space-y-2">
              {product.whatYouGet.map((w) => (
                <li key={w} className="flex gap-3 text-sm text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-300 inline-flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            {product.fileSize && (
              <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-4 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> {product.fileSize}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Updated {product.updatedAt}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link to={`/creator/${creator.handle}`} className="text-sm text-violet-300 hover:text-violet-200">
              {creator.name}
              {creator.verified && <span className="ml-1">✓</span>}
            </Link>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-500">{product.category}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{product.title}</h1>

          <div className="flex items-center gap-4 mt-4 text-sm text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400" />
              <strong className="text-white">{product.rating}</strong>
              <span>({product.reviews} reviews)</span>
            </span>
            <span>{product.sales.toLocaleString()}+ sold</span>
          </div>

          <div className="flex items-end gap-3 mt-6">
            <span className="text-4xl font-display font-bold text-white">${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-zinc-500 line-through mb-1">${product.oldPrice}</span>
                <span className="text-xs px-2 py-1 rounded-md bg-rose-500/20 text-rose-300 font-semibold mb-1">
                  Save ${product.oldPrice - product.price}
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-zinc-300 leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-5">
            {product.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            {owned ? (
              <Link to="/library" className="flex-1 btn-primary py-3 rounded-xl font-semibold text-center inline-flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Go to library
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    if (!user) { navigate('/auth'); return; }
                    navigate(`/checkout/${product.id}`);
                  }}
                  className="flex-1 btn-primary py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
                >
                  Buy now <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => addToCart(product.id)}
                  className="py-3 px-5 rounded-xl font-semibold border border-zinc-800 hover:border-zinc-700 bg-zinc-900"
                >
                  <Tag className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`py-3 px-4 rounded-xl font-semibold border transition inline-flex items-center justify-center ${
                isFav ? 'border-rose-500/40 bg-rose-500/10 text-rose-300' : 'border-zinc-800 bg-zinc-900'
              }`}
            >
              <Heart className="w-4 h-4" filled={isFav} />
            </button>
          </div>

          <div className="card-glass rounded-2xl p-4 mt-6 flex items-start gap-3">
            <Shield className="w-5 h-5 text-violet-300 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-400 leading-relaxed">
              <strong className="text-white">Secure manual checkout.</strong> Pay via PayPal, Wise, crypto,
              M-Pesa, MoMo, or bank. Upload a screenshot — we approve within 24 hours. No payment
              processor ever sees your data.
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 border-b border-zinc-900 flex gap-1 overflow-x-auto no-scrollbar">
        {[
          { k: 'desc', label: 'Description' },
          { k: 'preview', label: 'Previews & demos' },
          { k: 'ai', label: 'AI assistant' },
          { k: 'reviews', label: `Reviews (${product.reviews})` },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              tab === t.k ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="py-8">
        {tab === 'desc' && (
          <div className="prose prose-invert max-w-3xl">
            <p className="text-zinc-300 leading-relaxed">{product.description}</p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              This product ships with lifetime updates and direct creator support. Because approvals are
              manual, you get a real human on the other side reviewing your proof — not an algorithm.
            </p>
          </div>
        )}
        {tab === 'preview' && (
          <div className="grid md:grid-cols-2 gap-4">
            {product.gallery.map((g, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-zinc-800">
                <img src={g} className="w-full aspect-[4/3] object-cover" alt="preview" />
              </div>
            ))}
            <div className="rounded-xl border border-zinc-800 p-5 flex items-center gap-4 bg-zinc-900/50">
              <div className="w-12 h-12 rounded-xl bg-violet-500/15 text-violet-300 flex items-center justify-center">
                <LinkIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">Notion duplicate link</div>
                <div className="text-xs text-zinc-400">Revealed instantly after approval</div>
              </div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="max-w-2xl">
            <div className="card-glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-violet-500/15 text-violet-300 flex items-center justify-center">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Ask the {product.title.split(' ')[0]} assistant</div>
                  <div className="text-xs text-zinc-500">Try a free demo — powered by Grok, Gemini, or OpenAI</div>
                </div>
              </div>

              <form onSubmit={runAi} className="flex gap-2">
                <input
                  value={aiDemo}
                  onChange={(e) => setAiDemo(e.target.value)}
                  placeholder="e.g. How do I start using this?"
                  className="flex-1 h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none text-sm"
                />
                <button className="btn-primary px-4 rounded-xl text-sm font-semibold" disabled={aiLoading}>
                  {aiLoading ? 'Thinking…' : 'Ask'}
                </button>
              </form>

              {aiResponse && (
                <div className="mt-4 p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 text-sm text-zinc-200 whitespace-pre-wrap">
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        )}
        {tab === 'reviews' && (
          <div className="space-y-4 max-w-3xl">
            {[
              { n: 'Priya S.', r: 5, t: 'Worth every cent', d: 'The structure alone saved me 10+ hours. The creator was responsive when I had a question about importing from Evernote.' },
              { n: 'Marcus J.', r: 5, t: 'Clean and thoughtful', d: 'Minimal, well-organized, and the weekly review habit actually stuck. Highly recommend.' },
              { n: 'Lena K.', r: 4, t: 'Great, needs one tweak', d: 'Loved it, wish the tag database was slightly more flexible out of the box. Easy to customize though.' },
            ].map((r) => (
              <div key={r.n} className="card-glass rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />
                  <div>
                    <div className="font-semibold text-sm">{r.n}</div>
                    <div className="text-xs text-amber-400">{'★'.repeat(r.r)}</div>
                  </div>
                </div>
                <h4 className="font-semibold text-sm">{r.t}</h4>
                <p className="text-sm text-zinc-400 mt-1">{r.d}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold mb-5">You may also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
