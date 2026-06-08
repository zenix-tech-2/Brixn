import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { DATA, PAYMENT_METHODS } from '../lib/data';
import { useApp } from '../lib/state';
import { Check, Shield, Upload as UploadIcon, Camera, ArrowRight } from '../components/Icons';

export default function Checkout() {
  const { id } = useParams();
  const nav = useNavigate();
  const product: any = DATA.products.find((p) => p.id === id);
  const { user, placeOrder } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [method, setMethod] = useState(PAYMENT_METHODS[0].id);
  const [reference, setReference] = useState('');
  const [proof, setProof] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!product) return <div className="p-10 text-center">Product not found.</div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-10 text-center">
        <div className="card-glass rounded-2xl p-8">
          <div className="text-5xl mb-3">🔐</div>
          <h2 className="font-display text-2xl font-bold">Sign in to continue</h2>
          <p className="text-zinc-400 text-sm mt-2">You'll need an account to complete this purchase.</p>
          <Link to={`/auth?next=/checkout/${product!.id}`} className="btn-primary mt-6 inline-block px-5 py-2.5 rounded-xl font-semibold text-sm">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const selectedM = PAYMENT_METHODS.find((m) => m.id === method)!;

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProof(reader.result as string);
    reader.readAsDataURL(file);
  }

  function submit() {
    if (!proof || !reference) return;
    placeOrder(product, proof, reference);
    setStep(3);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold">Secure checkout</h1>
        <p className="text-zinc-400 text-sm mt-1">Manual payments, full control, no processor fees.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
        {[
          { n: 1, label: 'Review' },
          { n: 2, label: 'Pay & upload proof' },
          { n: 3, label: 'Done' },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-2 shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= s.n ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-500'
              }`}
            >
              {step > s.n ? <Check className="w-4 h-4" /> : s.n}
            </div>
            <span className={`text-sm ${step >= s.n ? 'text-white' : 'text-zinc-500'}`}>{s.label}</span>
            {i < 2 && <div className={`w-10 h-px ${step > s.n ? 'bg-violet-500' : 'bg-zinc-800'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr,340px] gap-8">
        <div>
          {step === 1 && (
            <div className="card-glass rounded-2xl p-6">
              <h2 className="font-semibold mb-4">You're buying</h2>
              <div className="flex gap-4 pb-4 border-b border-zinc-800">
                <img src={product.cover} className="w-24 h-24 rounded-xl object-cover" alt="" />
                <div className="flex-1">
                  <div className="font-semibold">{product.title}</div>
                  <div className="text-sm text-zinc-500">{product.category}</div>
                  <div className="text-xs text-zinc-400 mt-2">Sold by {DATA.creators.find((c) => c.id === product.creatorId)?.name}</div>
                </div>
              </div>

              <div className="py-4 space-y-2 text-sm">
                {[
                  ['Subtotal', `$${product.price.toFixed(2)}`],
                  ['Platform fee (15%)', `$${(product.price * 0.15).toFixed(2)}`],
                  ['Processing', 'Free (manual)'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-zinc-400">
                    <span>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setStep(2)} className="w-full btn-primary h-12 rounded-xl font-semibold inline-flex items-center justify-center gap-2">
                Continue to payment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="card-glass rounded-2xl p-6">
                <h2 className="font-semibold mb-4">1. Choose how to pay</h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`text-left p-4 rounded-xl border transition ${
                        method === m.id
                          ? 'border-violet-500/50 bg-violet-500/10'
                          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-sm">
                        <span className="text-2xl">{m.icon}</span>
                        {m.name}
                      </div>
                      <div className="text-xs text-zinc-400 mt-2 font-mono break-all">{m.detail}</div>
                      <div className="text-[11px] text-zinc-500 mt-1">{m.note}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex gap-2">
                  <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                  Send exactly <strong className="mx-1">${product.price.toFixed(2)} USD</strong> equivalent. Include your order reference (next step) in the payment note where possible.
                </div>
              </div>

              <div className="card-glass rounded-2xl p-6">
                <h2 className="font-semibold mb-4">2. Add payment reference</h2>
                <input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Transaction ID, reference #, or sender name"
                  className="w-full h-12 px-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none text-sm"
                />
              </div>

              <div className="card-glass rounded-2xl p-6">
                <h2 className="font-semibold mb-4">3. Upload payment proof</h2>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
                {proof ? (
                  <div className="relative rounded-xl overflow-hidden border border-zinc-800">
                    <img src={proof} className="w-full max-h-80 object-contain bg-zinc-950" alt="proof" />
                    <button
                      onClick={() => setProof(null)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/70 text-white flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-full h-36 rounded-xl border-2 border-dashed border-zinc-800 hover:border-violet-500/50 hover:bg-violet-500/5 transition flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-12 h-12 rounded-xl bg-violet-500/15 text-violet-300 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div className="font-semibold text-sm">Tap to upload screenshot</div>
                    <div className="text-xs text-zinc-500">PNG, JPG up to 10MB. Scanned for malware.</div>
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-5 h-12 rounded-xl font-semibold border border-zinc-800 hover:bg-white/5 text-sm">
                  Back
                </button>
                <button
                  onClick={submit}
                  disabled={!proof || !reference}
                  className="flex-1 btn-primary h-12 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  <UploadIcon className="w-4 h-4" /> Submit for approval
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card-glass rounded-2xl p-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/15 text-emerald-300 flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-display text-2xl font-bold">Proof received!</h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
                We've sent your order to the admin queue. Most approvals happen within a few hours — you'll get an email the moment it's confirmed.
              </p>
              <div className="flex gap-3 justify-center mt-6">
                <button onClick={() => nav('/library')} className="btn-primary px-5 h-11 rounded-xl font-semibold text-sm">
                  Go to my library
                </button>
                <button onClick={() => nav('/dashboard')} className="px-5 h-11 rounded-xl font-semibold border border-zinc-800 hover:bg-white/5 text-sm">
                  Track order
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="card-glass rounded-2xl p-5 h-fit">
          <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">Order summary</h3>
          <div className="flex gap-3 pb-4 border-b border-zinc-800">
            <img src={product.cover} className="w-14 h-14 rounded-lg object-cover" alt="" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm line-clamp-2">{product.title}</div>
              <div className="text-xs text-zinc-500">Qty 1</div>
            </div>
          </div>
          <div className="py-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Payment via</span>
              <span>{selectedM.name}</span>
            </div>
          </div>
          <div className="pt-3 border-t border-zinc-800 flex justify-between font-bold">
            <span>Total due</span>
            <span>${product.price.toFixed(2)}</span>
          </div>
          {step === 2 && (
            <div className="mt-4 text-[11px] text-zinc-500 p-3 rounded-lg bg-zinc-900 border border-zinc-800 leading-relaxed">
              By clicking "Submit for approval", you confirm that you've sent the payment and agree to our terms. Brixnode never stores your payment credentials.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
