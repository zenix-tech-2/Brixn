import { Link } from 'react-router-dom';
import { useApp } from '../lib/state';
import { DATA } from '../lib/data';
import { Download, Search, Sparkle, Brain, Heart } from '../components/Icons';
import { useState } from 'react';

export default function Library() {
  const { user, library, orders } = useApp();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<'all' | 'favorites' | 'pending'>('all');

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-10 text-center">
        <div className="card-glass rounded-2xl p-8">
          <div className="text-5xl mb-3">🔐</div>
          <h2 className="font-display text-2xl font-bold">Sign in to access your library</h2>
          <Link to="/auth" className="btn-primary mt-6 inline-block px-5 py-2.5 rounded-xl font-semibold text-sm">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const owned = DATA.products.filter((p) => library.includes(p.id));
  const pending = orders.filter((o) => o.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-300 mb-2">
            <Download className="w-3.5 h-3.5" /> Your collection
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">My brixnode</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Every product you own — instantly accessible across devices.
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your library…"
            className="w-full h-11 pl-10 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2 border-b border-zinc-900 mb-6">
        {[
          { k: 'all', label: `All (${owned.length})` },
          { k: 'pending', label: `Pending (${pending.length})` },
          { k: 'favorites', label: 'Favorites' },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as any)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
              tab === t.k ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'pending' && (
        <div className="space-y-3">
          {pending.length === 0 && (
            <div className="card-glass rounded-2xl p-10 text-center text-sm text-zinc-500">
              No pending approvals. You're all caught up ✨
            </div>
          )}
          {pending.map((o) => (
            <div key={o.id} className="card-glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-amber-500/15 text-amber-300 flex items-center justify-center">⏳</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{o.productTitle}</div>
                <div className="text-xs text-zinc-500">Awaiting admin approval — typically within 24h</div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-amber-500/15 text-amber-300">Pending</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'all' && (
        <>
          {owned.length === 0 ? (
            <div className="card-glass rounded-2xl p-14 text-center">
              <div className="text-5xl mb-3">📚</div>
              <h3 className="font-display text-xl font-bold">Your library is empty</h3>
              <p className="text-zinc-400 text-sm mt-2">Once your first order is approved, products show up here.</p>
              <Link to="/browse" className="btn-primary mt-6 inline-flex px-5 py-2.5 rounded-xl font-semibold text-sm">
                Browse the marketplace
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {owned
                .filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase()))
                .map((p) => (
                  <div key={p.id} className="card-glass rounded-2xl overflow-hidden group">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-md bg-emerald-500/90 text-white uppercase tracking-wider">Owned</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm">{p.title}</h3>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-2 rounded-lg text-xs font-semibold btn-primary inline-flex items-center justify-center gap-1.5">
                          <Download className="w-3.5 h-3.5" /> Download
                        </button>
                        {p.aiEnhanced && (
                          <button className="py-2 px-3 rounded-lg text-xs font-semibold bg-violet-500/15 text-violet-300 inline-flex items-center gap-1.5">
                            <Brain className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button className="py-2 px-3 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 inline-flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}

      {tab === 'favorites' && (
        <div className="card-glass rounded-2xl p-10 text-center text-sm text-zinc-500">
          <Sparkle className="w-6 h-6 mx-auto text-violet-300 mb-2" />
          Bookmark your favorite products — they'll appear here for quick access.
        </div>
      )}
    </div>
  );
}
