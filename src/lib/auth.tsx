import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "google" | "apple";
  points: number;
  blossoms: number;
  tier: "Bronze" | "Silver" | "Gold" | "VIP";
};

type AuthContextValue = {
  user: UserProfile | null;
  isAuthOpen: boolean;
  setAuthOpen: (open: boolean) => void;
  loginWithGoogle: () => void;
  loginWithApple: () => void;
  logout: () => void;
  addPoints: (earnedPoints: number, orderTotalSAR?: number) => void;
  redeemBlossom: (cost: number, rewardTitle: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "gotcha-user-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored) as UserProfile);
      }
    } catch {
      /* ignore invalid storage */
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const loginWithGoogle = useCallback(() => {
    setIsAuthenticating(true);
    // Simulate network delay
    setTimeout(() => {
      const mockUser: UserProfile = {
        id: "google-" + Math.random().toString(36).substring(2, 9),
        name: "عبدالمجيد الأحمد",
        email: "abed.user@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        provider: "google",
        points: 120,
        blossoms: 6,
        tier: "Silver",
      };
      setUser(mockUser);
      setIsAuthenticating(false);
      setAuthOpen(false);
      toast.success("تم تسجيل الدخول بنجاح عبر Google! 🌸", {
        description: "مرحباً بك مجدداً! رصيدك الحالي 6 أزهار و120 نقطة ولاء.",
      });
    }, 1500);
  }, []);

  const loginWithApple = useCallback(() => {
    setIsAuthenticating(true);
    setTimeout(() => {
      const mockUser: UserProfile = {
        id: "apple-" + Math.random().toString(36).substring(2, 9),
        name: "Abed Al-Ahmad",
        email: "abed@icloud.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        provider: "apple",
        points: 150,
        blossoms: 8,
        tier: "Gold",
      };
      setUser(mockUser);
      setIsAuthenticating(false);
      setAuthOpen(false);
      toast.success("تم تسجيل الدخول بنجاح عبر Apple! ", {
        description: "أهلاً بك! تم تفعيل حساب الولاء الخاص بك.",
      });
    }, 1500);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    toast.info("تم تسجيل الخروج");
  }, []);

  const addPoints = useCallback((earnedPoints: number, orderTotalSAR?: number) => {
    setUser((prev) => {
      if (!prev) return null;
      const newPoints = prev.points + earnedPoints;
      const newBlossoms = prev.blossoms + Math.max(1, Math.floor((orderTotalSAR ?? 25) / 20));
      let newTier: UserProfile["tier"] = prev.tier;
      if (newPoints >= 300) newTier = "VIP";
      else if (newPoints >= 200) newTier = "Gold";
      else if (newPoints >= 100) newTier = "Silver";

      toast.success(`🎉 تم إضافة ${earnedPoints} نقطة ولاء إلى حسابك!`, {
        description: `رصيدك الجديد: ${newBlossoms} أزهار · ${newPoints} نقطة.`,
      });

      return {
        ...prev,
        points: newPoints,
        blossoms: newBlossoms,
        tier: newTier,
      };
    });
  }, []);

  const redeemBlossom = useCallback((cost: number, rewardTitle: string) => {
    let success = false;
    setUser((prev) => {
      if (!prev) {
        toast.error("يرجى تسجيل الدخول لاستبدال المكافأة");
        setAuthOpen(true);
        return null;
      }
      if (prev.blossoms < cost) {
        toast.error(`تحتاج إلى ${cost} أزهار على الأقل لاستبدال هذه المكافأة`);
        return prev;
      }
      success = true;
      toast.success(`🌸 تم استبدال المكافأة: ${rewardTitle}!`, {
        description: "رمز الكوبون: GOTCHA-FREE-DRINK-2026",
      });
      return {
        ...prev,
        blossoms: prev.blossoms - cost,
      };
    });
    return success;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthOpen,
      isAuthenticating,
      setAuthOpen,
      loginWithGoogle,
      loginWithApple,
      logout,
      addPoints,
      redeemBlossom,
    }),
    [user, isAuthOpen, isAuthenticating, loginWithGoogle, loginWithApple, logout, addPoints, redeemBlossom]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
