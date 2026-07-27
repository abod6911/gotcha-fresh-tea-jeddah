import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MenuItem } from "@/data/menu";
import type { Bilingual } from "@/lib/i18n";

export type Size = "regular" | "large";
export type SugarLevel = 0 | 30 | 50 | 70 | 100;
export type IceLevel = "no" | "less" | "regular" | "extra";

export type CartLine = {
  key: string;
  itemId: string;
  name: Bilingual;
  icon: string;
  size: Size;
  sugar: SugarLevel;
  ice: IceLevel;
  toppings: string[];
  unitPrice: number;
  qty: number;
};

export const SIZE_EXTRA: Record<Size, number> = { regular: 0, large: 5 };

export const TOPPINGS: { id: string; label: Bilingual; price: number }[] = [
  { id: "pearls", label: { en: "Extra pearls", ar: "لؤلؤ إضافي" }, price: 4 },
  { id: "pudding", label: { en: "Egg pudding", ar: "بودينغ البيض" }, price: 5 },
  { id: "jelly", label: { en: "Aloe jelly", ar: "جيلي الصبار" }, price: 4 },
  { id: "cheese", label: { en: "Cheese foam", ar: "رغوة الجبن" }, price: 6 },
];

export function toppingPrice(ids: string[]) {
  return ids.reduce(
    (sum, id) => sum + (TOPPINGS.find((t) => t.id === id)?.price ?? 0),
    0,
  );
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (
    item: MenuItem,
    opts: { size: Size; sugar: SugarLevel; ice: IceLevel; toppings: string[]; qty?: number },
  ) => void;
  updateQty: (key: string, delta: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "gotcha-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const add = useCallback<CartContextValue["add"]>((item, opts) => {
    const key = [item.id, opts.size, opts.sugar, opts.ice, [...opts.toppings].sort().join("-")].join("|");
    const unitPrice = item.price + SIZE_EXTRA[opts.size] + toppingPrice(opts.toppings);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: l.qty + (opts.qty ?? 1) } : l,
        );
      }
      return [
        ...prev,
        {
          key,
          itemId: item.id,
          name: item.name,
          icon: item.icon,
          size: opts.size,
          sugar: opts.sugar,
          ice: opts.ice,
          toppings: opts.toppings,
          unitPrice,
          qty: opts.qty ?? 1,
        },
      ];
    });
    setOpen(true);
  }, []);

  const updateQty = useCallback((key: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback(
    (key: string) => setLines((prev) => prev.filter((l) => l.key !== key)),
    [],
  );
  const clear = useCallback(() => setLines([]), []);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0);

  const value = useMemo<CartContextValue>(
    () => ({ lines, count, total, isOpen, setOpen, add, updateQty, remove, clear }),
    [lines, count, total, isOpen, add, updateQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
