import { useParams, Link } from 'react-router-dom';
import { DATA } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { Star, Link as LinkIcon } from '../components/Icons';

export default function CreatorStore() {
  const { handle } = useParams();
  const creator = DATA.creators.find((c) => c.handle === handle);
  if (!creator) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center">
        <p>Creator not found.</p>
        <Link to="/creators" className="text-violet-300 text-sm underline">Back to creators</Link>
      </div>
    );
  }
  const products = DATA.products.filter((p) => p.creatorId === creator.id);

  return (
    <div>
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={creator.banner} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/60 to-[#09090b]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-20 relative">
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end">
          <img
            src={creator.avatar}
            className="w-28 h-28 rounded-2xl border-4 border-[#09090b] bg-zinc-800"
            alt=""
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-3xl font-bold">{creator.name}</h1>
              {creator.verified && <span className="text-violet-400 text-xl">✓</span>}
            </div>
            <p className="text-zinc-500 text-sm">brixnode.sellizi.store/@{creator.handle}</p>
            <p className="text-zinc-300 mt-2 max-w-2xl">{creator.bio}</p>
            <div className="flex items-center gap-5 mt-3 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" /> {creator.rating} rating</span>
              <span>{products.length} products</span>
              <span>{creator.sales.toLocaleString()} sales</span>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button className="btn-primary px-4 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2">
              Share store
            </button>
            <button className="px-4 py-2.5 rounded-xl font-semibold text-sm border border-zinc-800 hover:border-zinc-700 bg-zinc-900 inline-flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Copy link
            </button>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
