import { Link, useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../lib/state';
import { Bell, Chart, Store, Download, User as UserIcon, Shield, Settings as SettingsIcon, LogOut, Sparkle } from '../components/Icons';
import { useEffect } from 'react';

function Shell() {
  const { user, orders, logout } = useApp();
  const nav = useNavigate();
  const loc = useLocation();
  useEffect(() => {}, [loc.pathname]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-10 text-center">
        <div className="card-glass rounded-2xl p-8">
          <div className="text-5xl mb-3">🔐</div>
          <h2 className="font-display text-2xl font-bold">Sign in required</h2>
          <p className="text-zinc-400 text-sm mt-2">You need an account to access your dashboard.</p>
          <Link to="/auth" className="btn-primary mt-6 inline-block px-5 py-2.5 rounded-xl font-semibold text-sm">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const pending = orders.filter((o) => o.status === 'pending').length;
  const approved = orders.filter((o) => o.status === 'approved').length;
  const rejected = orders.filter((o) => o.status === 'rejected').length;

  const navItem =
    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-[240px,1fr] gap-8">
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card-glass rounded-2xl p-4">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
              <img src={user.avatar} className="w-11 h-11 rounded-xl" alt="" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{user.name}</div>
                <div className="text-xs text-zinc-500 truncate">@{user.handle}</div>
              </div>
            </div>

            <nav className="mt-3 space-y-0.5">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `${navItem} ${isActive ? 'bg-violet-500/15 text-violet-200' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`
                }
              >
                <Chart className="w-4 h-4" /> Overview
              </NavLink>
              <NavLink
                to="/dashboard/purchases"
                className={({ isActive }) =>
                  `${navItem} ${isActive ? 'bg-violet-500/15 text-violet-200' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`
                }
              >
                <Download className="w-4 h-4" /> My purchases
                {pending > 0 && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                    {pending} pending
                  </span>
                )}
              </NavLink>
              <NavLink
                to="/dashboard/earnings"
                className={({ isActive }) =>
                  `${navItem} ${isActive ? 'bg-violet-500/15 text-violet-200' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`
                }
              >
                <Chart className="w-4 h-4" /> Earnings
              </NavLink>
              <NavLink
                to="/dashboard/store"
                className={({ isActive }) =>
                  `${navItem} ${isActive ? 'bg-violet-500/15 text-violet-200' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`
                }
              >
                <Store className="w-4 h-4" /> My storefront
              </NavLink>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `${navItem} ${isActive ? 'bg-violet-500/15 text-violet-200' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`
                }
              >
                <SettingsIcon className="w-4 h-4" /> Settings
              </NavLink>
            </nav>

            <div className="pt-3 mt-3 border-t border-zinc-800 space-y-0.5">
              {user.roles.includes('admin') && (
                <Link to="/admin" className={`${navItem} text-amber-300 hover:bg-amber-500/10`}>
                  <Shield className="w-4 h-4" /> Admin panel
                </Link>
              )}
              {!user.roles.includes('creator') && (
                <Link
                  to="/sell"
                  className={`${navItem} w-full text-violet-300 hover:bg-violet-500/10`}
                >
                  <Sparkle className="w-4 h-4" /> Become a creator
                </Link>
              )}
              <button
                onClick={() => { logout(); nav('/'); }}
                className={`${navItem} w-full text-zinc-400 hover:text-white hover:bg-white/5`}
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        </aside>

        <div>
          <Outlet />
          {/* default content */}
          {loc.pathname === '/dashboard' && (
            <Overview approved={approved} pending={pending} rejected={rejected} />
          )}
        </div>
      </div>
    </div>
  );
}

