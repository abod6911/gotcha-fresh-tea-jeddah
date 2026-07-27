import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { 
  GoogleAuthProvider, 
  OAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged,
  signOut as firebaseSignOut
} from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useLang } from "./i18n";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  blossoms: number;
  tier: "Bronze" | "Silver" | "Gold" | "VIP";
  age?: number;
  needsProfile?: boolean;
}

type AuthContextValue = {
  user: UserProfile | null;
  isAuthOpen: boolean;
  isAuthenticating: boolean;
  setAuthOpen: (open: boolean) => void;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => Promise<void>;
  addPoints: (earnedPoints: number, orderTotalSAR?: number) => Promise<void>;
  redeemBlossom: (cost: number, rewardTitle: string) => Promise<boolean>;
  saveProfile: (name: string, age: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const { t } = useLang();

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User logged in, listen to their Firestore document
        const userRef = doc(db, "users", firebaseUser.uid);
        const unsubscribeDoc = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser(docSnap.data() as UserProfile);
          }
        });
        setIsAuthenticating(false);
        return () => unsubscribeDoc();
      } else {
        setUser(null);
        setIsAuthenticating(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleOAuthLogin = async (provider: any, providerName: string) => {
    try {
      setIsAuthenticating(true);
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", firebaseUser.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // Create new user document
        const newUser: UserProfile = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "New User",
          email: firebaseUser.email || "",
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/notionists/svg?seed=${firebaseUser.uid}`,
          points: 50, // Welcome bonus
          blossoms: 0,
          tier: "Bronze",
          needsProfile: true, // Force profile setup
        };
        await setDoc(userRef, newUser);
        toast.success(t({ en: `Welcome to Gotcha, ${newUser.name}!`, ar: `أهلاً بك في قوتشا، ${newUser.name}!` }));
      } else {
        toast.success(t({ en: `Welcome back!`, ar: `أهلاً بعودتك!` }));
        setAuthOpen(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(t({ en: `Failed to sign in with ${providerName}.`, ar: `فشل تسجيل الدخول بواسطة ${providerName}.` }));
    } finally {
      setIsAuthenticating(false);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await handleOAuthLogin(provider, "Google");
  };

  const loginWithApple = async () => {
    const provider = new OAuthProvider('apple.com');
    await handleOAuthLogin(provider, "Apple");
  };

  const saveProfile = async (name: string, age: number) => {
    if (!user) return;
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      name,
      age,
      needsProfile: false
    });
    toast.success(t({ en: "Profile updated!", ar: "تم تحديث الملف الشخصي!" }));
    setAuthOpen(false);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    toast.success(t({ en: "Signed out safely", ar: "تم تسجيل الخروج بأمان" }));
  };

  const addPoints = async (earnedPoints: number, orderTotalSAR?: number) => {
    if (!user) return;
    const userRef = doc(db, "users", user.id);
    
    const newBlossoms = Math.max(1, Math.floor((orderTotalSAR ?? 25) / 20));
    
    // Simple tier logic based on total points
    const currentTotal = user.points + earnedPoints;
    let newTier = user.tier;
    if (currentTotal > 300) newTier = "VIP";
    else if (currentTotal > 200) newTier = "Gold";
    else if (currentTotal > 100) newTier = "Silver";

    await updateDoc(userRef, {
      points: increment(earnedPoints),
      blossoms: increment(newBlossoms),
      tier: newTier
    });

    toast.success(`🎉 تم إضافة ${earnedPoints} نقطة ولاء إلى حسابك!`, {
      description: `تم كسب ${newBlossoms} أزهار · ${earnedPoints} نقطة.`,
    });
  };

  const redeemBlossom = async (cost: number, rewardTitle: string): Promise<boolean> => {
    if (!user) {
      toast.error("يرجى تسجيل الدخول لاستبدال المكافأة");
      setAuthOpen(true);
      return false;
    }
    if (user.blossoms < cost) {
      toast.error(`تحتاج إلى ${cost} أزهار على الأقل لاستبدال هذه المكافأة`);
      return false;
    }

    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      blossoms: increment(-cost)
    });

    toast.success(`🌸 تم استبدال المكافأة: ${rewardTitle}!`, {
      description: "رمز الكوبون: GOTCHA-FREE-DRINK-2026",
    });
    return true;
  };

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
      saveProfile
    }),
    [user, isAuthOpen, isAuthenticating]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
