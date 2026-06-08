import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DATA } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { Filter, Search as SearchIcon, X, Sparkle } from '../components/Icons';

export default function Browse() {
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState(sp.get('q') || '');
  const [cat, setCat] = useState(sp.get('cat') || 'all');
  const [sort, setSort] = useState(sp.get('sort') || 'popular');
  const [priceMax, setPriceMax] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);
  const [aiOnly, setAiOnly] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams();
    if (q) next.set('q', q);
    if (cat !== 'all') next.set('cat', cat);
    if (sort !== 'popular') next.set('sort', sort);
    setSp(next, { replace: true });
  }, [q, cat, sort, setSp]);

  const filtered = useMemo(() => {
    let list = DATA.products.filter((p) => {
      if (cat !== 'all') {
        const slugs: Record<string, string> = {
          notion: 'Notion Templates',
          prompts: 'AI Prompt Packs',
          courses: 'Micro-courses & eBooks',
          presets: 'Presets & LUTs',
          planners: 'Planners & Printables',
          graphics: 'Graphics & Icons',
          hybrid: 'Hybrid Digital Assets',
          sheets: 'Spreadsheets',
        };
        if (slugs[cat] && p.category !== slugs[cat]) return false;
      }
      if (q) {
        const h = q.toLowerCase();
        if (
          !p.title.toLowerCase().includes(h) &&
          !p.description.toLowerCase().includes(h) &&
          !p.tags.some((t) => t.includes(h))
        )
          return false;
      }
      if (p.price > priceMax) return false;
      if (p.rating < minRating) return false;
      if (aiOnly && !p.aiEnhanced) return false;
      return true;
    });
    if (sort === 'new') list = [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'popular' || sort === 'trending')
      list = [...list].sort((a, b) => b.sales - a.sales);
    return list;
  }, [q, cat, sort, priceMax, minRating, aiOnly]);

  const FilterPanel = (
    <div className="space-y-6">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Category</h4>
        <div className="space-y-1">
          {DATA.categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg flex items-center justify-between transition ${
                cat === c.slug
                  ? 'bg-violet-500/15 text-violet-200'
                  : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              <span>{c.name}</span>
              <span className="text-xs text-zinc-500">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Price</h4>
        <input
          type="range"
          min={0}
          max={100}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-violet-500"
        />
        <div className="flex justify-between text-xs text-zinc-500 mt-1">
          <span>$0</span>
          <span className="text-violet-300 font-semibold">Up to ${priceMax}</span>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Rating</h4>
        <div className="flex gap-1">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex-1 px-2 py-2 text-xs rounded-lg border transition ${
                minRating === r
                  ? 'bg-violet-500/15 border-violet-500/40 text-violet-200'
                  : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              {r === 0 ? 'Any' : `${r}+★`}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer select-none">
        <span
          className={`w-10 h-6 rounded-full relative transition ${
            aiOnly ? 'bg-violet-600' : 'bg-zinc-800'
          }`}
          onClick={() => setAiOnly((v) => !v)}
        >
          <span
            className={`absolute top-0.5 ${
              aiOnly ? 'left-[18px]' : 'left-0.5'
            } w-5 h-5 rounded-full bg-white transition`}
          />
        </span>
        <span className="text-sm inline-flex items-center gap-1.5">
          <Sparkle className="w-4 h-4 text-violet-300" /> AI-enhanced only
        </span>
      </label>

      <button
        onClick={() => {
          setCat('all');
          setQ('');
          setPriceMax(100);
          setMinRating(0);
          setAiOnly(false);
          setSort('popular');
        }}
        className="w-full text-xs text-zinc-400 hover:text-white py-2 border border-zinc-800 rounded-lg"
      >
        Reset filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Browse the marketplace</h1>
        <p className="text-zinc-400 mt-1 text-sm">
          {filtered.length} product{filtered.length === 1 ? '' : 's'} ready to discover.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search prompts, templates, tools…"
            className="w-full h-12 pl-10 pr-10 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none text-sm"
          />
          {q && (
            <button
              onClick={() => setQ('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-12 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm hidden sm:block"
        >
          <option value="popular">Most popular</option>
          <option value="new">Newest</option>
          <option value="rating">Top rated</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
        </select>
        <button
          onClick={() => setMobileFilters(true)}
          className="lg:hidden h-12 px-4 rounded-xl border border-zinc-800 inline-flex items-center gap-2 text-sm"
        >
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid lg:grid-cols-[260px,1fr] gap-8">
        <aside className="hidden lg:block sticky top-24 self-start card-glass rounded-2xl p-5">
          {FilterPanel}
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="card-glass rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold text-lg">No products match your filters</h3>
              <p className="text-zinc-400 text-sm mt-1">Try broadening your search or resetting filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileFilters(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#0a0a0f] border-l border-zinc-900 p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setMobileFilters(false)} className="text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}
    </div>
  );
}
