import { Link } from 'react-router-dom';
import { DATA } from '../lib/data';
import { Star, Store } from '../components/Icons';

export default function Creators() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Creators on Brixnode</h1>
        <p className="text-zinc-400 mt-2 text-sm max-w-xl">
          Independent studios, writers, prompt engineers, and designers — shipping digital work the world actually needs.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DATA.creators.map((c) => {
          const products = DATA.products.filter((p) => p.creatorId === c.id);
          return (
            <Link key={c.id} to={`/creator/${c.handle}`} className="card-glass rounded-2xl overflow-hidden group hover:border-violet-500/40 transition">
              <div className="h-32 relative overflow-hidden">
                <img src={c.banner} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              </div>
              <div className="p-5 -mt-10 relative">
                <img src={c.avatar} className="w-16 h-16 rounded-xl border-4 border-[#0a0a0f] bg-zinc-800" alt="" />
                <div className="mt-3 flex items-center gap-1.5">
                  <h3 className="font-semibold text-white">{c.name}</h3>
                  {c.verified && <span className="text-violet-400">✓</span>}
                </div>
                <p className="text-xs text-zinc-500">@{c.handle}</p>
                <p className="text-sm text-zinc-400 mt-3 line-clamp-2">{c.bio}</p>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="p-2 rounded-lg bg-zinc-900/70">
                    <div className="text-sm font-bold text-white">{products.length}</div>
                    <div className="text-[10px] text-zinc-500">Products</div>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-900/70">
                    <div className="text-sm font-bold text-white">{(c.sales / 1000).toFixed(1)}k</div>
                    <div className="text-[10px] text-zinc-500">Sales</div>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-900/70">
                    <div className="text-sm font-bold text-white inline-flex items-center gap-0.5">
                      {c.rating} <Star className="w-3 h-3 text-amber-400" />
                    </div>
                    <div className="text-[10px] text-zinc-500">Rating</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <div className="flex-1 py-2 text-xs rounded-lg bg-violet-500/15 text-violet-200 text-center font-semibold inline-flex items-center justify-center gap-1">
                    <Store className="w-3.5 h-3.5" /> Visit store
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
