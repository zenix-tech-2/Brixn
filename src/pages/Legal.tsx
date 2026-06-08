import { useParams, Link } from 'react-router-dom';

const PAGES: Record<string, { title: string; body: string[] }> = {
  terms: {
    title: 'Terms of Service',
    body: [
      'Last updated: February 2026.',
      'Welcome to Brixnode. By accessing or using our platform, you agree to be bound by these Terms of Service. Brixnode is a marketplace that connects buyers and sellers of digital products, templates, AI assets, and related goods.',
      'Accounts. You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.',
      'Marketplace. Sellers list digital products for sale. Buyers pay using external payment methods and upload proof of payment. Brixnode does not process payments directly and is not a party to transactions between buyers and sellers.',
      'Approvals. Orders are manually approved by administrators. We aim to review proofs within 24 hours. Brixnode reserves the right to reject orders if payment proof is fraudulent, unclear, or does not match the expected amount.',
      'Refunds. Refunds are handled case-by-case by administrators within 14 days of purchase, and only for non-delivered or materially misrepresented products.',
      'Prohibited content. You may not list content that infringes third-party intellectual property, contains malware, or violates applicable law.',
      'Limitation of liability. Brixnode is provided "as is" without warranties of any kind. Our total liability to you for any claim arising out of these terms is limited to $100.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    body: [
      'Last updated: February 2026.',
      'Brixnode respects your privacy. This policy explains what data we collect, why, and how we protect it.',
      'Data we collect. Account information (email, name, avatar), product data (listings, uploads), order data (purchases, payment proofs), and usage analytics. We do not sell your data to third parties.',
      'Storage. All data is stored on Supabase (PostgreSQL + object storage) in secure, SOC-2 compliant regions. Payment proofs are encrypted at rest.',
      'Cookies. We use essential cookies for authentication and optional analytics cookies. You can opt out at any time from your settings.',
      'AI. When you use AI features, your prompts may be sent to third-party providers (Grok, Gemini, OpenAI, Anthropic) under our API keys. We apply rate-limiting and content moderation.',
      'Your rights. You may request access, correction, deletion, or export of your data by emailing privacy@brixnode.com.',
    ],
  },
  dmca: {
    title: 'DMCA & Intellectual Property',
    body: [
      'Last updated: February 2026.',
      'Brixnode respects the intellectual property of others. If you believe a product on our platform infringes your copyright, please send a notice to dmca@brixnode.com with: (1) a description of the copyrighted work, (2) the URL of the infringing product, (3) your contact details, and (4) a statement under penalty of perjury that you are authorized to act.',
      'Upon receipt of a valid notice, we will remove the material promptly and notify the seller. Repeat infringers are permanently banned from the platform.',
      'Counter-notices: if you believe your listing was removed in error, you may submit a counter-notice to dmca@brixnode.com.',
    ],
  },
};

export default function Legal() {
  const { page } = useParams();
  const data = page ? PAGES[page] : null;

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto p-10">
        <h1 className="font-display text-3xl font-bold">Legal</h1>
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {Object.keys(PAGES).map((k) => (
            <Link key={k} to={`/legal/${k}`} className="card-glass rounded-xl p-4 hover:border-violet-500/40 capitalize">{PAGES[k].title}</Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/" className="text-sm text-zinc-500 hover:text-white">← Back to Brixnode</Link>
      <h1 className="font-display text-3xl sm:text-4xl font-bold mt-4">{data.title}</h1>
      <div className="mt-8 space-y-4 text-zinc-300 leading-relaxed">
        {data.body.map((p, i) => (
          <p key={i} className={i === 0 ? 'text-xs text-zinc-500' : ''}>{p}</p>
        ))}
      </div>
    </div>
  );
}