function Overview({ approved, pending, rejected }: { approved: number; pending: number; rejected: number }) {
  const { orders, user, addRole } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">
          Welcome back, {user?.name.split(' ')[0]} 👋
        </h1>
        <p className="text-zinc-400 text-sm mt-1">Here's a snapshot of your Brixnode activity.</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        {[
          { label: 'Approved', value: approved, color: 'from-emerald-500 to-teal-500' },
          { label: 'Pending review', value: pending, color: 'from-amber-500 to-orange-500' },
          { label: 'Rejected', value: rejected, color: 'from-rose-500 to-pink-500' },
          { label: 'Total orders', value: orders.length, color: 'from-violet-500 to-fuchsia-500' },
        ].map((s) => (
          <div key={s.label} className="card-glass rounded-2xl p-4 relative overflow-hidden">
            <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-xl`} />
            <div className="text-xs text-zinc-400">{s.label}</div>
            <div className="font-display text-3xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card-glass rounded-2xl p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-violet-300" /> Recent activity
        </h3>
        {orders.length === 0 ? (
          <div className="text-sm text-zinc-500 text-center py-10">
            <div className="text-4xl mb-2">🛍️</div>
            No orders yet. <Link to="/browse" className="text-violet-300 underline">Browse products</Link> to get started.
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800/50">
            {orders.slice(0, 6).map((o) => (
              <li key={o.id} className="py-3 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    o.status === 'approved'
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : o.status === 'pending'
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'bg-rose-500/15 text-rose-300'
                  }`}
                >
                  {o.status === 'approved' ? '✓' : o.status === 'pending' ? '⏳' : '✕'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{o.productTitle}</div>
                  <div className="text-xs text-zinc-500">Order #{o.id.slice(-6)} · ${o.price}</div>
                </div>
                <span
                  className={`text-[11px] px-2 py-1 rounded-md font-semibold ${
                    o.status === 'approved'
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : o.status === 'pending'
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'bg-rose-500/15 text-rose-300'
                  }`}
                >
                  {o.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-300 flex items-center justify-center">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Your referral link</h3>
              <p className="text-xs text-zinc-500">Earn 10% credit for every creator you refer.</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <input
              readOnly
              value={`https://brixnode.com/?ref=${user?.handle}`}
              className="flex-1 h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono"
              onFocus={(e) => e.currentTarget.select()}
            />
            <button
              onClick={() => navigator.clipboard?.writeText(`https://brixnode.com/?ref=${user?.handle}`)}
              className="px-4 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="card-glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Preview admin panel</h3>
              <p className="text-xs text-zinc-500">See the approval workflow you're building.</p>
            </div>
          </div>
          <button
            onClick={() => { addRole('admin'); window.location.href = '/admin'; }}
            className="w-full h-10 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-200 hover:bg-amber-500/25 border border-amber-500/30"
          >
            View admin dashboard (demo)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return <Shell />;
}

// Sub pages
export function Purchases() {
  const { orders } = useApp();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">My purchases</h1>
      <div className="space-y-3">
        {orders.length === 0 && (
          <div className="card-glass rounded-2xl p-10 text-center text-sm text-zinc-500">No purchases yet.</div>
        )}
        {orders.map((o) => (
          <div key={o.id} className="card-glass rounded-xl p-4 flex items-center gap-4">
            <div
              className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold ${
                o.status === 'approved' ? 'bg-emerald-500/15 text-emerald-300' : o.status === 'pending' ? 'bg-amber-500/15 text-amber-300' : 'bg-rose-500/15 text-rose-300'
              }`}
            >
              {o.status === 'approved' ? '✓' : o.status === 'pending' ? '⏳' : '✕'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{o.productTitle}</div>
              <div className="text-xs text-zinc-500">
                {new Date(o.createdAt).toLocaleString()} · Order #{o.id.slice(-6)}
              </div>
              {o.status === 'rejected' && o.note && (
                <div className="text-xs text-rose-300 mt-1">Reason: {o.note}</div>
              )}
            </div>
            <div className="text-right">
              <div className="font-bold">${o.price}</div>
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">{o.status}</div>
            </div>
            {o.status === 'approved' && (
              <Link to="/library" className="px-3 py-2 rounded-lg text-xs font-semibold btn-primary">
                Access
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Earnings() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Earnings (creator)</h1>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {[
          { l: 'Pending approval', v: '$240.00' },
          { l: 'Available for payout', v: '$1,280.00' },
          { l: 'Total lifetime', v: '$4,620.00' },
        ].map((s) => (
          <div key={s.l} className="card-glass rounded-2xl p-5">
            <div className="text-xs text-zinc-400">{s.l}</div>
            <div className="font-display text-2xl font-bold mt-1">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="card-glass rounded-2xl p-5">
        <h3 className="font-semibold mb-4">Recent sales</h3>
        <table className="w-full text-sm">
          <thead className="text-xs text-zinc-500">
            <tr><th className="text-left pb-2">Product</th><th className="text-left pb-2">Buyer</th><th className="text-right pb-2">You earn</th></tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {[
              { p: 'Calm OS Notion Template', b: 'alex@', e: 24.65 },
              { p: 'Grok Master Pack', b: 'tami@', e: 33.15 },
              { p: 'Cinematic LUTs Vol. 3', b: 'sara@', e: 20.4 },
            ].map((r) => (
              <tr key={r.b}>
                <td className="py-3">{r.p}</td>
                <td className="py-3 text-zinc-400">{r.b}</td>
                <td className="py-3 text-right font-semibold">${r.e.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Storefront() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">My storefront</h1>
      <div className="card-glass rounded-2xl p-6 space-y-5">
        <div>
          <label className="text-xs text-zinc-400">Display name</label>
          <input defaultValue="Your Studio" className="mt-1 w-full h-11 px-3 rounded-lg bg-zinc-900 border border-zinc-800" />
        </div>
        <div>
          <label className="text-xs text-zinc-400">Bio</label>
          <textarea rows={3} defaultValue="Independent maker of calm, useful digital tools." className="mt-1 w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800" />
        </div>
        <div>
          <label className="text-xs text-zinc-400">Payout method</label>
          <select className="mt-1 w-full h-11 px-3 rounded-lg bg-zinc-900 border border-zinc-800">
            <option>PayPal</option><option>Wise</option><option>Bitcoin</option><option>Bank transfer</option>
          </select>
        </div>
        <button className="btn-primary px-5 py-2.5 rounded-xl font-semibold text-sm">Save changes</button>
      </div>
    </div>
  );
}

export function Settings() {
  const { user } = useApp();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Settings</h1>
      <div className="card-glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <img src={user?.avatar} className="w-16 h-16 rounded-xl" alt="" />
          <div>
            <div className="font-semibold">{user?.name}</div>
            <div className="text-sm text-zinc-500">{user?.email}</div>
          </div>
        </div>
        <div className="text-xs text-zinc-500 pt-4 border-t border-zinc-800">
          Account management (email, password, notifications) is coming soon via Supabase Auth UI.
        </div>
      </div>
    </div>
  );
}
