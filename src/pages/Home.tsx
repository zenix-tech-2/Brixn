import { Link } from 'react-router-dom';
import { DATA } from '../lib/data';
import ProductCard from '../components/ProductCard';
import {
  Sparkle,
  Shield,
  Bolt,
  Brain,
  ArrowRight,
  Star,
  Play,
  Download,
  Store,
  Camera,
  Heart,
} from '../components/Icons';

export default function Home() {
  const trending = DATA.products.filter((p) => p.trending).slice(0, 4);
  const featured = DATA.products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = [...DATA.products].reverse().slice(0, 4);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-radial-violet pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs text-violet-200 mb-8">
              <Sparkle className="w-3.5 h-3.5" />
              <span>Now open — manual approvals within 24h</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              The elevated hub for <br className="hidden sm:block" />
              <span className="text-gradient">digital tools & AI assets</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Premium templates, prompt packs, presets, courses, and AI-ready assets from the world's
              most thoughtful creators. Pay how you want — get access in hours, not minutes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/browse"
                className="btn-primary inline-flex px-6 py-3.5 rounded-xl font-semibold items-center justify-center gap-2"
              >
                Explore the marketplace <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/sell"
                className="inline-flex px-6 py-3.5 rounded-xl font-semibold items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-zinc-800 transition"
              >
                <Store className="w-4 h-4" /> Become a creator
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl mx-auto">
              {[
                { k: '12k+', v: 'digital assets' },
                { k: '480+', v: 'verified creators' },
                { k: '4.8★', v: 'avg. rating' },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white">{s.k}</div>
                  <div className="text-xs text-zinc-500 mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { icon: Shield, title: 'Secure & curated', body: 'Every product is reviewed before going live.' },
            { icon: Bolt, title: 'Fast approval', body: 'Manual review within 24 hours of proof upload.' },
            { icon: Brain, title: 'AI-augmented', body: 'Every purchase ships with AI tester & assistant.' },
          ].map((f) => (
            <div key={f.title} className="card-glass rounded-2xl p-5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-300 inline-flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-zinc-400 mt-1">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Browse by category</h2>
            <p className="text-zinc-400 mt-1 text-sm">Hand-picked. Quality-first. No filler.</p>
          </div>
          <Link to="/browse" className="text-sm text-violet-300 hover:text-violet-200 inline-flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {DATA.categories.filter((c) => c.slug !== 'all').map((c, i) => {
            const icons = [Bolt, Brain, Play, Camera, Heart, Download, Store, Star];
            const I = icons[i % icons.length];
            return (
              <Link
                key={c.slug}
                to={`/browse?cat=${c.slug}`}
                className="group card-glass rounded-xl p-4 hover:border-violet-500/40 hover:-translate-y-0.5 transition"
              >
                <I className="w-6 h-6 text-violet-300 mb-2" />
                <div className="text-xs font-semibold text-white line-clamp-2">{c.name}</div>
                <div className="text-[11px] text-zinc-500 mt-1">{c.count} products</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-300 mb-2">
              🔥 Trending this week
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">What builders are buying</h2>
          </div>
          <Link to="/browse?sort=trending" className="text-sm text-violet-300 hover:text-violet-200 inline-flex items-center gap-1">
            See more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map((p) => <ProductCard key={p.id} product={p} priority />)}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-300 mb-2">
              <Sparkle className="w-3.5 h-3.5" /> Editor's picks
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Featured</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Creators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Meet the creators</h2>
            <p className="text-zinc-400 mt-1 text-sm">Independent makers, writers, and studios.</p>
          </div>
          <Link to="/creators" className="text-sm text-violet-300 hover:text-violet-200 inline-flex items-center gap-1">
            All creators <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATA.creators.slice(0, 6).map((c) => (
            <Link key={c.id} to={`/creator/${c.handle}`} className="card-glass rounded-2xl overflow-hidden group">
              <div className="h-28 relative overflow-hidden">
                <img src={c.banner} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              </div>
              <div className="p-5 -mt-8 relative">
                <img src={c.avatar} className="w-14 h-14 rounded-xl border-4 border-[#0a0a0f] bg-zinc-800" alt="" />
                <div className="mt-3 flex items-center gap-1.5">
                  <h3 className="font-semibold text-white">{c.name}</h3>
                  {c.verified && <span className="text-violet-400">✓</span>}
                </div>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{c.bio}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /> {c.rating}</span>
                  <span>{c.sales.toLocaleString()} sales</span>
                  <span className="ml-auto text-violet-300 group-hover:translate-x-0.5 transition inline-flex items-center gap-0.5">Visit <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-2">
              Fresh drops
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">New this week</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-300 mb-3">
            <Shield className="w-3.5 h-3.5" /> Built for trust, not fees
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">How Brixnode works</h2>
          <p className="text-zinc-400 mt-3">
            No automated payments. No processor fees. You stay in control.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { n: 1, title: 'Discover', body: 'Rich previews, interactive demos, and reviews from real buyers.' },
            { n: 2, title: 'Pay externally', body: 'PayPal, Wise, crypto, M-Pesa, MoMo — use what works for you.' },
            { n: 3, title: 'Upload proof', body: 'Send screenshot, txn ID, or receipt. Takes 20 seconds.' },
            { n: 4, title: 'Instant access', body: 'Admin reviews within 24h. Product unlocks in your library.' },
          ].map((s) => (
            <div key={s.n} className="card-glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-violet-500/10 blur-2xl" />
              <div className="font-display text-5xl font-bold text-violet-300/30">0{s.n}</div>
              <h3 className="font-semibold text-white mt-3">{s.title}</h3>
              <p className="text-sm text-zinc-400 mt-2">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/50 via-zinc-900 to-zinc-900 p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-5xl font-bold">
              Ready to build something <span className="text-gradient">extraordinary?</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              Join thousands of creators and collectors using Brixnode to find, share, and ship digital work.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/browse" className="btn-primary px-6 py-3.5 rounded-xl font-semibold">Start browsing</Link>
              <Link to="/sell" className="px-6 py-3.5 rounded-xl font-semibold border border-zinc-700 hover:border-zinc-600 hover:bg-white/5">Sell on Brixnode</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
