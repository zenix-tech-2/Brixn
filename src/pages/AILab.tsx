import { useState } from 'react';
import { useApp } from '../lib/state';
import { Brain, Sparkle, Check } from '../components/Icons';

const PROVIDERS = [
  { id: 'grok', name: 'Grok (xAI)', tag: 'Creative & conversational', color: 'from-violet-500 to-fuchsia-500' },
  { id: 'gemini', name: 'Gemini (Google)', tag: 'Multimodal & fast', color: 'from-sky-500 to-blue-500' },
  { id: 'openai', name: 'GPT (OpenAI)', tag: 'Great generalist', color: 'from-emerald-500 to-teal-500' },
  { id: 'anthropic', name: 'Claude (Anthropic)', tag: 'Deep reasoning', color: 'from-amber-500 to-orange-500' },
];

const EXAMPLE_PROMPTS = [
  'Draft a 5-point launch checklist for a $49 digital product',
  'Write a Notion formula that calculates MRR growth week-over-week',
  'Suggest 20 YouTube titles for a video about selling digital templates',
  'Explain the difference between Grok and Gemini for prompt engineering',
];

export default function AILab() {
  const { aiProvider, setAiProvider, user } = useApp();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: "👋 Hi, I'm the Brixnode AI Lab — a shared chat connected to your provider of choice. Try one of the examples below or ask anything about the marketplace.",
    },
  ]);
  const [thinking, setThinking] = useState(false);

  async function send(text: string) {
    const final = text.trim();
    if (!final) return;
    setPrompt('');
    setMessages((m) => [...m, { role: 'user', content: final }]);
    setThinking(true);
    await new Promise((r) => setTimeout(r, 600));
    const responses: Record<string, string> = {
      grok: `🔥 Grok here. Let's cut through the noise. For "${final.slice(0, 60)}..." — here's the unfiltered take:\n\n• Start with the 80/20 version first, ship in 48 hours.\n• Cut features that don't serve your first 10 customers.\n• When in doubt, write like you talk.\n\nWant me to go deeper on any of these?`,
      gemini: `✨ Gemini responding. Looking at "${final.slice(0, 60)}..." I can see three angles to explore:\n\n1. A structured approach using tables\n2. A multimodal breakdown (diagrams + code)\n3. A step-by-step video script outline\n\nWhich format would work best for you?`,
      openai: `🤖 GPT here. Happy to help with "${final.slice(0, 60)}..."\n\nHere's a structured take:\n\n- Insight: The core opportunity is in reducing friction for first-time users.\n- Recommendation: Start with a minimal version, then iterate.\n- Follow-up: I can generate a one-page spec, an email sequence, or a landing page draft. Your call.`,
      anthropic: `📚 Claude here. Let me reason through "${final.slice(0, 60)}..." carefully.\n\nThere are a few layers here worth unpacking:\n\n1. The surface question (what you asked)\n2. The underlying goal (what you're trying to achieve)\n3. The unspoken constraints (time, budget, audience)\n\nBased on typical patterns, I'd recommend starting small, validating with 5 users, and only then building out the full vision. Shall I produce a more detailed plan?`,
    };
    const reply = responses[aiProvider];
    // typewriter
    const out: string[] = [];
    for (let i = 0; i < reply.length; i++) {
      out.push(reply[i]);
      if (i % 3 === 0) {
        const curr = out.join('');
        setMessages((m) => {
          const cp = [...m];
          const last = cp[cp.length - 1];
          if (last && last.role === 'assistant' && last.content.startsWith('…')) {
            cp[cp.length - 1] = { role: 'assistant', content: curr };
          } else {
            cp.push({ role: 'assistant', content: curr });
          }
          return cp;
        });
        await new Promise((r) => setTimeout(r, 10));
      }
    }
    setMessages((m) => {
      const cp = [...m];
      cp[cp.length - 1] = { role: 'assistant', content: reply };
      return cp;
    });
    setThinking(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs text-violet-200 mb-4">
          <Sparkle className="w-3.5 h-3.5" /> AI Lab · Multi-provider
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold">Chat with any AI — in one place</h1>
        <p className="text-zinc-400 mt-3 max-w-2xl mx-auto">
          Choose your preferred provider. Admins securely rotate API keys server-side — nothing is exposed to the browser.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            onClick={() => setAiProvider(p.id as any)}
            className={`text-left p-4 rounded-2xl border transition ${
              aiProvider === p.id
                ? 'border-violet-500/50 bg-violet-500/10'
                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-3`}>
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="font-semibold text-sm flex items-center gap-1.5">
              {p.name}
              {aiProvider === p.id && <Check className="w-4 h-4 text-violet-300" />}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">{p.tag}</div>
          </button>
        ))}
      </div>

      <div className="card-glass rounded-2xl overflow-hidden">
        <div className="h-[440px] overflow-y-auto p-5 space-y-4" id="ai-chat">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-violet-600 text-white rounded-br-sm'
                    : 'bg-zinc-800/80 text-zinc-100 rounded-bl-sm border border-zinc-700'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex gap-1.5 px-4 py-3 bg-zinc-800/80 rounded-2xl w-fit">
              <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
        </div>
        <div className="p-3 border-t border-zinc-800 bg-zinc-950/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(prompt);
            }}
            className="flex gap-2"
          >
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={user ? `Message ${PROVIDERS.find((p) => p.id === aiProvider)?.name}…` : 'Sign in to chat with AI'}
              disabled={!user}
              className="flex-1 h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none text-sm disabled:opacity-50"
            />
            <button className="btn-primary px-5 rounded-xl text-sm font-semibold disabled:opacity-50" disabled={!user}>
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Try one of these</div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              disabled={!user}
              className="text-xs text-left px-3 py-2 rounded-lg bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 disabled:opacity-50 max-w-xs"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
