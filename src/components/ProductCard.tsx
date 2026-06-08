import { Link } from 'react-router-dom';
import { Product, DATA } from '../lib/data';
import { Heart, Star, Eye, Sparkle } from './Icons';
import { useApp } from '../lib/state';
import { cn } from '../utils/cn';

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { favorites, toggleFavorite } = useApp();
  const creator = DATA.creators.find((c) => c.id === product.creatorId);
  const isFav = favorites.includes(product.id);

  const typeColors: Record<string, string> = {
    template: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
    'prompt-pack': 'bg-violet-500/15 text-violet-300 border-violet-500/20',
    course: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    preset: 'bg-pink-500/15 text-pink-300 border-pink-500/20',
    printable: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    'ai-asset': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
    hybrid: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/20',
  };

  return (
    <div className="group relative rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition overflow-hidden fade-in">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
          <img
            src={product.cover}
            alt={product.title}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className={cn('px-2 py-1 rounded-md text-[10px] font-semibold border backdrop-blur-md', typeColors[product.type])}>
              {product.type.replace('-', ' ')}
            </span>
            {product.aiEnhanced && (
              <span className="px-2 py-1 rounded-md text-[10px] font-semibold border border-white/10 bg-black/60 text-white inline-flex items-center gap-1">
                <Sparkle className="w-3 h-3" /> AI
              </span>
            )}
            {product.oldPrice && (
              <span className="px-2 py-1 rounded-md text-[10px] font-semibold border bg-rose-500/90 border-rose-400 text-white">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          {product.trending && (
            <div className="absolute top-3 right-12 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
              🔥 Trending
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product.id);
        }}
        className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 hover:scale-110 transition inline-flex items-center justify-center"
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart className={cn('w-4 h-4', isFav ? 'text-rose-400' : 'text-white')} filled={isFav} />
      </button>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {creator && (
            <Link to={`/creator/${creator.handle}`} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white">
              <img src={creator.avatar} className="w-5 h-5 rounded-full bg-zinc-800" alt="" />
              <span>
                {creator.name}
                {creator.verified && <span className="ml-1 text-violet-400">✓</span>}
              </span>
            </Link>
          )}
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-[15px] leading-tight text-white group-hover:text-violet-300 transition line-clamp-2 min-h-[42px]">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500">
          {product.rating > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400" /> {product.rating}
              <span className="text-zinc-600">({product.reviews})</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {(product.views / 1000).toFixed(1)}k
          </span>
          <span className="ml-auto font-bold text-white text-sm">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
