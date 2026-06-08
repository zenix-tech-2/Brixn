import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <div className="text-[120px] font-display font-bold text-gradient leading-none">404</div>
      <h1 className="font-display text-2xl font-bold mt-4">Page not found</h1>
      <p className="text-zinc-400 mt-2">The page you're looking for doesn't exist or has moved.</p>
      <div className="flex gap-3 justify-center mt-6">
        <Link to="/" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">Go home</Link>
        <Link to="/browse" className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-zinc-800 hover:bg-white/5">Browse products</Link>
      </div>
    </div>
  );
}
