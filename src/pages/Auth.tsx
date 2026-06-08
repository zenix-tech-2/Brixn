import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../lib/state';
import { Logo, Sparkle, Shield } from '../components/Icons';

export default function Auth() {
  const [sp] = useSearchParams();
  const mode = sp.get('mode') === 'signup' ? 'signup' : 'signin';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const nav = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    login(email || 'demo@brixnode.com', name);
    nav('/dashboard');
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/20 blur-[120px] pointer-events-none" />

      <div className="relative flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <Logo className="w-8 h-8" />
            <span className="font-display font-bold text-lg">brix<span className="text-gradient">node</span></span>
          </Link>

          <h1 className="font-display text-3xl font-bold mb-2">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-zinc-400 text-sm mb-8">
            {mode === 'signup'
              ? 'Join thousands of creators and collectors building the future of digital goods.'
              : 'Sign in to access your library, orders, and creator tools.'}
          </p>

          <form onSubmit={submit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="text-xs text-zinc-400">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full h-12 px-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none"
                  placeholder="Jane Doe"
                />
              </div>
            )}
            <div>
              <label className="text-xs text-zinc-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full h-12 px-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none"
                placeholder="you@domain.com"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full h-12 px-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button className="w-full btn-primary h-12 rounded-xl font-semibold mt-2 inline-flex items-center justify-center gap-2">
              <Sparkle className="w-4 h-4" />
              {mode === 'signup' ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-500">or continue with</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {['Google', 'GitHub', 'Apple'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => { login(`${p.toLowerCase()}@brixnode.com`, p); nav('/dashboard'); }}
                className="h-11 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-sm font-medium"
              >
                {p}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-zinc-500 mt-6">
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <Link to="/auth" className="text-violet-300 hover:underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                New to Brixnode?{' '}
                <Link to="/auth?mode=signup" className="text-violet-300 hover:underline">
                  Create an account
                </Link>
              </>
            )}
          </p>

          <div className="flex items-start gap-2 mt-8 text-xs text-zinc-500 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <Shield className="w-4 h-4 text-violet-300 shrink-0 mt-0.5" />
            <span>
              Protected by Supabase Auth. We never sell your data. See our{' '}
              <Link to="/legal/privacy" className="text-violet-300 underline">Privacy Policy</Link>.
            </span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-[45%] items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-zinc-900 to-zinc-950" />
        <div className="relative max-w-md text-center">
          <div className="text-6xl mb-6">✨</div>
          <blockquote className="text-xl leading-relaxed font-display text-zinc-200">
            "Brixnode is the first marketplace that feels like it was built by people who actually ship digital products. The manual approval flow is a feature, not a bug."
          </blockquote>
          <div className="mt-6 flex items-center gap-3 justify-center">
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=c0aede"
              className="w-10 h-10 rounded-full bg-zinc-800"
              alt=""
            />
            <div className="text-left">
              <div className="font-semibold text-sm">Priya Shah</div>
              <div className="text-xs text-zinc-500">Creator, @calmos · 2,000+ sales</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
