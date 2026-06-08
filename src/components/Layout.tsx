import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../lib/state';
import {
  Logo,
  Search,
  Grid,
  Brain,
  Heart,
  Bell,
  Menu,
  X,
  Sparkle,
  Store,
  Shield,
} from './Icons';
import { useEffect, useState } from 'react';

function Nav() {
  const { user, orders, favorites } = useApp();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? 'text-white bg-white/5' : 'text-zinc-400 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/85 backdrop-blur-xl border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0 group" aria-label="Brixnode home">
          <Logo className="h-8 w-8 group-hover:scale-105 transition" />
          <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
            brix<span className="text-gradient">node</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-2">
          <NavLink to="/browse" className={navCls}>
            <span className="inline-flex items-center gap-1.5">
              <Grid className="w-4 h-4" /> Browse
            </span>
          </NavLink>
          <NavLink to="/creators" className={navCls}>
            <span className="inline-flex items-center gap-1.5">
              <Store className="w-4 h-4" /> Creators
            </span>
          </NavLink>
          <NavLink to="/ai" className={navCls}>
            <span className="inline-flex items-center gap-1.5">
              <Brain className="w-4 h-4" /> AI Lab
            </span>
          </NavLink>
          <a
            href="#how"
            className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition inline-flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4" /> How it works
          </a>
        </nav>

        <div className="flex-1" />

        <Link
          to="/browse"
          className="hidden sm:flex w-64 lg:w-80 h-10 px-4 items-center gap-2 rounded-xl bg-zinc-900/70 border border-zinc-800 text-sm text-zinc-500 hover:border-zinc-700 transition"
          aria-label="Search products"
        >
          <Search className="w-4 h-4" />
          <span>Search templates, prompts, presets…</span>
          <kbd className="ml-auto text-[10px] text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </Link>

        {user ? (
          <div className="flex items-center gap-1">
            <Link
              to="/library"
              className="relative h-10 w-10 rounded-xl hover:bg-white/5 inline-flex items-center justify-center text-zinc-400 hover:text-white"
              aria-label="My library"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-violet-500" />
              )}
            </Link>
            <Link
              to="/dashboard"
              className="relative h-10 w-10 rounded-xl hover:bg-white/5 inline-flex items-center justify-center text-zinc-400 hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {pendingCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 text-[10px] px-1 rounded-full bg-violet-600 text-white flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </Link>
            <Link
              to="/dashboard"
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 h-10 rounded-xl hover:bg-white/5 transition"
            >
              <img src={user.avatar} alt="" className="w-7 h-7 rounded-lg" />
              <span className="text-sm font-medium hidden lg:block">{user.name}</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg"
            >
              Sign in
            </Link>
            <Link
              to="/auth?mode=signup"
              className="btn-primary inline-flex px-4 py-2 rounded-xl text-sm font-semibold items-center gap-1.5"
            >
              <Sparkle className="w-4 h-4" /> Get started
            </Link>
          </div>
        )}

        <button
          className="md:hidden h-10 w-10 rounded-xl hover:bg-white/5 text-zinc-300 inline-flex items-center justify-center"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-900 bg-[#0a0a0f]">
          <div className="max-w-7xl mx-auto p-3 space-y-1">
            <Link to="/browse" className="block px-3 py-2 rounded-lg hover:bg-white/5">
              Browse
            </Link>
            <Link to="/creators" className="block px-3 py-2 rounded-lg hover:bg-white/5">
              Creators
            </Link>
            <Link to="/ai" className="block px-3 py-2 rounded-lg hover:bg-white/5">
              AI Lab
            </Link>
            <Link to="/library" className="block px-3 py-2 rounded-lg hover:bg-white/5">
              My Library
            </Link>
            <Link to="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-white/5">
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Logo className="h-8 w-8" />
            <span className="font-display font-bold text-lg">
              brix<span className="text-gradient">node</span>
            </span>
          </div>
          <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
            The elevated hub for digital tools, AI assets, templates, knowledge and creation. Owned
            by creators, curated for builders.
          </p>
          <p className="text-xs text-zinc-600 mt-6">
            © 2026 Brixnode, Ltd. Crafted with care for a worldwide creator community.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Marketplace</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link className="hover:text-white" to="/browse">Browse all</Link></li>
            <li><Link className="hover:text-white" to="/browse?cat=prompts">AI Prompts</Link></li>
            <li><Link className="hover:text-white" to="/browse?cat=notion">Notion Templates</Link></li>
            <li><Link className="hover:text-white" to="/browse?cat=courses">Courses & eBooks</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link className="hover:text-white" to="/creators">Creators</Link></li>
            <li><Link className="hover:text-white" to="/sell">Sell on Brixnode</Link></li>
            <li><Link className="hover:text-white" to="/legal/terms">Terms</Link></li>
            <li><Link className="hover:text-white" to="/legal/privacy">Privacy</Link></li>
            <li><Link className="hover:text-white" to="/legal/dmca">DMCA</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function InstallPrompt() {
  const [dismissed, setDismissed] = useState(false);
  const [ev, setEv] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setEv(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!ev || dismissed) return null;
  return (
    <div className="fixed bottom-4 inset-x-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50 card-glass rounded-2xl p-4 shadow-2xl shadow-violet-950/30">
      <div className="flex items-start gap-3">
        <Logo className="w-10 h-10 shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-sm">Install Brixnode</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            Add to home screen for a full app experience. Works offline.
          </p>
        </div>
        <button onClick={() => setDismissed(true)} className="text-zinc-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          className="btn-primary flex-1 py-2 rounded-lg text-xs font-semibold"
          onClick={() => {
            ev.prompt();
            setDismissed(true);
          }}
        >
          Install
        </button>
        <button
          className="flex-1 py-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10"
          onClick={() => setDismissed(true)}
        >
          Later
        </button>
      </div>
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  // Phone back-button friendly: expose a helper to navigate back using history.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-full flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <InstallPrompt />
    </div>
  );
}
