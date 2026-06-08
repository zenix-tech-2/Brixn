import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { DATA, PAYMENT_METHODS, Product } from './data';

export type Role = 'buyer' | 'creator' | 'admin';
export type OrderStatus = 'pending' | 'approved' | 'rejected';

export interface Order {
  id: string;
  productId: string;
  productTitle: string;
  price: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  proofUrl?: string;
  reference?: string;
  note?: string;
  creatorId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  handle: string;
  avatar: string;
  roles: Role[];
  bio?: string;
  referralCode: string;
  payoutDetails?: { method: string; account: string };
}

interface AppState {
  user: User | null;
  orders: Order[];
  library: string[]; // product ids owned
  favorites: string[];
  cart: string[];
  aiProvider: 'grok' | 'gemini' | 'openai' | 'anthropic';
  dark: boolean;

  login: (email: string, name?: string) => void;
  logout: () => void;
  addRole: (role: Role) => void;
  setAiProvider: (p: AppState['aiProvider']) => void;

  placeOrder: (product: Product, proof: string, reference: string) => Order;
  approveOrder: (id: string) => void;
  rejectOrder: (id: string, note: string) => void;

  toggleFavorite: (id: string) => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

const Ctx = createContext<AppState | null>(null);

const STORAGE_KEY = 'brixnode_v1';

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFav] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [aiProvider, setAiProvider] = useState<AppState['aiProvider']>('grok');

  // Load persisted state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.user) setUser(p.user);
        if (p.orders) setOrders(p.orders);
        if (p.favorites) setFav(p.favorites);
        if (p.cart) setCart(p.cart);
        if (p.aiProvider) setAiProvider(p.aiProvider);
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user, orders, favorites, cart, aiProvider }),
      );
    } catch {}
  }, [user, orders, favorites, cart, aiProvider]);

  // Intercept back button: if modal is open or something, let pages handle it.
  // Basic PWA back button behavior — Router handles rest natively.

  const value: AppState = useMemo(
    () => ({
      user,
      orders,
      library: orders.filter((o) => o.status === 'approved').map((o) => o.productId),
      favorites,
      cart,
      aiProvider,
      dark: true,
      login: (email: string, name?: string) => {
        const cleanName = name || email.split('@')[0];
        const handle = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
        setUser({
          id: 'u_' + handle,
          email,
          name: cleanName.replace(/^./, (c) => c.toUpperCase()),
          handle,
          avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(handle)}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
          roles: ['buyer'],
          referralCode: handle,
        });
      },
      logout: () => {
        setUser(null);
        setOrders([]);
        setFav([]);
        setCart([]);
      },
      addRole: (role: Role) => {
        setUser((u) => (u && !u.roles.includes(role) ? { ...u, roles: [...u.roles, role] } : u));
      },
      setAiProvider,
      placeOrder: (product, proof, reference) => {
        const order: Order = {
          id: 'ord_' + Math.random().toString(36).slice(2, 10),
          productId: product.id,
          productTitle: product.title,
          price: product.price,
          currency: product.currency,
          status: 'pending',
          createdAt: new Date().toISOString(),
          proofUrl: proof,
          reference,
          creatorId: product.creatorId,
        };
        setOrders((prev) => [order, ...prev]);
        setCart((c) => c.filter((i) => i !== product.id));
        return order;
      },
      approveOrder: (id) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'approved' } : o)));
      },
      rejectOrder: (id, note) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'rejected', note } : o)));
      },
      toggleFavorite: (id) => {
        setFav((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
      },
      addToCart: (id) => setCart((c) => (c.includes(id) ? c : [...c, id])),
      removeFromCart: (id) => setCart((c) => c.filter((i) => i !== id)),
    }),
    [user, orders, favorites, cart, aiProvider],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp must be inside AppProvider');
  return c;
}

export { PAYMENT_METHODS, DATA };
