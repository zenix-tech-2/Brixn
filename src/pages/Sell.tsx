import { Link } from 'react-router-dom';
import { useApp } from '../lib/state';
import {
  Sparkle, Grid, Brain, BookOpen, Palette, Video, FileText, Package as PackageIcon, Upload as UploadIcon, Check, Store
} from '../components/Icons';

const CATEGORIES = [
  { name: 'Notion Templates', desc: 'Life OS, dashboards, workflows', icon: Grid, slug: 'notion', color: 'from-blue-500 to-cyan-500' },
  { name: 'AI Prompt Packs', desc: 'Grok, GPT, Claude & Gemini libraries', icon: Brain, slug: 'prompts', color: 'from-violet-500 to-fuchsia-500' },
  { name: 'Micro-courses & eBooks', desc: 'Deep knowledge, short format', icon: BookOpen, slug: 'courses', color: 'from-emerald-500 to-teal-500' },
  { name: 'Presets & LUTs', desc: 'Film emulation, color grading', icon: Palette, slug: 'presets', color: 'from-pink-500 to-rose-500' },
  { name: 'Planners & Printables', desc: 'Journals, trackers, kits', icon: FileText, slug: 'planners', color: 'from-amber-500 to-orange-500' },
  { name: 'Graphics & Icons', desc: 'UI kits, illustrations, fonts', icon: PackageIcon, slug: 'graphics', color: 'from-cyan-500 to-sky-500' },
  { name: 'Video Assets', desc: 'Templates, motion, transitions', icon: Video, slug: 'hybrid', color: 'from-indigo-500 to-blue-500' },
  { name: 'Hybrid & More', desc: 'Proxies, accounts, mixed kits', icon: Sparkle, slug: 'hybrid', color: 'from-fuchsia-500 to-pink-500' },
];

const BENEFITS = [
  { t: 'Keep 85%', d: 'Generous revenue share. We only deduct a 15% platform fee — no hidden charges.' },
  { t: 'Manual payouts', d: 'You choose the method: PayPal, Wise, crypto, or bank. We pay on NET-15.' },
  { t: 'AI co-pilot', d: 'Auto-generate descriptions, tags, and pricing suggestions right in the uploader.' },
  { t: 'Instant storefront', d: 'Get a public page at brixnode.com/@yourhandle with a custom banner and bio.' },
  { t: 'Global reach', d: 'Accept payments via PayPal, M-Pesa, MoMo, crypto, Wise — sell anywhere.' },
  { t: 'Referral rewards', d: 'Refer other creators and earn 10% of their first-year platform fees as credit.' },
];

export default function Sell() {
  const { user, addRole } = useApp();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-x-0 top-0 h-[400px] bg-radial-violet pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs text-violet-200 mb-6">
            <Store className="w-3.5 h-3.5" />
            For creators, studios & independents
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05]">
            Sell your digital work <br /><span className="text-gradient">without paying processor fees</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400 max-w-2xl mx-auto">
            Upload once. Let us handle curation, payments, and delivery. You focus on craft, we handle the boring stuff.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                if (!user) { window.location.href = '/auth?mode=signup'; return; }
                addRole('creator');
                window.location.href = '/dashboard/store';
              }}
              className="btn-primary px-6 py-3.5 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
            >
              <UploadIcon className="w-4 h-4" /> Start selling
            </button>
            <Link to="/browse" className="px-6 py-3.5 rounded-xl font-semibold border border-zinc-800 hover:bg-white/5">
              Browse products first
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">What can you sell?</h2>
          <p className="text-zinc-400 mt-2 text-sm">Click a category to see what's already selling.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/browse?cat=${c.slug}`}
              className="group card-glass rounded-2xl p-5 hover:border-violet-500/40 hover:-translate-y-0.5 transition block"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-sm">{c.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{c.desc}</p>
              <div className="mt-3 text-xs text-violet-300 opacity-0 group-hover:opacity-100 transition">View products →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Why Brixnode?</h2>
          <p className="text-zinc-400 mt-2 text-sm">Everything a modern digital creator needs. Nothing you don't.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BENEFITS.map((b, i) => (
            <div key={b.t} className="card-glass rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-300 inline-flex items-center justify-center mb-3">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">{b.t}</h3>
              <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">{b.d}</p>
              <div className="text-[11px] text-zinc-600 mt-3 font-mono">0{i + 1}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Upload flow preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="card-glass rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-300 mb-3">
                <Sparkle className="w-3.5 h-3.5" /> AI-assisted workflow
              </div>
              <h2 className="font-display text-3xl font-bold">Upload in minutes. Not hours.</h2>
              <p className="text-zinc-400 mt-3 leading-relaxed">
                Our uploader is the fastest in the industry. Drag in your files, let the AI generate
                metadata, add a few preview assets, and you're live. No code, no dashboards, no nonsense.
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  'Drag-and-drop multi-file upload',
                  'Auto-generated tags, descriptions & SEO',
                  'Pricing suggestions based on comparable sales',
                  'Watermarked previews & Notion duplicate links',
                  'Prompt tester for AI products',
                ].map((l) => (
                  <li key={l} className="flex gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="card-glass rounded-2xl p-5 bg-zinc-900/80">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-zinc-500">Title</div>
                    <div className="text-sm font-semibold">Calm OS — Minimal Notion Life System</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-500">Description · <span className="text-violet-300">AI generated</span></div>
                    <div className="text-xs text-zinc-400 leading-relaxed">
                      A beautifully minimal Notion workspace consolidating goals, tasks, notes, finance,
                      and reading into one calm interconnected system.
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {['notion', 'productivity', 'lifeos', 'minimal', 'planner'].map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">#{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 items-center pt-2">
                    <div className="text-2xl font-display font-bold text-gradient">$29</div>
                    <span className="text-xs text-emerald-300">Suggested price: $24 – $34</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold">Ready to ship?</h2>
        <p className="text-zinc-400 mt-2">
          Apply in 2 minutes. Most creators are approved within 48 hours.
        </p>
        <button
          onClick={() => {
            if (!user) { window.location.href = '/auth?mode=signup'; return; }
            addRole('creator');
            window.location.href = '/dashboard/store';
          }}
          className="btn-primary mt-6 px-6 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2"
        >
          Apply as creator <Sparkle className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
