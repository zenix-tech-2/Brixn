import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../lib/state';
import { DATA, PAYMENT_METHODS } from '../lib/data';
import { Check, X, Eye, Shield, CreditCard, Key, Users, Package, Chart, DollarSign } from '../components/Icons';

export default function AdminPanel() {
  const { user, orders, approveOrder, rejectOrder, addRole } = useApp();
  const [tab, setTab] = useState<'queue' | 'payouts' | 'products' | 'payment' | 'users' | 'ai' | 'analytics'>('queue');
  const [viewingProof, setViewingProof] = useState<string | null>(null);

  // Grant admin role for demo
  if (user && !user.roles.includes('admin')) {
    addRole('admin');
  }

  const pending = orders.filter((o) => o.status === 'pending');
  const approved = orders.filter((o) => o.status === 'approved');
  const revenue = approved.reduce((s, o) => s + o.price, 0);
  const commission = revenue * 0.2;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-5 h-5 text-amber-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Admin console</span>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Brixnode Operations</h1>
      <p className="text-zinc-400 text-sm mb-8">Approvals, payouts, AI keys, payments — all in one place.</p>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-4 gap-3 mb-8">
        {[
          { l: 'Pending reviews', v: pending.length, icon: Eye, c: 'from-amber-500 to-orange-500' },
          { l: 'Approved orders', v: approved.length, icon: Check, c: 'from-emerald-500 to-teal-500' },
          { l: 'Revenue (lifetime)', v: `$${revenue.toFixed(0)}`, icon: DollarSign, c: 'from-violet-500 to-fuchsia-500' },
          { l: 'Platform cut (20%)', v: `$${commission.toFixed(0)}`, icon: Chart, c: 'from-sky-500 to-blue-500' },
        ].map((s) => (
          <div key={s.l} className="card-glass rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.c} flex items-center justify-center text-white`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">{s.l}</div>
              <div className="font-display text-2xl font-bold">{s.v}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-zinc-900 mb-6">
        {[
          { k: 'queue', label: 'Approval queue', icon: Eye, badge: pending.length },
          { k: 'payouts', label: 'Creator payouts', icon: DollarSign },
          { k: 'products', label: 'Product moderation', icon: Package },
          { k: 'payment', label: 'Payment methods', icon: CreditCard },
          { k: 'users', label: 'Users', icon: Users },
          { k: 'ai', label: 'AI API keys', icon: Key },
          { k: 'analytics', label: 'Analytics', icon: Chart },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 inline-flex items-center gap-2 whitespace-nowrap ${
              tab === t.k ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
            {t.badge ? <span className="ml-1 text-[10px] px-1.5 rounded-full bg-amber-500/20 text-amber-300">{t.badge}</span> : null}
          </button>
        ))}
      </div>

      {tab === 'queue' && (
        <div className="space-y-3">
          {pending.length === 0 && (
            <div className="card-glass rounded-2xl p-12 text-center text-zinc-500">
              <div className="text-5xl mb-3">✨</div>
              Nothing waiting. You're all caught up.
            </div>
          )}
          {pending.map((o) => (
            <div key={o.id} className="card-glass rounded-2xl p-5 grid md:grid-cols-[1fr,auto] gap-4">
              <div className="flex gap-4">
                {o.proofUrl && (
                  <button onClick={() => setViewingProof(o.proofUrl!)} className="shrink-0">
                    <img src={o.proofUrl} alt="proof" className="w-24 h-24 rounded-xl object-cover border border-zinc-800" />
                  </button>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold">Awaiting review</span>
                    <span className="text-xs text-zinc-500">#{o.id.slice(-6)}</span>
                  </div>
                  <div className="font-semibold">{o.productTitle}</div>
                  <div className="text-sm text-zinc-400 mt-0.5">${o.price} · Ref: <span className="font-mono text-xs">{o.reference || '(none)'}</span></div>
                  <div className="text-xs text-zinc-500 mt-1">Submitted {new Date(o.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex md:flex-col gap-2">
                <button
                  onClick={() => approveOrder(o.id)}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold inline-flex items-center gap-1.5 justify-center"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => rejectOrder(o.id, 'Payment proof unclear')}
                  className="px-4 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-sm font-semibold inline-flex items-center gap-1.5 justify-center"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          ))}

          {viewingProof && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setViewingProof(null)}>
              <img src={viewingProof} className="max-h-[90vh] max-w-[90vw] rounded-xl" alt="proof" />
              <button onClick={() => setViewingProof(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'payouts' && (
        <div className="card-glass rounded-2xl">
          <table className="w-full text-sm">
            <thead className="text-xs text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="text-left p-4">Creator</th>
                <th className="text-left p-4">Pending</th>
                <th className="text-left p-4">Method</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {DATA.creators.slice(0, 4).map((c, i) => (
                <tr key={c.id} className="border-b border-zinc-900 last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} className="w-8 h-8 rounded-lg" alt="" />
                      <div>
                        <div className="font-semibold text-sm">{c.name}</div>
                        <div className="text-xs text-zinc-500">@{c.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold">${(120 + i * 340).toFixed(2)}</td>
                  <td className="p-4 text-zinc-400">{['PayPal', 'Wise', 'Bitcoin', 'Bank'][i]}</td>
                  <td className="p-4 text-right">
                    <button className="btn-primary px-3 py-1.5 rounded-lg text-xs font-semibold">Mark paid</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'products' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DATA.products.slice(0, 6).map((p) => (
            <div key={p.id} className="card-glass rounded-2xl p-3 flex gap-3">
              <img src={p.cover} className="w-20 h-20 rounded-xl object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{p.title}</div>
                <div className="text-xs text-zinc-500 truncate">{DATA.creators.find((c) => c.id === p.creatorId)?.name}</div>
                <div className="flex gap-1 mt-2">
                  <button className="px-2 py-1 rounded-md text-[11px] bg-emerald-500/15 text-emerald-300">Approve</button>
                  <button className="px-2 py-1 rounded-md text-[11px] bg-rose-500/15 text-rose-300">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'payment' && (
        <div className="card-glass rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold">Payment methods displayed at checkout</h3>
          <p className="text-sm text-zinc-400">Add or edit the payment accounts buyers see. Details are shown globally on every checkout page.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((m) => (
              <div key={m.id} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{m.name}</div>
                    <div className="text-xs font-mono text-zinc-400 break-all mt-0.5">{m.detail}</div>
                  </div>
                  <button className="text-xs text-violet-300 hover:text-violet-200">Edit</button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">+ Add payment method</button>
        </div>
      )}

      {tab === 'users' && (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-xs text-zinc-500 border-b border-zinc-800">
              <tr><th className="text-left p-4">User</th><th className="text-left p-4">Role</th><th className="text-left p-4">Orders</th><th className="text-right p-4">Actions</th></tr>
            </thead>
            <tbody>
              {DATA.creators.map((c) => (
                <tr key={c.id} className="border-b border-zinc-900">
                  <td className="p-4"><div className="flex items-center gap-2"><img src={c.avatar} className="w-7 h-7 rounded-lg" alt="" /><span className="text-sm">{c.name}</span></div></td>
                  <td className="p-4"><span className="text-xs px-2 py-1 rounded bg-violet-500/15 text-violet-300">Creator</span></td>
                  <td className="p-4 text-zinc-400">{c.sales}</td>
                  <td className="p-4 text-right space-x-1">
                    <button className="text-xs px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700">View</button>
                    <button className="text-xs px-2 py-1 rounded bg-rose-500/15 text-rose-300">Ban</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'ai' && (
        <div className="space-y-3">
          {[
            { p: 'Grok (xAI)', status: 'Active', key: 'xai-a93f…2bx' },
            { p: 'Gemini (Google)', status: 'Active', key: 'AIzaSyD9…mKw' },
            { p: 'GPT (OpenAI)', status: 'Active', key: 'sk-proj-8v…Rq2' },
            { p: 'Claude (Anthropic)', status: 'Rotated 7d ago', key: 'sk-ant-…vQ3' },
          ].map((k) => (
            <div key={k.p} className="card-glass rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-300 flex items-center justify-center"><Key className="w-5 h-5" /></div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{k.p}</div>
                <div className="text-xs text-zinc-500 font-mono">{k.key} · {k.status}</div>
              </div>
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10">Rotate</button>
            </div>
          ))}
          <div className="card-glass rounded-2xl p-5">
            <h4 className="font-semibold text-sm mb-2">Usage this month</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div><div className="text-2xl font-display font-bold">1.2M</div><div className="text-xs text-zinc-500">tokens</div></div>
              <div><div className="text-2xl font-display font-bold">$42.18</div><div className="text-xs text-zinc-500">cost</div></div>
              <div><div className="text-2xl font-display font-bold">2,840</div><div className="text-xs text-zinc-500">requests</div></div>
            </div>
          </div>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card-glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Sales (last 30 days)</h3>
            <div className="h-48 flex items-end gap-1">
              {[40, 55, 42, 78, 62, 85, 72, 90, 68, 95, 110, 98, 120, 135, 128, 142, 155, 140, 160, 175, 168, 180, 195, 188, 210, 205, 225, 240, 232, 248].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-violet-600 to-fuchsia-500" style={{ height: `${h / 2.6}%` }} />
              ))}
            </div>
          </div>
          <div className="card-glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Top products</h3>
            <ul className="space-y-2">
              {DATA.products.slice(0, 5).map((p, i) => (
                <li key={p.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-500 w-4">{i + 1}</span>
                  <img src={p.cover} className="w-10 h-10 rounded-lg object-cover" alt="" />
                  <span className="text-sm flex-1 truncate">{p.title}</span>
                  <span className="text-xs font-semibold">{p.sales} sales</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link to="/" className="text-sm text-zinc-500 hover:text-white">← Back to site</Link>
      </div>
    </div>
  );
}
