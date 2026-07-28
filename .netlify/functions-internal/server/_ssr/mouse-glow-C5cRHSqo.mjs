import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { a as signInWithPopup, i as onAuthStateChanged, n as OAuthProvider, o as signOut, r as getAuth, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { a as doc, i as updateDoc, n as onSnapshot, o as getFirestore, r as setDoc, s as increment, t as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { C as Clock, D as ChevronDown, E as ChevronLeft, O as Award, S as Gift, T as ChevronRight, _ as MapPin, a as Sun, b as Leaf, c as ShoppingBag, d as Plus, f as Navigation, g as Menu, h as MessageCircle, i as Trash2, k as ArrowUp, l as ShieldCheck, m as Minus, n as User, o as Star, p as Mountain, r as Truck, s as Sparkles, t as X, u as Search, v as LogOut, w as CircleCheck, x as Globe, y as LogIn } from "../_libs/lucide-react.mjs";
import { i as AnimatePresence, n as useSpring, r as motion, t as useAnimation } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mouse-glow-C5cRHSqo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LangContext = (0, import_react.createContext)(null);
var STORAGE_KEY$1 = "gotcha-lang";
function LanguageProvider({ children }) {
	const [lang, setLangState] = (0, import_react.useState)("ar");
	(0, import_react.useEffect)(() => {
		const stored = window.localStorage.getItem(STORAGE_KEY$1);
		if (stored === "ar" || stored === "en") setLangState(stored);
	}, []);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.setAttribute("lang", lang);
		root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
		window.localStorage.setItem(STORAGE_KEY$1, lang);
	}, [lang]);
	const setLang = (0, import_react.useCallback)((next) => setLangState(next), []);
	const toggle = (0, import_react.useCallback)(() => setLangState((prev) => prev === "ar" ? "en" : "ar"), []);
	const t = (0, import_react.useCallback)((value) => value[lang], [lang]);
	const value = (0, import_react.useMemo)(() => ({
		lang,
		dir: lang === "ar" ? "rtl" : "ltr",
		toggle,
		setLang,
		t
	}), [
		lang,
		toggle,
		setLang,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangContext.Provider, {
		value,
		children
	});
}
function useLang() {
	const ctx = (0, import_react.useContext)(LangContext);
	if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
	return ctx;
}
var SIZE_EXTRA = {
	regular: 0,
	large: 5
};
var TOPPINGS = [
	{
		id: "pearls",
		label: {
			en: "Extra pearls",
			ar: "لؤلؤ إضافي"
		},
		price: 4
	},
	{
		id: "pudding",
		label: {
			en: "Egg pudding",
			ar: "بودينغ البيض"
		},
		price: 5
	},
	{
		id: "jelly",
		label: {
			en: "Aloe jelly",
			ar: "جيلي الصبار"
		},
		price: 4
	},
	{
		id: "cheese",
		label: {
			en: "Cheese foam",
			ar: "رغوة الجبن"
		},
		price: 6
	}
];
function toppingPrice(ids) {
	return ids.reduce((sum, id) => sum + (TOPPINGS.find((t) => t.id === id)?.price ?? 0), 0);
}
var CartContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "gotcha-cart";
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [isOpen, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) setLines(JSON.parse(raw));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
	}, [lines]);
	const add = (0, import_react.useCallback)((item, opts) => {
		const key = [
			item.id,
			opts.size,
			opts.sugar,
			opts.ice,
			[...opts.toppings].sort().join("-")
		].join("|");
		const unitPrice = item.price + SIZE_EXTRA[opts.size] + toppingPrice(opts.toppings);
		setLines((prev) => {
			if (prev.find((l) => l.key === key)) return prev.map((l) => l.key === key ? {
				...l,
				qty: l.qty + (opts.qty ?? 1)
			} : l);
			return [...prev, {
				key,
				itemId: item.id,
				name: item.name,
				icon: item.icon,
				size: opts.size,
				sugar: opts.sugar,
				ice: opts.ice,
				toppings: opts.toppings,
				unitPrice,
				qty: opts.qty ?? 1
			}];
		});
		setOpen(true);
	}, []);
	const updateQty = (0, import_react.useCallback)((key, delta) => {
		setLines((prev) => prev.map((l) => l.key === key ? {
			...l,
			qty: l.qty + delta
		} : l).filter((l) => l.qty > 0));
	}, []);
	const remove = (0, import_react.useCallback)((key) => setLines((prev) => prev.filter((l) => l.key !== key)), []);
	const clear = (0, import_react.useCallback)(() => setLines([]), []);
	const count = lines.reduce((n, l) => n + l.qty, 0);
	const total = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0);
	const value = (0, import_react.useMemo)(() => ({
		lines,
		count,
		total,
		isOpen,
		setOpen,
		add,
		updateQty,
		remove,
		clear
	}), [
		lines,
		count,
		total,
		isOpen,
		add,
		updateQty,
		remove,
		clear
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
var app = initializeApp({
	apiKey: "AIzaSy_mock_key_for_development_purposes",
	authDomain: "mock-app.firebaseapp.com",
	projectId: "mock-app",
	storageBucket: "mock-app.appspot.com",
	messagingSenderId: "1234567890",
	appId: "1:1234567890:web:abcdef123456"
});
var auth = getAuth(app);
var db = getFirestore(app);
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isAuthOpen, setAuthOpen] = (0, import_react.useState)(false);
	const [isAuthenticating, setIsAuthenticating] = (0, import_react.useState)(true);
	const { t } = useLang();
	(0, import_react.useEffect)(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				const unsubscribeDoc = onSnapshot(doc(db, "users", firebaseUser.uid), (docSnap) => {
					if (docSnap.exists()) setUser(docSnap.data());
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
	const handleOAuthLogin = async (provider, providerName) => {
		try {
			setIsAuthenticating(true);
			const firebaseUser = (await signInWithPopup(auth, provider)).user;
			const userRef = doc(db, "users", firebaseUser.uid);
			if (!(await getDoc(userRef)).exists()) {
				const newUser = {
					id: firebaseUser.uid,
					name: firebaseUser.displayName || "New User",
					email: firebaseUser.email || "",
					avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/notionists/svg?seed=${firebaseUser.uid}`,
					points: 50,
					blossoms: 0,
					tier: "Bronze",
					needsProfile: true
				};
				await setDoc(userRef, newUser);
				toast.success(t({
					en: `Welcome to Gotcha, ${newUser.name}!`,
					ar: `أهلاً بك في قوتشا، ${newUser.name}!`
				}));
			} else {
				toast.success(t({
					en: `Welcome back!`,
					ar: `أهلاً بعودتك!`
				}));
				setAuthOpen(false);
			}
		} catch (error) {
			console.error(error);
			toast.error(t({
				en: `Failed to sign in with ${providerName}.`,
				ar: `فشل تسجيل الدخول بواسطة ${providerName}.`
			}));
		} finally {
			setIsAuthenticating(false);
		}
	};
	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		await handleOAuthLogin(provider, "Google");
	};
	const loginWithApple = async () => {
		const provider = new OAuthProvider("apple.com");
		await handleOAuthLogin(provider, "Apple");
	};
	const saveProfile = async (name, age) => {
		if (!user) return;
		await updateDoc(doc(db, "users", user.id), {
			name,
			age,
			needsProfile: false
		});
		toast.success(t({
			en: "Profile updated!",
			ar: "تم تحديث الملف الشخصي!"
		}));
		setAuthOpen(false);
	};
	const logout = async () => {
		await signOut(auth);
		toast.success(t({
			en: "Signed out safely",
			ar: "تم تسجيل الخروج بأمان"
		}));
	};
	const addPoints = async (earnedPoints, orderTotalSAR) => {
		if (!user) return;
		const userRef = doc(db, "users", user.id);
		const newBlossoms = Math.max(1, Math.floor((orderTotalSAR ?? 25) / 20));
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
		toast.success(`🎉 تم إضافة ${earnedPoints} نقطة ولاء إلى حسابك!`, { description: `تم كسب ${newBlossoms} أزهار · ${earnedPoints} نقطة.` });
	};
	const redeemBlossom = async (cost, rewardTitle) => {
		if (!user) {
			toast.error("يرجى تسجيل الدخول لاستبدال المكافأة");
			setAuthOpen(true);
			return false;
		}
		if (user.blossoms < cost) {
			toast.error(`تحتاج إلى ${cost} أزهار على الأقل لاستبدال هذه المكافأة`);
			return false;
		}
		await updateDoc(doc(db, "users", user.id), { blossoms: increment(-cost) });
		toast.success(`🌸 تم استبدال المكافأة: ${rewardTitle}!`, { description: "رمز الكوبون: GOTCHA-FREE-DRINK-2026" });
		return true;
	};
	const value = (0, import_react.useMemo)(() => ({
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
	}), [
		user,
		isAuthOpen,
		isAuthenticating
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
var GOTCHA_LOGO_DATA_URL = "data:image/jpeg;base64,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Vc0GnojwQWe2MC7V8jNTJONbkJ8nVGlqtZiHczwnLNkRFAUZGyQqPNIH7p4QgY5pMao5fpcl3JanAAAgcGBBR4fszPiIJwExQOEFAwOYQ5AsS0KFpyk8DQmbiLHqQSEmHAEBcdE5UjCCjGIiXVEf8P8A/9oADAMBAAIAAwAAABDzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzrIJIjzzzwFbzzzzzzzzzzzzzzzzzzzzzzzzzsPPMLFTzzyXzzzzzzzzzzzzzzzzzzzzzzzwqLAz/AG9v71I8888888888888888888888888p488V8++cF89t+8888888888888888888888+G/8++++++t38uO8888888888888888888888+388V++++++a88m8888888888888888888888B88+248888ys88q8888888888888888888888u888y+4260Yx88q88888888888888888888++ui8o78P99Poun6s88888888888888888888YI8s186L8888OU2Lt988888888888888888882+884H+eFvf8br8uie888888888888888888888888+OR/aGkyKC/c8888888888888888888888888c1E8Xvdc+4888yUc888888888888888888g+4SXo/gCCTRG088rU+888888888888888888c9Zi2P8CCCBzTo88NIv88888888888888888888KPjnDK94XsPu888fS28888888888888888888UM2/Cg2xWkLR88888888888888888888888889yiVu40888888888888888888888888888888aDDGy78888888888888888888888888888888sb9Y9s88888888888888888888888888888886+c8888888888888888888888888888888888pG888888888888888888888888888888844880E8++64688084006w8888888888888888wscAs8g898kMA888p8gMg8888888888888888W8pcU+V898A89c88p88888888888888888888W8sMKCd898A88888p88888888888888888888W888qD+898A88888t88888888888888888888W4WUqD+898A888oQ88owc8888888888888888W8pAqD+898A88888p88888888888888888888W8pAqD+898A84888p88888888888888888888W8sAqD6898I89c88p88888888888888888888MU88WQF898IwE888p888888888888888888888Ac8gA88A88Ac8A8g888888888888//8QAIxEBAAICAgICAwEBAAAAAAAAAQARITEQQCBBMGFQUXFgkf/aAAgBAwEBPxD/ADNTDfDKPt4lkyunaC8Ski8vLwEg9ngI7JbMwl/UtgnU+qIepkg/ctbj+naCuY7ObswAa52kXgNTH99lWJFPFi3yQSmXK5yz1xbHLzV5hgeTSdffwNeVVCqPC9+u6hOcSuKvmqmQ8M9uqqg5yzwbmvFsW4NS3g1bHQIqrjg6rKIZhwvTErgRBT4i8oiFL+4H/EBSAHHUqKYQo5PRmXAbKgUZgpFuBcWiiC1EAuYZu7a3uAfUX7mUwmRqogepk3xApqJt2lgv1Pog1motwNQq7jbUFhIiz4LgQPthBo6aOCYgXiNGCKZzcJQn2RmFmIxFYO6TDhYlPJsgjqGpFO4G7JUL+yoNuNsSoVBKtICMNyoBu3nQMy5tOrWm5/bxTdTCDbrHMZa0hl/bK0V4W7jcqurampf7kT7jRSm2JmKILgg1DCTDPslxntVpxKIZkES5cfSK3vr1cuLh9LmFPuZpv8ANNyxMEH9wdxaW/gr/AAekH/KvXfifB7K5lw+J7Lxp8T2XjT8C8PGnxPXeHjT4nsvGnk+D2UlQ+J/Jf//EACYRAQACAgEEAgICAwAAAAAAAAEAESExQRBAUFEgYYGxMHFg4fD/2gAIAQIBAT8Q/wAZUMsvplPmfmgrTh+WIo5d0Ztg23Hqeuf9VPfB6WZfhIWncjgZZyWoc+YE0Tbp9k0zKgq2E5i4N1g90ph8LfWmClteu2QsHfQBTMuBvJ261mCvLHb6Yxt+SKkE+hLwzIvt1ThoOt8/PO6sG7rdSyoKX8f8+4fX+ztxbisHrakw1EG4I6i1uAdTGxrXrmj77UbSG8kSyosnx0FlTDT/AF0WbYAxEbQJsjgmYO7uKCtcRT7Qcxx2qEnegq8k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";
function AuthModal() {
	const { t } = useLang();
	const { user, isAuthOpen, isAuthenticating, setAuthOpen, loginWithGoogle, loginWithApple, saveProfile } = useAuth();
	const [nameInput, setNameInput] = (0, import_react.useState)("");
	const [ageInput, setAgeInput] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && isAuthOpen) setAuthOpen(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isAuthOpen, setAuthOpen]);
	if (!isAuthOpen) return null;
	const handleSaveProfile = () => {
		if (!nameInput.trim() || !ageInput) return;
		saveProfile(nameInput, parseInt(ageInput, 10));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[70] flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-plum/50 backdrop-blur-md transition-opacity animate-in fade-in duration-300",
			onClick: () => setAuthOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border bg-card p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-300 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-20 -end-20 h-44 w-44 rounded-full bg-pink-deep/20 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-20 -start-20 h-44 w-44 rounded-full bg-lav-deep/20 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setAuthOpen(false),
					className: "absolute top-5 end-5 rounded-full p-2 text-plum-soft transition-colors hover:bg-pink-soft hover:text-plum",
					"aria-label": t({
						en: "Close modal",
						ar: "إغلاق النافذة"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}),
				user?.needsProfile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 text-center animate-in fade-in slide-in-from-right-4 duration-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-2xl font-bold text-plum",
							children: t({
								en: "Complete your profile",
								ar: "أكمل ملفك الشخصي"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-plum-soft leading-relaxed",
							children: t({
								en: "Please enter your name and age to finish setting up your account.",
								ar: "يرجى إدخال اسمك وعمرك لإكمال إعداد حسابك."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: t({
										en: "Your Name",
										ar: "الاسم الكريم"
									}),
									value: nameInput,
									onChange: (e) => setNameInput(e.target.value),
									className: "w-full rounded-2xl border border-border bg-cream-2 px-4 py-3 text-sm text-plum outline-none placeholder:text-plum-soft focus:border-pink-deep transition-colors"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									placeholder: t({
										en: "Your Age",
										ar: "العمر"
									}),
									value: ageInput,
									onChange: (e) => setAgeInput(e.target.value),
									className: "w-full rounded-2xl border border-border bg-cream-2 px-4 py-3 text-sm text-plum outline-none placeholder:text-plum-soft focus:border-pink-deep transition-colors"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleSaveProfile,
									disabled: !nameInput.trim() || !ageInput,
									className: "bg-gradient-neon mt-2 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
									children: t({
										en: "Save Profile",
										ar: "حفظ ومتابعة"
									})
								})
							]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 text-center animate-in fade-in slide-in-from-left-4 duration-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-glow border border-pink-deep/20 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: GOTCHA_LOGO_DATA_URL,
								alt: "Gotcha Logo",
								className: "h-10 w-10 object-cover rounded-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-2xl font-bold text-plum",
							children: t({
								en: "Join Gotcha Rewards",
								ar: "تسجيل الدخول لنظام نقاط الولاء"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-plum-soft leading-relaxed",
							children: t({
								en: "Sign in with Google to track your blossoms, calculate loyalty points, and redeem free drinks!",
								ar: "سجّل دخولك الآن بواسطة حساب Google لحساب نقاط الولاء وتجميع أزهار قوتشا والحصول على مشروبات مجانية!"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-2xl border border-pink/30 bg-cream-2/80 p-4 backdrop-blur-sm text-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-semibold text-plum mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-neon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t({
									en: "Loyalty Perks",
									ar: "مميزات حساب الولاء"
								}) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-1.5 text-xs text-plum-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-neon" }), t({
										en: "1 Blossom per drink ordered",
										ar: "زهرة واحدة مع كل كوب تطلبه"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-neon" }), t({
										en: "10 Points for every SAR 1 spent",
										ar: "10 نقاط ولاء مقابل كل ريال تسدده"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: loginWithGoogle,
								disabled: isAuthenticating,
								className: "group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-plum shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-deep hover:bg-pink-soft/50 hover:shadow-soft disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0",
								children: [isAuthenticating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-5 animate-spin rounded-full border-2 border-plum border-t-transparent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "h-5 w-5 shrink-0",
									viewBox: "0 0 24 24",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#4285F4",
											d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#34A853",
											d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#FBBC05",
											d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#EA4335",
											d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isAuthenticating ? t({
									en: "Connecting securely...",
									ar: "جاري الاتصال الآمن..."
								}) : t({
									en: "Continue with Google",
									ar: "متابعة بواسطة حساب Google"
								}) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-center text-[0.7rem] text-plum-soft",
							children: t({
								en: "By logging in, you agree to Gotcha Tea Loyalty terms and conditions.",
								ar: "تسجيل الدخول يمنحك التمتع بالمكافآت التلقائية وسجل النقاط الخاص بك."
							})
						})
					]
				})
			]
		})]
	});
}
function GotchaLogo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `relative flex items-center justify-center select-none shrink-0 ${className ?? ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: GOTCHA_LOGO_DATA_URL,
			alt: "Gotcha Fresh Tea Logo",
			loading: "eager",
			decoding: "async",
			className: "w-full h-full object-cover rounded-full bg-white p-0.5 shadow-sm ring-1 ring-pink-deep/20 transition-transform duration-300 hover:scale-105"
		})
	});
}
var NAV = [
	{
		href: "#story",
		label: {
			en: "Our Story",
			ar: "قصتنا"
		}
	},
	{
		href: "#menu",
		label: {
			en: "Menu",
			ar: "القائمة"
		}
	},
	{
		href: "#farms",
		label: {
			en: "Tea Farms",
			ar: "مزارعنا"
		}
	},
	{
		href: "#gallery",
		label: {
			en: "Gallery",
			ar: "لحظاتنا"
		}
	},
	{
		href: "#rewards",
		label: {
			en: "Rewards",
			ar: "المكافآت"
		}
	},
	{
		href: "#locations",
		label: {
			en: "Locations",
			ar: "الفروع"
		}
	},
	{
		href: "#contact",
		label: {
			en: "Contact",
			ar: "تواصل معنا"
		}
	}
];
function Header() {
	const { t, lang, toggle } = useLang();
	const { count, setOpen } = useCart();
	const { user, setAuthOpen, logout } = useAuth();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [userDropdown, setUserDropdown] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)("#story");
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (e) => {
			const target = e.target;
			if (userDropdown && !target.closest(".user-dropdown-container")) setUserDropdown(false);
		};
		window.addEventListener("click", handleClickOutside);
		return () => window.removeEventListener("click", handleClickOutside);
	}, [userDropdown]);
	(0, import_react.useEffect)(() => {
		const sections = NAV.map((n) => document.querySelector(n.href)).filter(Boolean);
		const observer = new IntersectionObserver((entries) => {
			const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (visible) setActive(`#${visible.target.id}`);
		}, {
			rootMargin: "-45% 0px -45% 0px",
			threshold: [
				0,
				.25,
				.5
			]
		});
		sections.forEach((s) => observer.observe(s));
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${scrolled ? "shadow-soft bg-white/60 backdrop-blur-2xl border-white/40" : "bg-transparent border-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1180px] items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2.5 sm:py-3 flex-nowrap overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "flex items-center gap-2 sm:gap-2.5 group shrink-0 select-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GotchaLogo, { className: "h-8 w-8 sm:h-9 sm:w-9 shrink-0 transition-transform duration-300 group-hover:scale-105" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "font-display text-lg sm:text-xl tracking-wide text-plum",
							children: "Gotcha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-ink font-bold",
							children: t({
								en: "Fresh Tea",
								ar: "قوتشا فريش تي"
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 xl:gap-2 xl:flex shrink-0 bg-card/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-deep/25 shadow-soft",
					children: NAV.map((item) => {
						const isActive = active === item.href;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							className: `relative rounded-full px-3.5 py-1 text-xs xl:text-sm font-bold whitespace-nowrap transition-all duration-300 ${isActive ? "bg-gradient-neon text-white shadow-glow" : "text-plum/80 hover:text-plum hover:bg-pink-soft/60"}`,
							children: t(item.label)
						}, item.href);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 sm:gap-2 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: toggle,
							"aria-label": "Switch language",
							className: "flex items-center gap-1 rounded-full border-[1.5px] border-pink-deep/40 bg-card px-2.5 sm:px-3 py-1.5 text-[0.65rem] sm:text-xs font-bold text-plum transition-all duration-300 hover:border-neon hover:bg-pink-soft hover:scale-105",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3.5 w-3.5 text-neon shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "ar" ? "English" : "العربية" })]
						}),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative user-dropdown-container",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setUserDropdown((v) => !v),
								className: "flex items-center gap-1.5 rounded-full border-[1.5px] border-pink-deep/40 bg-cream-2 px-2 sm:px-3 py-1 text-xs font-bold text-plum shadow-sm transition-all hover:bg-pink-soft",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: user.avatar,
										alt: user.name,
										className: "h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover ring-1 ring-pink-deep"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden md:inline-block max-w-[80px] truncate",
										children: user.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 rounded-full bg-plum/10 px-1.5 py-0.5 text-[0.65rem] font-bold text-plum",
										children: ["🌸 ", user.blossoms]
									})
								]
							}), userDropdown && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute end-0 mt-2 w-56 rounded-2xl border border-pink-deep/20 bg-card p-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-b border-border pb-2.5 mb-2 px-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-plum",
												children: user.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[0.7rem] text-plum-soft truncate",
												children: user.email
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex items-center justify-between rounded-xl bg-pink-soft/60 px-2.5 py-1 text-xs font-semibold text-plum",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5 text-neon" }),
														" ",
														user.tier
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [user.points, " pts"] })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#rewards",
										onClick: () => setUserDropdown(false),
										className: "flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-plum hover:bg-pink-soft",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-neon" }), t({
											en: "Loyalty Dashboard",
											ar: "لوحة تحكم الولاء"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											logout();
											setUserDropdown(false);
										},
										className: "flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-destructive hover:bg-destructive/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), t({
											en: "Sign out",
											ar: "تسجيل الخروج"
										})]
									})
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setAuthOpen(true),
							className: "flex items-center gap-1 rounded-full border-[1.5px] border-pink-deep/40 bg-card px-2.5 sm:px-3 py-1.5 text-[0.65rem] sm:text-xs font-bold text-plum transition-all duration-300 hover:border-neon hover:bg-pink-soft hover:scale-105",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-ink shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden xs:inline-block",
								children: t({
									en: "Login",
									ar: "دخول"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpen(true),
							"aria-label": t({
								en: "Open cart",
								ar: "فتح السلة"
							}),
							className: "relative rounded-full border-[1.5px] border-pink-deep/40 bg-card p-1.5 sm:p-2 text-plum transition-all duration-300 hover:bg-pink-soft hover:scale-105 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gradient-neon absolute -top-1.5 -end-1.5 flex h-4 min-w-4 sm:h-5 sm:min-w-5 items-center justify-center rounded-full px-1 text-[0.6rem] sm:text-[0.65rem] font-bold text-primary-foreground animate-pulse shadow-glow",
								children: count
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#menu",
							className: "bg-gradient-neon hidden rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg active:scale-95 sm:inline-flex shrink-0",
							children: t({
								en: "Order Now",
								ar: "اطلب الآن"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-full border-[1.5px] border-pink-deep/40 p-1.5 sm:p-2 text-plum xl:hidden shrink-0",
							onClick: () => setMobileOpen((v) => !v),
							"aria-label": t({
								en: "Menu",
								ar: "القائمة"
							}),
							"aria-expanded": mobileOpen,
							children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "min-h-0 overflow-hidden border-t border-border bg-card/95 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-1 py-4",
					children: NAV.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						style: { transitionDelay: mobileOpen ? `${80 + i * 45}ms` : "0ms" },
						className: `transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							onClick: () => setMobileOpen(false),
							className: "block rounded-xl px-3 py-2.5 text-sm font-medium text-plum-soft transition-all duration-300 hover:bg-pink-soft hover:ps-5 hover:text-plum",
							children: t(item.label)
						})
					}, item.href))
				})
			})
		})]
	});
}
var COLORS = [
	"var(--pink)",
	"var(--lav)",
	"var(--pink-deep)",
	"var(--lav-deep)"
];
function Petals({ count = 18 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-0 overflow-hidden",
		"aria-hidden": "true",
		children: (0, import_react.useMemo)(() => Array.from({ length: count }, (_, i) => {
			const seed = (i * 9301 + 49297) % 233280;
			const rnd = (n) => seed * (n + 7) % 1e3 / 1e3;
			return {
				id: i,
				size: 8 + rnd(1) * 10,
				left: rnd(2) * 90,
				bottom: 20 + rnd(3) * 40,
				duration: 10 + rnd(4) * 10,
				delay: rnd(5) * 10,
				color: COLORS[i % COLORS.length]
			};
		}), [count]).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "petal absolute animate-drift opacity-80",
			style: {
				width: `${p.size}px`,
				height: `${p.size}px`,
				borderRadius: "60% 40% 60% 40%",
				background: p.color,
				insetInlineStart: `${p.left}%`,
				bottom: `-${p.bottom}px`,
				animationDuration: `${p.duration}s`,
				animationDelay: `${p.delay}s`
			}
		}, p.id))
	});
}
function FlowerDeco({ className, style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 100",
		"aria-hidden": "true",
		className: `pointer-events-none absolute z-0 ${className ?? ""}`,
		style,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "50",
				cy: "30",
				rx: "14",
				ry: "24",
				fill: "var(--pink)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "50",
				cy: "30",
				rx: "14",
				ry: "24",
				fill: "var(--lav)",
				transform: "rotate(72 50 50)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "50",
				cy: "30",
				rx: "14",
				ry: "24",
				fill: "var(--pink-deep)",
				transform: "rotate(144 50 50)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "50",
				cy: "30",
				rx: "14",
				ry: "24",
				fill: "var(--lav)",
				transform: "rotate(216 50 50)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "50",
				cy: "30",
				rx: "14",
				ry: "24",
				fill: "var(--pink-deep)",
				transform: "rotate(288 50 50)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r: "9",
				fill: "var(--neon)"
			})
		]
	});
}
/** Tabebuia rosea (pink trumpet tree) — soft warm background silhouette. */
function TabebuiaTree({ className, style, flip = false }) {
	const blooms = [
		{
			cx: 100,
			cy: 60,
			r: 46
		},
		{
			cx: 58,
			cy: 88,
			r: 34
		},
		{
			cx: 145,
			cy: 86,
			r: 36
		},
		{
			cx: 78,
			cy: 46,
			r: 26
		},
		{
			cx: 128,
			cy: 44,
			r: 24
		},
		{
			cx: 100,
			cy: 104,
			r: 30
		},
		{
			cx: 40,
			cy: 60,
			r: 20
		},
		{
			cx: 162,
			cy: 58,
			r: 18
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 200 260",
		"aria-hidden": "true",
		className: `pointer-events-none absolute z-0 ${className ?? ""}`,
		style: {
			...style,
			transform: flip ? "scaleX(-1)" : void 0
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "animate-sway",
			style: { transformOrigin: "100px 240px" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M96 260 L96 150 C96 132 78 124 62 112 M104 260 L104 140 C104 120 124 112 140 98 M100 176 C100 164 88 156 74 148",
					stroke: "#FFD1DC",
					strokeWidth: "6",
					strokeLinecap: "round",
					opacity: .6,
					fill: "none"
				}),
				blooms.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: b.cx,
					cy: b.cy,
					r: b.r,
					fill: i % 2 ? "var(--pink)" : "var(--pink-deep)",
					opacity: .55
				}, i)),
				blooms.slice(0, 5).map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: b.cx - 8,
					cy: b.cy - 8,
					r: b.r * .5,
					fill: "var(--pink-soft)",
					opacity: .7
				}, `h${i}`))
			]
		})
	});
}
function Hero() {
	const { t, dir } = useLang();
	const [activeStep, setActiveStep] = (0, import_react.useState)(0);
	const [isAutoPlaying, setIsAutoPlaying] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!isAutoPlaying) return;
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % 4);
		}, 3500);
		return () => clearInterval(interval);
	}, [isAutoPlaying]);
	const steps = [
		{
			badge: {
				en: "Interactive Experience · Handcrafted",
				ar: "تجربة تفاعلية · تحضير يدوي فاخر"
			},
			title: {
				en: "Sip the ",
				ar: "تذوّق سحر "
			},
			highlight: {
				en: "Magic.",
				ar: "الباستيل."
			},
			desc: {
				en: "Tap the cup or click the steps below to watch us brew your fresh boba tea live.",
				ar: "انقر الكوب أو اضغط على الخطوات في الأسفل لمشاهدة تحضير شاي الباستيل مباشرةً."
			}
		},
		{
			badge: {
				en: "Step 1 · Tapioca Pearls",
				ar: "الخطوة 1 · لؤلؤ التابيوكا"
			},
			title: {
				en: "Add the ",
				ar: "أضف "
			},
			highlight: {
				en: "Boba.",
				ar: "البوبا."
			},
			desc: {
				en: "Hand-cooked brown sugar tapioca pearls — warm, chewy, and rich.",
				ar: "لؤلؤ السكر البني المكرمل الدافئ — طري، غني، وذو قوام متناغم رائع."
			}
		},
		{
			badge: {
				en: "Step 2 · Farm Fresh Brew",
				ar: "الخطوة 2 · سكب الشاي الطازج"
			},
			title: {
				en: "Pour the ",
				ar: "اسكب "
			},
			highlight: {
				en: "Tea.",
				ar: "الشاي."
			},
			desc: {
				en: "Single-origin Formosa Oolong & fresh milk poured to silky perfection.",
				ar: "شاي الأولونغ المحمص من مزارعنا الجبلية مع الحليب الطازج المنساب بسلاسة."
			}
		},
		{
			badge: {
				en: "Step 3 · Ready to Drink",
				ar: "الخطوة 3 · جاهز للاستمتاع"
			},
			title: {
				en: "Ready to ",
				ar: "جاهز "
			},
			highlight: {
				en: "Enjoy!",
				ar: "للارتشاف!"
			},
			desc: {
				en: "Your fresh boba tea is ready! Taste the authentic freshness of Taiwan & Melbourne in Jeddah.",
				ar: "كوب قوتشا الباستيل جاهز الآن! نضارة تايوان وفخامة ملبورن بين يديك في جدة."
			}
		}
	];
	const stats = [
		{
			value: "100%",
			label: {
				en: "Farm fresh leaves, daily",
				ar: "أوراق طازجة يوميًا"
			}
		},
		{
			value: "2013",
			label: {
				en: "Founded in Melbourne",
				ar: "تأسست في ملبورن"
			}
		},
		{
			value: "0",
			label: {
				en: "Artificial powders used",
				ar: "مسحوق مستخدم"
			}
		}
	];
	const getLiquidHeightPercent = () => {
		if (activeStep === 0) return 78;
		if (activeStep === 1) return 20;
		if (activeStep === 2) return 72;
		return 78;
	};
	const isBobaVisible = activeStep === 0 || activeStep >= 1;
	const isIceVisible = activeStep === 0 || activeStep >= 2;
	const isStrawDropped = activeStep === 0 || activeStep >= 3;
	const stepLabels = [
		{
			en: "Preview",
			ar: "الظهور"
		},
		{
			en: "1. Boba",
			ar: "1. البوبا"
		},
		{
			en: "2. Tea",
			ar: "2. الشاي"
		},
		{
			en: "3. Enjoy",
			ar: "3. الجاهزية"
		}
	];
	const goToStep = (idx) => {
		setIsAutoPlaying(false);
		setActiveStep(idx);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative bg-gradient-pastel min-h-screen max-w-full overflow-hidden flex items-center justify-center pt-24 sm:pt-28 pb-12 px-4 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabebuiaTree, {
				className: "hidden h-[520px] w-[400px] opacity-40 sm:block mix-blend-multiply pointer-events-none",
				style: {
					bottom: -40,
					insetInlineStart: -70
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabebuiaTree, {
				flip: true,
				className: "hidden sm:block h-[420px] w-[320px] opacity-30 mix-blend-multiply pointer-events-none",
				style: {
					bottom: -60,
					insetInlineEnd: -90
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Petals, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowerDeco, {
				className: "w-[220px] opacity-45 mix-blend-multiply pointer-events-none",
				style: {
					top: 80,
					insetInlineStart: -60
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start min-h-[340px] justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 15
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -15
								},
								transition: { duration: .3 },
								className: "flex flex-col items-start",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2 rounded-full border border-pink-deep/30 bg-card/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-wide text-plum shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-neon shrink-0" }), t(steps[activeStep].badge)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "mt-4 sm:mt-5 text-4xl sm:text-5xl lg:text-7xl leading-[1.25] sm:leading-[1.18] text-plum drop-shadow-sm font-display font-bold",
										children: [t(steps[activeStep].title), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-neon block mt-1 sm:mt-2 pb-2",
											children: t(steps[activeStep].highlight)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 sm:mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-plum/90 font-medium",
										children: t(steps[activeStep].desc)
									})
								]
							}, activeStep)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap items-center gap-2 sm:gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur-md p-1.5 border border-pink-deep/30 shadow-soft",
								children: steps.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => goToStep(idx),
									"aria-label": `Step ${idx + 1}`,
									className: `rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 ${activeStep === idx ? "bg-gradient-neon text-white shadow-glow scale-105" : "text-plum-soft hover:text-plum hover:bg-pink-soft/50"}`,
									children: t(stepLabels[idx])
								}, idx))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => goToStep(Math.max(0, activeStep - 1)),
									disabled: activeStep === 0,
									className: "rounded-full p-2 border border-pink-deep/30 bg-card text-plum disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-soft transition-colors shadow-sm",
									"aria-label": "Previous step",
									children: dir === "rtl" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => goToStep(Math.min(3, activeStep + 1)),
									disabled: activeStep === 3,
									className: "rounded-full p-2 border border-pink-deep/30 bg-card text-plum disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-soft transition-colors shadow-sm",
									"aria-label": "Next step",
									children: dir === "rtl" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#menu",
								className: "bg-gradient-neon inline-flex items-center justify-center rounded-full w-full sm:w-auto px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg hover:scale-105 active:scale-95",
								children: t({
									en: "Explore Full Menu",
									ar: "استعرض القائمة الكاملة"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#locations",
								className: "inline-flex items-center justify-center rounded-full w-full sm:w-auto border-2 border-pink-deep/30 bg-card/50 backdrop-blur px-8 py-4 text-base font-semibold text-plum transition-all duration-300 hover:bg-pink-soft hover:border-pink-deep",
								children: t({
									en: "Find Branch in Jeddah",
									ar: "فرع جدة"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 sm:mt-10 flex flex-wrap gap-6 sm:gap-10 border-t border-border/50 pt-5 w-full justify-between sm:justify-start",
							children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "font-display text-2xl sm:text-3xl text-plum",
									children: s.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs sm:text-sm font-medium text-plum-soft/80",
									children: t(s.label)
								})]
							}, s.value))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full flex flex-col justify-center items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => goToStep((activeStep + 1) % 4),
						className: "relative mx-auto h-[320px] w-[200px] sm:h-[380px] sm:w-[240px] drop-shadow-2xl cursor-pointer group",
						title: t({
							en: "Tap cup to brew next step!",
							ar: "انقر الكوب لتحضير الخطوة التالية!"
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: {
									y: isStrawDropped ? 0 : -350,
									rotate: isStrawDropped ? 12 : -15,
									opacity: isStrawDropped ? 1 : 0
								},
								transition: {
									type: "spring",
									stiffness: 100,
									damping: 15
								},
								style: { originY: 1 },
								className: "absolute -top-28 left-1/2 -translate-x-1/2 h-[125%] w-[24px] rounded-full bg-gradient-to-r from-lav-deep via-lav-soft to-lav-deep shadow-[inset_-3px_0_8px_rgba(0,0,0,0.4),2px_2px_10px_rgba(0,0,0,0.2)] z-10"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-x-2 -top-3 h-8 rounded-[50%] bg-white/60 shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.8)] border-b-2 border-white/80 backdrop-blur-md z-30 flex justify-center items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-2 rounded-full bg-plum/20" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-x-0 top-2 bottom-0 overflow-hidden rounded-b-[3.5rem] rounded-t-[1.5rem] border-4 border-white/70 bg-gradient-to-b from-white/30 to-white/10 shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.5),inset_10px_10px_20px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-md z-20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										animate: { height: `${getLiquidHeightPercent()}%` },
										transition: {
											type: "spring",
											stiffness: 70,
											damping: 16
										},
										className: "absolute inset-x-0 bottom-0 origin-bottom",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute -top-5 inset-x-0 h-7 w-[200%] animate-[wave-move_3s_linear_infinite] pointer-events-none",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													className: "w-full h-full",
													viewBox: "0 0 800 50",
													preserveAspectRatio: "none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "M0,25 C100,0 100,50 200,25 C300,0 300,50 400,25 C500,0 500,50 600,25 C700,0 700,50 800,25 L800,50 L0,50 Z",
														fill: "oklch(0.79 0.06 35)",
														opacity: "0.9"
													})
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-pink-deep/95 via-pink/80 to-lav/70 backdrop-blur-sm" }),
											isIceVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-2 left-4 w-9 h-9 rounded-xl bg-white/40 border border-white/60 backdrop-blur-sm animate-pulse transform rotate-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-4 right-5 w-8 h-8 rounded-xl bg-white/40 border border-white/60 backdrop-blur-sm animate-pulse transform -rotate-12" })] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-x-0 bottom-3 flex justify-center items-end h-[50%]",
										children: Array.from({ length: 28 }).map((_, i) => {
											const row = Math.floor(i / 6);
											const col = i % 6;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
												initial: false,
												animate: {
													y: isBobaVisible ? 0 : -320,
													opacity: isBobaVisible ? 1 : 0,
													scale: isBobaVisible ? 1 : .3
												},
												transition: {
													type: "spring",
													stiffness: 110,
													damping: 14,
													delay: i * .02 % .3
												},
												className: "absolute rounded-full shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.9),1px_1px_3px_rgba(0,0,0,0.5)]",
												style: {
													width: 22,
													height: 22,
													left: `calc(15% + ${col * 24}px + ${row % 2 * 10}px)`,
													bottom: row * 18 + 6,
													background: "radial-gradient(circle at 35% 35%, #5d4037 0%, #2c1e16 60%, #100b08 100%)"
												}
											}, i);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 p-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.18)] border-2 border-white backdrop-blur-md flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GotchaLogo, { className: "w-full h-full object-contain rounded-full" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-4 start-3 w-6 rounded-full bg-gradient-to-b from-white/70 to-transparent blur-[2px] opacity-80 z-20" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-12 end-4 w-3 rounded-full bg-gradient-to-b from-white/50 to-transparent blur-[1px] opacity-60 z-20" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-8 inset-x-6 h-6 rounded-[50%] bg-pink-deep/30 blur-xl opacity-70" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						onClick: () => goToStep((activeStep + 1) % 4),
						className: "relative mt-7 flex items-center gap-2.5 rounded-full border border-border bg-card/90 backdrop-blur-md px-5 py-2 text-xs font-bold text-plum shadow-glow-lg z-20 cursor-pointer hover:scale-105 transition-transform",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex h-2.5 w-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-neon" })]
						}), t({
							en: "Tap cup or scroll to brew",
							ar: "انقر الكوب أو مرّر للتحضير"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none opacity-80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.65rem] font-bold text-plum uppercase tracking-widest mb-1.5 font-display",
					children: t({
						en: "Scroll to Brew",
						ar: "مرّر للتحضير"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 text-plum animate-bounce" })]
			})
		]
	});
}
function useReveal() {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: .15 });
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return {
		ref,
		className: visible ? "reveal is-visible" : "reveal"
	};
}
function Story() {
	const { t } = useLang();
	const art = useReveal();
	const copy = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "story",
		className: "relative py-16 lg:py-24 overflow-hidden max-w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1180px] items-center gap-10 lg:gap-14 px-4 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: copy.ref,
				className: copy.className,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "badge-pastel shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-[#FF1493] shrink-0" }), t({
							en: "Our Story",
							ar: "قصتنا ورحلتنا"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl font-bold leading-snug sm:leading-tight text-plum sm:text-4xl lg:text-5xl font-display",
						children: t({
							en: "From a Melbourne Dream to Taiwan's Mountain Orchards",
							ar: "من فكرة في ملبورن إلى مزرعة شاي في تايوان"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-base sm:text-lg leading-relaxed text-plum/90 font-medium",
						children: t({
							en: "Born in Australia's cultural capital, Gotcha Fresh Tea was founded on a singular philosophy: tea is an artisan craft, never a shortcut. We cultivate our own tea leaves on high-altitude family estates in Taiwan, harvesting every flush at peak aroma and hand-steeping each batch fresh in-store daily.",
							ar: "بدأت قوتشا فريش تي في ملبورن، أستراليا، من فكرة بسيطة: الشاي يستحق أن يُعامل كحرفة أصيلة لا كحل سريع. كل كوب يبدأ رحلته من مزارعنا الخاصة في تايوان، حيث تُقطف الأوراق يدويًا في أوج نضجها وتُحضّر طازجة داخل المحل."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3.5 text-base sm:text-lg leading-relaxed text-plum/90 font-medium",
						children: t({
							en: "What began as a boutique tea house now blooms globally — welcoming you to our pastel sanctuary in Jeddah, where every sip carries pure aesthetic joy & uncompromising quality.",
							ar: "وما بدأ فكرة صغيرة أصبح اليوم يتفتّح في مدن حول العالم، وها هو يزهر هنا في جدة، حيث يحمل كل فرع دفء الباستيل الذي يميزنا."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [
							{
								icon: "🍃",
								label: {
									en: "Own farms in Taiwan",
									ar: "مزارعنا الخاصة في تايوان"
								}
							},
							{
								icon: "🫧",
								label: {
									en: "Handcrafted daily",
									ar: "تحضير يدوي طازج يومياً"
								}
							},
							{
								icon: "🌸",
								label: {
									en: "Pastel, chic interiors",
									ar: "أجواء باستيل راقية وأنيقة"
								}
							},
							{
								icon: "🇦🇺",
								label: {
									en: "Melbourne origin",
									ar: "أصل وتأسيس في ملبورن"
								}
							}
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2.5 rounded-full border border-pink-deep/30 bg-card px-4 py-2.5 text-sm font-bold text-plum shadow-soft transition-all duration-300 hover:scale-105 hover:border-neon hover:bg-pink-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base",
								"aria-hidden": "true",
								children: f.icon
							}), t(f.label)]
						}, f.icon))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: art.ref,
				className: `${art.className} relative h-[380px] sm:h-[440px] w-full overflow-hidden rounded-[2.5rem] border border-pink-deep/30 bg-gradient-to-br from-cream via-cream-2/90 to-pink-soft/40 p-6 shadow-glow-lg flex flex-col justify-between`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8),transparent_60%)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-16 -end-16 h-36 w-36 sm:h-56 sm:w-56 rounded-full bg-pink-deep/15 sm:bg-pink-deep/20 blur-2xl sm:blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-16 -start-16 h-36 w-36 sm:h-56 sm:w-56 rounded-full bg-lav-deep/15 sm:bg-lav-deep/20 blur-2xl sm:blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex items-center justify-between border-b border-pink-deep/15 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-4 w-4 text-[#FF1493]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-[#1A1A1A]",
								children: t({
									en: "Global Tea Journey",
									ar: "مسار الرحلة العالمية للشاي"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-white px-3 py-1 text-[0.75rem] font-bold text-[#1A1A1A] border border-pink-deep/25 shadow-sm",
							children: "Melbourne • Taiwan • Jeddah"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "absolute inset-0 h-full w-full pointer-events-none z-0",
						viewBox: "0 0 400 400",
						preserveAspectRatio: "none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
							d: "M 60 80 Q 200 150 200 200 T 340 340",
							fill: "none",
							stroke: "url(#route-gradient)",
							strokeWidth: "4",
							strokeDasharray: "8 8",
							initial: { strokeDashoffset: 100 },
							animate: { strokeDashoffset: 0 },
							transition: {
								repeat: Infinity,
								duration: 20,
								ease: "linear"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "route-gradient",
							x1: "0%",
							y1: "0%",
							x2: "100%",
							y2: "100%",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "#FF69B4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "50%",
									stopColor: "#FF1493"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "#C5A059"
								})
							]
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-10 h-full w-full",
						children: [
							{
								id: "melbourne",
								city: {
									en: "Melbourne",
									ar: "ملبورن"
								},
								subtitle: {
									en: "2013 · The Origin",
									ar: "2013 · انطلاقة الحرفة"
								},
								flag: "🇦🇺",
								pos: "top-[12%] start-[10%]",
								accent: "from-amber-400 to-orange-500"
							},
							{
								id: "taiwan",
								city: {
									en: "Taiwan",
									ar: "تايوان"
								},
								subtitle: {
									en: "1,200m · Tea Estates",
									ar: "1,200م · مزارع الشاي الجبلية"
								},
								flag: "🍃",
								pos: "top-[42%] start-[48%]",
								accent: "from-emerald-400 to-teal-500"
							},
							{
								id: "jeddah",
								city: {
									en: "Jeddah",
									ar: "جدة"
								},
								subtitle: {
									en: "Now Blooming",
									ar: "الفرع الحالي يزهر بك"
								},
								flag: "🇸🇦",
								pos: "bottom-[12%] end-[10%]",
								accent: "from-pink-500 to-neon"
							}
						].map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								scale: .8,
								opacity: 0
							},
							animate: {
								scale: 1,
								opacity: 1
							},
							transition: {
								type: "spring",
								stiffness: 100
							},
							className: `absolute ${loc.pos} flex items-center gap-2.5`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base",
									children: loc.flag
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "text-xs font-bold text-[#1A1A1A]",
										children: t(loc.city)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] font-semibold text-plum-soft",
										children: t(loc.subtitle)
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-4 w-4 rounded-full bg-gradient-to-r ${loc.accent} shadow-glow animate-pulse` })]
						}, loc.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex items-center justify-between border-t border-pink-deep/15 pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#1A1A1A] shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-[#FF1493]" }), t({
								en: "Direct From Farm To Cup",
								ar: "من المزرعة مباشرة إلى كوبك"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-[#FF1493] text-white px-3 py-1 text-xs font-bold shadow-sm",
							children: "🌱 Organic 100%"
						})]
					})
				]
			})]
		})
	});
}
var categories = [
	{
		id: "milk",
		label: {
			en: "Milk Tea",
			ar: "شاي الحليب"
		},
		icon: "./images/milk_tea.jpg"
	},
	{
		id: "pearl",
		label: {
			en: "Pearl Boba",
			ar: "بوبا اللؤلؤ"
		},
		icon: "./images/boba_pearl.jpg"
	},
	{
		id: "fruit",
		label: {
			en: "Fruit Tea",
			ar: "شاي الفواكه"
		},
		icon: "./images/fruit_tea.jpg"
	},
	{
		id: "collagen",
		label: {
			en: "Collagen Tea",
			ar: "كولاجين الشاي"
		},
		icon: "./images/collagen_tea.jpg"
	}
];
var menuItems = [
	{
		id: "classic-milk",
		category: "milk",
		name: {
			en: "Classic Milk Tea",
			ar: "شاي الحليب الكلاسيكي"
		},
		desc: {
			en: "Black tea brewed fresh daily with silky farm milk.",
			ar: "شاي أسود محضر طازجاً مع الحليب الحريري — المذاق الكلاسيكي الأصيل."
		},
		price: 22,
		icon: "🍵"
	},
	{
		id: "brown-sugar-milk",
		category: "milk",
		name: {
			en: "Brown Sugar Milk Tea",
			ar: "شاي الحليب بالسكر البني"
		},
		desc: {
			en: "Rich caramelised brown sugar swirls with fresh milk.",
			ar: "دوامات السكر البني المكرمل الغنية مع الحليب الصافي الطازج."
		},
		price: 26,
		icon: "🍯"
	},
	{
		id: "oolong-milk",
		category: "milk",
		name: {
			en: "Oolong Milk Tea",
			ar: "شاي الأولونغ بالحليب"
		},
		desc: {
			en: "Slow-roasted Formosa oolong leaves with silky milk.",
			ar: "أوراق أولونغ جبلية محمصة بعناية مع الحليب الناعم."
		},
		price: 24,
		icon: "🌿"
	},
	{
		id: "matcha-milk",
		category: "milk",
		name: {
			en: "Matcha Milk Tea",
			ar: "شاي الماتشا الياباني"
		},
		desc: {
			en: "Ceremonial-grade Japanese matcha whisked to order.",
			ar: "ماتشا يابانية فاخرة تُخفق طازجة مع الحليب الصافي."
		},
		price: 27,
		icon: "🍃"
	},
	{
		id: "classic-pearl",
		category: "pearl",
		name: {
			en: "Classic Pearl Milk Tea",
			ar: "شاي اللؤلؤ الكلاسيكي"
		},
		desc: {
			en: "Our signature — chewy tapioca pearls in rich milk tea.",
			ar: "المشروب الأيقوني — لؤلؤ تابيوكا طري في شاي الحليب الأسود."
		},
		price: 24,
		icon: "🧋"
	},
	{
		id: "brown-sugar-pearl",
		category: "pearl",
		name: {
			en: "Brown Sugar Pearl Delight",
			ar: "بوبا السكر البني الفاخرة"
		},
		desc: {
			en: "Warm hand-cooked pearls steeped in caramel syrup.",
			ar: "لؤلؤ دافئ مطهو ببطء في شراب السكر البني المكرمل."
		},
		price: 28,
		icon: "🫧",
		isNew: true
	},
	{
		id: "taro-pearl",
		category: "pearl",
		name: {
			en: "Taro Pearl Cream",
			ar: "كريم التارو باللؤلؤ"
		},
		desc: {
			en: "Creamy purple taro tea with soft tapioca pearls.",
			ar: "شاي التارو البنفسجي الكريمي المخفوق مع البوبا الطرية."
		},
		price: 27,
		icon: "💜"
	},
	{
		id: "coconut-pearl",
		category: "pearl",
		name: {
			en: "Tropical Coconut Pearl",
			ar: "بوبا جوز الهند الاستوائية"
		},
		desc: {
			en: "Pure coconut milk tea layered with chewy boba pearls.",
			ar: "حليب جوز الهند الاستوائي المنعش مع لؤلؤ التابيوكا."
		},
		price: 26,
		icon: "🥥"
	},
	{
		id: "passionfruit-green",
		category: "fruit",
		name: {
			en: "Passionfruit Green Tea",
			ar: "شاي أخضر بالباشن فروت"
		},
		desc: {
			en: "High-mountain jasmine green tea with tart passionfruit.",
			ar: "شاي ياسمين أخضر منعش مع نكهة الباشن فروت الحامضة."
		},
		price: 24,
		icon: "🍈"
	},
	{
		id: "strawberry-yakult",
		category: "fruit",
		name: {
			en: "Strawberry Yakult Elixir",
			ar: "إكسير الفراولة بالياكولت"
		},
		desc: {
			en: "Real crushed strawberries blended with probiotic Yakult.",
			ar: "قطع فراولة طازجة مهروسة مع مشروب الياكولت الصحي."
		},
		price: 27,
		icon: "🍓"
	},
	{
		id: "peach-oolong",
		category: "fruit",
		name: {
			en: "Peach Oolong Nectar",
			ar: "رحيق الخوخ بالأولونغ"
		},
		desc: {
			en: "Roasted oolong infused with sweet orchard peaches.",
			ar: "شاي أولونغ محمص منسجم مع عصارة الخوخ الطبيعية."
		},
		price: 25,
		icon: "🍑"
	},
	{
		id: "lychee-rose",
		category: "fruit",
		name: {
			en: "Lychee Rose Bloom",
			ar: "زهرة الليتشي والورد"
		},
		desc: {
			en: "Aromatic Damask rose & sweet iced lychee infusion.",
			ar: "خلاصة الورد العطري مع فاكهة الليتشي الحلوة المثلجة."
		},
		price: 26,
		icon: "🌹"
	},
	{
		id: "rose-collagen",
		category: "collagen",
		name: {
			en: "Rose Marine Collagen",
			ar: "كولاجين الورد البحري"
		},
		desc: {
			en: "Pure marine collagen peptides in rose oolong tea.",
			ar: "ببتيدات كولاجين بحري نقي ممزوج مع شاي أولونغ الورد."
		},
		price: 30,
		icon: "🌷",
		isNew: true
	},
	{
		id: "peach-collagen",
		category: "collagen",
		name: {
			en: "Peach Sparkle Collagen",
			ar: "فوران الخوخ بالكولاجين"
		},
		desc: {
			en: "Sparkling organic peach tea enriched with collagen.",
			ar: "شاي الخوخ الفوار المنعش المشرّب بالكولاجين المغربي."
		},
		price: 30,
		icon: "🍑",
		isNew: true
	},
	{
		id: "berry-collagen",
		category: "collagen",
		name: {
			en: "Wild Berry Collagen",
			ar: "كولاجين التوت البري"
		},
		desc: {
			en: "Crushed forest berries, green tea and collagen.",
			ar: "توت بري طازج مع شاي أخضر جبيلي وكولاجين نقي."
		},
		price: 32,
		icon: "🫐",
		isNew: true
	},
	{
		id: "pastel-glow-collagen",
		category: "collagen",
		name: {
			en: "Pastel Glow Signature",
			ar: "إكسير الباستيل بالكولاجين"
		},
		desc: {
			en: "Our flagship pink-lavender collagen beauty blend.",
			ar: "خلاصة الجمال الخاصة بنا — مزيج الكولاجين بالوردي واللافندر."
		},
		price: 32,
		icon: "✨",
		isNew: true
	}
];
var SUGARS = [
	0,
	30,
	50,
	70,
	100
];
var ICES = [
	{
		id: "no",
		label: {
			en: "No ice",
			ar: "بدون ثلج"
		}
	},
	{
		id: "less",
		label: {
			en: "Less ice",
			ar: "ثلج قليل"
		}
	},
	{
		id: "regular",
		label: {
			en: "Regular",
			ar: "عادي"
		}
	},
	{
		id: "extra",
		label: {
			en: "Extra ice",
			ar: "ثلج إضافي"
		}
	}
];
function OrderPanel({ item, onDone }) {
	const { t } = useLang();
	const { add } = useCart();
	const [size, setSize] = (0, import_react.useState)("regular");
	const [sugar, setSugar] = (0, import_react.useState)(50);
	const [ice, setIce] = (0, import_react.useState)("regular");
	const [toppings, setToppings] = (0, import_react.useState)([]);
	const [qty, setQty] = (0, import_react.useState)(1);
	const unit = item.price + SIZE_EXTRA[size] + toppingPrice(toppings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 space-y-4 rounded-2xl bg-cream-2 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold text-plum",
				children: t({
					en: "Size",
					ar: "الحجم"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: ["regular", "large"].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSize(s),
					className: `rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${size === s ? "bg-gradient-neon text-primary-foreground" : "border border-border bg-card text-plum-soft hover:text-plum"}`,
					children: s === "regular" ? t({
						en: "Regular",
						ar: "وسط"
					}) : `${t({
						en: "Large",
						ar: "كبير"
					})} +5`
				}, s))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold text-plum",
				children: t({
					en: "Sugar level",
					ar: "نسبة السكر"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: SUGARS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSugar(s),
					className: `rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${sugar === s ? "bg-gradient-neon text-primary-foreground" : "border border-border bg-card text-plum-soft hover:text-plum"}`,
					children: [s, "%"]
				}, s))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold text-plum",
				children: t({
					en: "Ice level",
					ar: "نسبة الثلج"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: ICES.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIce(i.id),
					className: `rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${ice === i.id ? "bg-gradient-neon text-primary-foreground" : "border border-border bg-card text-plum-soft hover:text-plum"}`,
					children: t(i.label)
				}, i.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold text-plum",
				children: t({
					en: "Toppings",
					ar: "الإضافات"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: TOPPINGS.map((top) => {
					const on = toppings.includes(top.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setToppings((prev) => on ? prev.filter((x) => x !== top.id) : [...prev, top.id]),
						className: `rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${on ? "bg-gradient-neon text-primary-foreground" : "border border-border bg-card text-plum-soft hover:text-plum"}`,
						children: [
							t(top.label),
							" +",
							top.price
						]
					}, top.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setQty((q) => Math.max(1, q - 1)),
							"aria-label": t({
								en: "Decrease",
								ar: "إنقاص"
							}),
							className: "rounded-full p-1 text-plum-soft hover:text-plum",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-5 text-center text-sm font-bold text-plum",
							children: qty
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setQty((q) => q + 1),
							"aria-label": t({
								en: "Increase",
								ar: "زيادة"
							}),
							className: "rounded-full p-1 text-plum-soft hover:text-plum",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						add(item, {
							size,
							sugar,
							ice,
							toppings,
							qty
						});
						onDone();
					},
					className: "bg-gradient-neon inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }),
						t({
							en: "Add",
							ar: "أضف"
						}),
						" · ",
						unit * qty,
						" ",
						t({
							en: "SAR",
							ar: "ر.س"
						})
					]
				})]
			})
		]
	});
}
function MenuCard({ item, index }) {
	const { t } = useLang();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "product-card animate-card-in group relative",
		style: { animationDelay: `${index * .08}s` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row items-start gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-soft/80 via-cream-2 to-lav-soft/60 p-2 shadow-inner border border-white/60 relative overflow-hidden group-hover:scale-105 transition-transform duration-300",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: categories.find((c) => c.id === item.category)?.icon || item.icon,
					alt: "",
					className: "w-full h-full object-cover rounded-xl",
					"aria-hidden": "true"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-base sm:text-lg font-bold text-plum font-display leading-snug flex items-center flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(item.name) }),
								item.isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "badge-pastel shadow-sm",
									children: ["✨ ", t({
										en: "NEW",
										ar: "جديد"
									})]
								}),
								item.popular && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "badge-pastel shadow-sm",
									children: ["🔥 ", t({
										en: "Best Seller",
										ar: "الأكثر مبيعاً"
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 bg-pink-soft/80 border border-pink-deep/30 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold text-plum shadow-sm",
							children: [
								item.price,
								" ",
								t({
									en: "SAR",
									ar: "ر.س"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs sm:text-sm leading-relaxed text-plum-soft font-medium",
						children: t(item.desc)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between border-t border-pink-deep/15 pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.7rem] font-bold uppercase tracking-wider text-plum-soft",
							children: "Gotcha Signature"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOpen((v) => !v),
							className: "bg-gradient-neon px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-glow hover:scale-105 active:scale-95 transition-all",
							children: open ? t({
								en: "Close Panel",
								ar: "إغلاق النافذة"
							}) : t({
								en: "Customise & Order",
								ar: "خصّص واطلب"
							})
						})]
					})
				]
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderPanel, {
			item,
			onDone: () => setOpen(false)
		})]
	});
}
function MenuSection() {
	const { t, dir } = useLang();
	const head = useReveal();
	const tabsReveal = useReveal();
	const [cat, setCat] = (0, import_react.useState)("milk");
	const [query, setQuery] = (0, import_react.useState)("");
	const tabsRef = (0, import_react.useRef)(null);
	const [indicator, setIndicator] = (0, import_react.useState)({
		width: 0,
		offset: 0
	});
	const position = () => {
		const container = tabsRef.current;
		if (!container) return;
		const active = container.querySelector("[data-active='true']");
		if (!active) return;
		const cRect = container.getBoundingClientRect();
		const aRect = active.getBoundingClientRect();
		const offset = dir === "rtl" ? cRect.right - aRect.right : aRect.left - cRect.left;
		setIndicator({
			width: aRect.width,
			offset
		});
	};
	(0, import_react.useEffect)(() => {
		position();
		const onResize = () => position();
		window.addEventListener("resize", onResize);
		const timer = window.setTimeout(position, 80);
		if (document.fonts?.ready) document.fonts.ready.then(position);
		return () => {
			window.removeEventListener("resize", onResize);
			window.clearTimeout(timer);
		};
	}, [cat, dir]);
	const items = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return menuItems.filter((i) => i.category === cat && (!q || i.name.en.toLowerCase().includes(q) || i.name.ar.includes(query.trim()) || i.desc.en.toLowerCase().includes(q)));
	}, [cat, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "menu",
		className: "relative bg-gradient-to-b from-cream to-pink-soft/60 py-16 lg:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1180px] px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: head.ref,
					className: `${head.className} mx-auto max-w-2xl text-center`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-[0.2em] text-ink",
							children: t({
								en: "Our Menu",
								ar: "قائمتنا"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl text-plum sm:text-4xl",
							children: t({
								en: "Something fresh for every mood",
								ar: "مشروب طازج يناسب كل مزاج"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-plum-soft",
							children: t({
								en: "Four signature families, all brewed fresh — never from powder.",
								ar: "أربع عائلات مشروبات مميزة، جميعها تُحضّر طازجة دون أي مسحوق."
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: tabsReveal.ref,
					className: `${tabsReveal.className} mt-10 flex flex-col items-center gap-4`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full max-w-full overflow-x-auto no-scrollbar pb-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: tabsRef,
							className: "relative flex w-max mx-auto justify-start gap-1 rounded-full border border-border bg-card p-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gradient-neon absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300",
								style: {
									width: indicator.width,
									insetInlineStart: indicator.offset,
									opacity: indicator.width ? 1 : 0
								},
								"aria-hidden": "true"
							}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"data-active": cat === c.id,
								onClick: () => setCat(c.id),
								className: `relative z-10 flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${cat === c.id ? "text-primary-foreground" : "text-plum-soft hover:text-plum"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.icon,
									alt: "",
									className: "w-5 h-5 rounded-full object-cover border border-white/20",
									"aria-hidden": "true"
								}), t(c.label)]
							}, c.id))]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative w-full max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute inset-y-0 start-4 my-auto h-4 w-4 text-plum-soft" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: t({
								en: "Search drinks...",
								ar: "ابحث عن مشروب..."
							}),
							className: "w-full rounded-full border border-border bg-card py-2.5 ps-11 pe-4 text-sm text-plum outline-none transition-colors placeholder:text-plum-soft focus:border-pink-deep"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-5 md:grid-cols-2",
					children: [items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuCard, {
						item,
						index: i
					}, item.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "col-span-full text-center text-plum-soft",
						children: t({
							en: "No drinks match your search.",
							ar: "لا توجد مشروبات مطابقة لبحثك."
						})
					})]
				}, cat)
			]
		})
	});
}
function Farms() {
	const { t } = useLang();
	const copy = useReveal();
	const art = useReveal();
	const stats = [
		{
			value: "1,200m",
			label: {
				en: "Average farm elevation",
				ar: "متوسط ارتفاع المزارع الجبلية"
			},
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountain, { className: "h-5 w-5 text-neon shrink-0" })
		},
		{
			value: "100%",
			label: {
				en: "Hand-picked leaves",
				ar: "قطف يدوي بالكامل ورقة بورقة"
			},
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-5 w-5 text-emerald-500 shrink-0" })
		},
		{
			value: "24h",
			label: {
				en: "Farm to store, fresh",
				ar: "من المزرعة للمحل خلال 24 ساعة"
			},
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-amber-500 shrink-0" })
		},
		{
			value: "0%",
			label: {
				en: "Powder or concentrate",
				ar: "مسحوق أو مركزات صناعية"
			},
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-pink-deep shrink-0" })
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "farms",
		className: "relative overflow-hidden py-16 lg:py-24 max-w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabebuiaTree, {
			className: "hidden h-[460px] w-[340px] opacity-25 lg:block",
			style: {
				top: -30,
				insetInlineEnd: -80
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1180px] items-center gap-10 lg:gap-14 px-4 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: copy.ref,
				className: copy.className,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "badge-pastel shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-3.5 w-3.5 text-[#FF1493] shrink-0" }), t({
							en: "Single-Origin Farming",
							ar: "مصدر نُقدّر عنايته"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl font-bold leading-snug sm:leading-tight text-plum sm:text-4xl lg:text-5xl font-display",
						children: t({
							en: "Pristine High-Altitude Taiwanese Tea Gardens",
							ar: "من مزارعنا الخاصة في تايوان"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-base sm:text-lg leading-relaxed text-plum/90 font-medium",
						children: t({
							en: "Nestled in the misty high mountain ridges of Taiwan, our leaves are cultivated at 1,200m elevation. Each bud is hand-harvested at peak bloom and rigorously inspected to ensure uncompromised purity. That is why Gotcha tea tastes genuinely fresh, botanical, and pure — never artificial.",
							ar: "في التلال الضبابية المرتفعة بتايوان، تُزرع أوراق شاينا على ارتفاعات مثالية (1,200 متر فوق سطح البحر)، وتُقطف يدويًا في أوج نضجها، وتُفحص ورقة تلو الأخرى قبل أن تصل إلى الكوب. لهذا السبب يبقى طعم شاينا حقيقي، طازج، وصافي."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid grid-cols-2 gap-3.5 sm:gap-4",
						children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group rounded-2xl border border-pink-deep/25 bg-card/90 p-4 sm:p-5 shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-glow hover:border-neon",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "font-display text-2xl sm:text-3xl text-plum group-hover:text-neon transition-colors",
									children: s.value
								}), s.icon]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs sm:text-sm font-bold text-plum/80 leading-snug block",
								children: t(s.label)
							})]
						}, s.value))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: art.ref,
				className: `${art.className} relative h-[360px] sm:h-[420px] w-full overflow-hidden rounded-[2.5rem] border border-pink-deep/30 bg-gradient-to-br from-emerald-950/20 via-pink-soft/40 to-lav-soft/60 p-6 shadow-glow-lg flex flex-col justify-between`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute top-4 end-4 sm:top-8 sm:end-8 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-amber-200/40 blur-lg sm:blur-xl flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-8 w-8 sm:h-12 sm:w-12 text-amber-400 opacity-60 animate-pulse" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-0 bottom-0 h-3/4 pointer-events-none opacity-80 z-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 500 300",
							preserveAspectRatio: "none",
							className: "w-full h-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0 300 L0 180 Q 120 100 250 190 T 500 120 L 500 300 Z",
									fill: "oklch(0.85 0.05 320)",
									opacity: "0.6"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0 300 L0 220 Q 180 120 350 240 T 500 180 L 500 300 Z",
									fill: "oklch(0.79 0.08 340)",
									opacity: "0.8"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0 300 L0 250 Q 150 180 300 270 T 500 220 L 500 300 Z",
									fill: "oklch(0.67 0.12 30)",
									opacity: "0.9"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-card/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-[#1A1A1A] shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-3.5 w-3.5 text-emerald-600" }), t({
								en: "Formosa Estate · Taiwan",
								ar: "مزارع فوروسا · تايوان"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-[#1A1A1A] text-white px-3.5 py-1 text-xs font-bold shadow-md",
							children: "1,200m Altitude"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 max-w-xs rounded-2xl border border-white/80 bg-card/90 backdrop-blur-md p-4 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "block text-sm font-bold text-[#1A1A1A] font-display",
							children: t({
								en: "Pure Botanical Integrity",
								ar: "نقاء وطزاجة من أصل الطبيعة"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs font-medium text-plum-soft",
							children: t({
								en: "Every leaf is sun-dried and slow-roasted by master tea artisans.",
								ar: "تُجفف أوراق الشاي شمسياً وتُحمّص ببطء بأيدي خبراء الشاي."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex items-center justify-between border-t border-white/50 pt-3 text-xs font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-white/95 px-3 py-1 text-[#1A1A1A] shadow-sm",
							children: ["🌱 ", t({
								en: "100% Single-Origin",
								ar: "100% شاي صافي"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-white/95 px-3 py-1 text-[#FF1493] shadow-sm",
							children: ["✨ ", t({
								en: "Hand-Picked Daily",
								ar: "قطف يدوي يومياً"
							})]
						})]
					})
				]
			})]
		})]
	});
}
var CARDS = [
	{
		imgSrc: "./images/gallery/peony_corner.jpg",
		label: {
			en: "Peony corner",
			ar: "ركن الفاوانيا"
		}
	},
	{
		imgSrc: "./images/gallery/rose_collagen.jpg",
		label: {
			en: "Rose collagen",
			ar: "كولاجين الورد"
		}
	},
	{
		imgSrc: "./images/gallery/pearl_pour.jpg",
		label: {
			en: "Pearl pour",
			ar: "سكب اللؤلؤ"
		}
	},
	{
		imgSrc: "./images/gallery/neon_evening.jpg",
		label: {
			en: "Neon evenings",
			ar: "أمسيات نيون"
		}
	},
	{
		imgSrc: "./images/gallery/fresh_pour.jpg",
		label: {
			en: "Fresh pour",
			ar: "تحضير طازج"
		}
	},
	{
		imgSrc: "./images/gallery/bloom_wall.jpg",
		label: {
			en: "Bloom wall",
			ar: "جدار الأزهار"
		}
	},
	{
		imgSrc: "./images/gallery/taro_delight.jpg",
		label: {
			en: "Taro delight",
			ar: "متعة القلقاس"
		}
	},
	{
		imgSrc: "./images/gallery/peach_oolong.jpg",
		label: {
			en: "Peach oolong",
			ar: "أولونغ الخوخ"
		}
	}
];
function Gallery() {
	const { t } = useLang();
	const head = useReveal();
	const grid = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "gallery",
		className: "bg-gradient-to-b from-lav-soft to-cream py-16 lg:py-24 overflow-hidden max-w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1180px] px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: head.ref,
				className: `${head.className} mx-auto max-w-2xl text-center`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-[0.2em] text-ink",
					children: t({
						en: "Pastel Moments",
						ar: "لحظات باستيل"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-2xl font-bold text-plum sm:text-4xl font-display",
					children: t({
						en: "Made for the feed, made for you",
						ar: "صُنعت لتُصوَّر، وصُنعت من أجلك"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: grid.ref,
				className: `${grid.className} mt-10 grid grid-cols-2 gap-4 md:grid-cols-4`,
				children: CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "group relative aspect-square overflow-hidden rounded-[1.5rem] shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: card.imgSrc,
							alt: t(card.label),
							loading: "lazy",
							className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-plum/90 via-plum/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "absolute inset-x-0 bottom-0 p-4 text-sm font-bold text-white z-10 drop-shadow-md translate-y-1 transition-transform duration-300 group-hover:translate-y-0",
							children: t(card.label)
						})
					]
				}, card.label.en))
			})]
		})
	});
}
function Rewards() {
	const { t } = useLang();
	const card = useReveal();
	const { user, setAuthOpen, redeemBlossom } = useAuth();
	const steps = [
		{
			n: "1",
			label: {
				en: "Scan your code at checkout",
				ar: "امسح رمزك عند الدفع"
			}
		},
		{
			n: "2",
			label: {
				en: "Collect 1 blossom per order",
				ar: "اجمع زهرة واحدة مع كل طلب"
			}
		},
		{
			n: "3",
			label: {
				en: "Redeem for a free drink",
				ar: "استبدلها بمشروب طازج مجاني"
			}
		}
	];
	const rewardsList = [
		{
			id: "r1",
			cost: 5,
			title: {
				en: "Free Topping Choice",
				ar: "إضافة مجانية من إختيارك"
			},
			icon: "🧋"
		},
		{
			id: "r2",
			cost: 10,
			title: {
				en: "Free Any Medium Fresh Tea",
				ar: "مشروب شاي طازج وسط مجاناً"
			},
			icon: "🍵"
		},
		{
			id: "r3",
			cost: 15,
			title: {
				en: "Free Signature Collagen Drink",
				ar: "مشروب الكولاجين الفاخر مجاناً"
			},
			icon: "✨"
		}
	];
	const currentBlossoms = user ? user.blossoms : 0;
	const targetBlossoms = 10;
	const progressPercent = Math.min(100, Math.round(currentBlossoms / targetBlossoms * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "rewards",
		className: "py-24 relative overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1180px] px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: card.ref,
				className: `${card.className} grid gap-10 rounded-[2.5rem] bg-plum p-8 shadow-soft md:grid-cols-2 md:p-14 border border-pink/20 relative overflow-hidden`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-20 -start-20 sm:-top-32 sm:-start-32 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-neon/15 sm:bg-neon/20 blur-2xl sm:blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-20 -end-20 sm:-bottom-32 sm:-end-32 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-pink-deep/15 sm:bg-pink-deep/20 blur-2xl sm:blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-pink/30 bg-pink/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-pink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), t({
									en: "Gotcha Loyalty Society",
									ar: "برنامج ولاء قوتشا فريش تي"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-3xl font-bold leading-snug text-cream md:text-4xl",
								children: t({
									en: "Every handcrafted sip earns you complimentary rewards",
									ar: "كل كوب يقربك خطوة من كوب طازج مجاني"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-pink-soft/90 text-sm md:text-base",
								children: t({
									en: "Authenticate effortlessly with Google or Apple. Collect blossoms automatically on every purchase and redeem complimentary signature teas!",
									ar: "سجّل دخولك بواسطة حساب جوجل أو أبل، واجمع الأزهار والنقاط تلقائياً مع كل طلب، واستبدلها بمشروبات مجانية وإضافات مميزة!"
								})
							}),
							user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-2xl border border-pink/30 bg-cream/10 p-5 backdrop-blur-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: user.avatar,
											alt: user.name,
											className: "h-11 w-11 rounded-full object-cover ring-2 ring-neon"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-base font-bold text-cream",
											children: user.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-pink-soft",
											children: [
												user.tier,
												" Member · ",
												user.points,
												" Points"
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-2xl font-black text-pink",
											children: ["🌸 ", user.blossoms]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.7rem] text-pink-soft/80",
											children: t({
												en: "Blossoms",
												ar: "أزهار الولاء"
											})
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs text-pink-soft mb-1.5 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t({
											en: "Progress to free drink",
											ar: "التقدم نحو الكوب المجاني"
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											user.blossoms,
											" / ",
											targetBlossoms,
											" 🌸"
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2.5 w-full overflow-hidden rounded-full bg-plum/60 p-0.5 border border-pink/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-gradient-neon transition-all duration-700 ease-out shadow-glow",
											style: { width: `${progressPercent}%` }
										})
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-7 flex flex-wrap items-center gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setAuthOpen(true),
									className: "bg-gradient-neon inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg active:scale-95",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }), t({
										en: "Sign in with Google / Apple",
										ar: "تسجيل الدخول لجوجل / أبل"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-3",
								children: steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 rounded-2xl border border-pink/15 bg-cream/5 p-3.5 transition-colors hover:bg-cream/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "bg-gradient-neon flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-base text-primary-foreground shadow-sm",
										children: s.n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs md:text-sm text-cream font-medium",
										children: t(s.label)
									})]
								}, s.n))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col justify-between rounded-2xl border border-pink/20 bg-cream/5 p-6 backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-pink/20 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "flex items-center gap-2 text-lg font-bold text-cream",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-5 w-5 text-pink" }), t({
									en: "Redeemable Rewards",
									ar: "قائمة المكافآت المتاحة"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-pink",
								children: user ? `${user.blossoms} 🌸` : t({
									en: "Sign in to redeem",
									ar: "سجل لاستبدالها"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 space-y-4",
							children: rewardsList.map((rw) => {
								const canAfford = user && user.blossoms >= rw.cost;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${canAfford ? "border-pink/50 bg-cream/15 shadow-glow" : "border-pink/10 bg-cream/5 opacity-85"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-12 w-12 items-center justify-center rounded-xl bg-pink/20 text-2xl",
											children: rw.icon
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm font-bold text-cream",
											children: t(rw.title)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-pink-soft",
											children: [
												rw.cost,
												" ",
												t({
													en: "Blossoms required",
													ar: "أزهار مطلوبة"
												})
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => redeemBlossom(rw.cost, t(rw.title)),
										className: `rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${canAfford ? "bg-gradient-neon text-primary-foreground shadow-glow hover:scale-105" : "border border-pink/30 text-pink-soft hover:bg-pink/10"}`,
										children: canAfford ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), t({
												en: "Redeem",
												ar: "استبدل الآن"
											})]
										}) : t({
											en: "Redeem",
											ar: "استبدال"
										})
									})]
								}, rw.id);
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-xl bg-pink/10 p-3.5 text-center text-xs text-pink-soft border border-pink/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-cream",
									children: ["💡 ", t({
										en: "Pro tip:",
										ar: "نصيحة:"
									})]
								}),
								" ",
								t({
									en: "Every WhatsApp order automatically credits points & blossoms to your active profile!",
									ar: "كل طلب عبر الواتساب يحسب النقاط والأزهار تلقائياً لحسابك المسجّل!"
								})
							]
						})]
					})
				]
			})
		})
	});
}
function Locations() {
	const { t } = useLang();
	const head = useReveal();
	const card = useReveal();
	const map = useReveal();
	const [isLocating, setIsLocating] = (0, import_react.useState)(false);
	const handleDetectLocation = () => {
		if (!navigator.geolocation) {
			toast.error(t({
				en: "Geolocation is not supported by your browser",
				ar: "متصفحك لا يدعم تحديد الموقع"
			}));
			return;
		}
		setIsLocating(true);
		toast.info(t({
			en: "Detecting your location...",
			ar: "جاري تحديد موقعك..."
		}));
		navigator.geolocation.getCurrentPosition((position) => {
			setIsLocating(false);
			const { latitude, longitude } = position.coords;
			const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=21.5657162,39.153269`;
			toast.success(t({
				en: "Location found! Opening directions...",
				ar: "تم تحديد الموقع! سيتم فتح المسار..."
			}));
			setTimeout(() => window.open(url, "_blank"), 1e3);
		}, (error) => {
			setIsLocating(false);
			toast.error(t({
				en: "Unable to retrieve your location",
				ar: "تعذر الحصول على موقعك الحالي"
			}));
		});
	};
	const rows = [
		{
			Icon: MapPin,
			title: {
				en: "Address",
				ar: "العنوان"
			},
			value: {
				en: "Jeddah, Makkah Region, Saudi Arabia",
				ar: "جدة، منطقة مكة المكرمة، المملكة العربية السعودية"
			}
		},
		{
			Icon: Clock,
			title: {
				en: "Hours",
				ar: "ساعات العمل"
			},
			value: {
				en: "Daily, 10:00 AM – 1:00 AM",
				ar: "يوميًا، من 10:00 صباحًا حتى 1:00 صباحًا"
			}
		},
		{
			Icon: Truck,
			title: {
				en: "Delivery",
				ar: "التوصيل"
			},
			value: {
				en: "Available via HungerStation & Jahez",
				ar: "متوفر عبر هنقرستيشن وجاهز"
			}
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "locations",
		className: "bg-cream-2 py-24 relative z-10 overflow-hidden max-w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1180px] px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: head.ref,
				className: `${head.className} mx-auto max-w-2xl text-center`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-[0.2em] text-ink",
					children: t({
						en: "Visit Us",
						ar: "زورونا"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl text-plum sm:text-4xl",
					children: t({
						en: "Our Jeddah branch",
						ar: "فرعنا في جدة"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: card.ref,
					className: `${card.className} rounded-[2rem] border border-border bg-card p-8 shadow-soft flex flex-col justify-between`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold text-plum",
						children: t({
							en: "Gotcha Fresh Tea — Jeddah",
							ar: "قوتشا فريش تي — جدة"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-5",
						children: rows.map(({ Icon, title, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "mt-0.5 h-5 w-5 shrink-0 text-ink",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-sm text-plum",
									children: t(title)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-plum-soft",
									children: t(value)
								})]
							})]
						}, title.en))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col sm:flex-row gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleDetectLocation,
							disabled: isLocating,
							className: "flex-1 flex items-center justify-center gap-2 rounded-full border border-pink-deep bg-pink-soft/30 px-6 py-3.5 text-sm font-semibold text-plum transition-all duration-300 hover:bg-pink-soft hover:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed",
							children: [isLocating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-plum border-t-transparent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-4 w-4" }), t({
								en: "Detect My Location",
								ar: "حدد موقعي للفرع"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://maps.app.goo.gl/5exbgHM7cp2edcAJ7",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "bg-gradient-neon flex-1 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg",
							children: t({
								en: "View on Map",
								ar: "عرض على الخريطة"
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: map.ref,
					className: `${map.className} min-h-[360px] overflow-hidden rounded-[2rem] border border-border shadow-soft`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: "https://www.google.com/maps?q=21.5657162,39.153269&z=16&output=embed",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade",
						title: t({
							en: "Gotcha Fresh Tea Jeddah Map",
							ar: "خريطة قوتشا فريش تي جدة"
						}),
						className: "h-full min-h-[360px] w-full border-0"
					})
				})]
			})]
		})
	});
}
var TESTIMONIALS = [
	{
		name: "سارة م.",
		enName: "Sarah M.",
		ar: "أفضل بوبا شاي في جدة بلا منازع! الكولاجين عندهم رائع جداً ولذيذ.",
		en: "Best boba tea in Jeddah hands down! Their collagen drinks are amazing.",
		rating: 5,
		tag: "مشروبات الكولاجين",
		initials: "س م",
		gradient: "from-pink-400 to-rose-500"
	},
	{
		name: "أحمد ك.",
		enName: "Ahmed K.",
		ar: "تغليف ممتاز وطعم فريش فعلاً. أنصح بشاي الفواكه الطازج.",
		en: "Excellent packaging and truly fresh taste. I highly recommend the fruit tea.",
		rating: 5,
		tag: "شاي الفواكه",
		initials: "أ ك",
		gradient: "from-amber-400 to-orange-500"
	},
	{
		name: "لينا ر.",
		enName: "Lina R.",
		ar: "المكان يجنن والمشروبات ولا أروع، الكوب نفسه يفتح النفس للأخير! 🌸",
		en: "The place is gorgeous and drinks are out of this world, even the cup is beautiful! 🌸",
		rating: 5,
		tag: "تجربة باستيل",
		initials: "ل ر",
		gradient: "from-purple-400 to-pink-500"
	},
	{
		name: "عمر ت.",
		enName: "Omar T.",
		ar: "خدمة سريعة وموظفين ودودين. البوبا طرية وسكرها متوازن للغاية.",
		en: "Fast service and friendly staff. The boba is soft and perfectly sweetened.",
		rating: 5,
		tag: "بوبا السكر البني",
		initials: "ع ت",
		gradient: "from-emerald-400 to-teal-500"
	},
	{
		name: "نورة ف.",
		enName: "Nora F.",
		ar: "إدماني الجديد! ماتشا مع لؤلؤ التابيوكا شيء خيالي وطبيعي.",
		en: "My new addiction! Matcha with tapioca pearls is unreal and authentic.",
		rating: 5,
		tag: "الماتشا اليابانية",
		initials: "ن ف",
		gradient: "from-lime-400 to-emerald-500"
	}
];
function Testimonials() {
	const { t, dir, lang } = useLang();
	const items = [
		...TESTIMONIALS,
		...TESTIMONIALS,
		...TESTIMONIALS
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "testimonials",
		className: "relative overflow-hidden bg-gradient-to-b from-cream via-cream-2/80 to-cream py-16 lg:py-24 border-y border-pink-deep/15 max-w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-y-0 start-0 z-20 w-16 sm:w-32 pointer-events-none ${dir === "rtl" ? "bg-gradient-to-l from-cream via-cream/90 to-transparent" : "bg-gradient-to-r from-cream via-cream/90 to-transparent"}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-y-0 end-0 z-20 w-16 sm:w-32 pointer-events-none ${dir === "rtl" ? "bg-gradient-to-r from-cream via-cream/90 to-transparent" : "bg-gradient-to-l from-cream via-cream/90 to-transparent"}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mb-10 sm:mb-12 max-w-xl text-center px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full border border-pink-deep/20 bg-pink-soft/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-neon shrink-0" }), t({
						en: "Community Reviews",
						ar: "آراء مجتمعنا وتجاربهم"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl sm:text-3xl lg:text-4xl font-bold text-plum font-display",
					children: t({
						en: "Loved by our community",
						ar: "محبوب من مجتمعنا في جدة"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative w-full overflow-hidden py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: dir === "rtl" ? "marquee-track-rtl" : "marquee-track-ltr",
					children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-3 w-[310px] sm:w-[340px] shrink-0 rounded-[2rem] border border-pink-deep/20 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow hover:border-neon/50 cursor-default flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 text-amber-400",
								children: Array.from({ length: item.rating }).map((_, starIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-amber-400" }, starIdx))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-pink-soft/70 px-2.5 py-0.5 text-[0.65rem] font-bold text-plum border border-pink-deep/15",
								children: item.tag
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm sm:text-base leading-relaxed text-plum/90 font-medium mb-5",
							children: [
								"\"",
								lang === "ar" ? item.ar : item.en,
								"\""
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 border-t border-pink-deep/10 pt-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-white font-bold text-xs shadow-sm`,
								children: item.initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "text-sm font-bold text-plum",
										children: lang === "ar" ? item.name : item.enName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500 shrink-0" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.65rem] font-semibold text-plum-soft",
									children: t({
										en: "Verified Customer · Jeddah",
										ar: "عميل موثّق · فرع جدة"
									})
								})]
							})]
						})]
					}, i))
				})
			})
		]
	});
}
var XIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 24 24",
	fill: "currentColor",
	className: "w-5 h-5",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
});
var TikTokIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 24 24",
	fill: "currentColor",
	className: "w-5 h-5",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.38-2.9 5.84-1.74 1.45-4.04 2.15-6.3 1.95-2.25-.19-4.38-1.27-5.83-3.03-1.46-1.75-2.09-4.11-1.77-6.38.31-2.28 1.63-4.35 3.51-5.63 1.88-1.29 4.26-1.69 6.44-1.11V12.7c-1.21-.36-2.55-.3-3.7.3-1.16.6-2.02 1.64-2.3 2.89-.28 1.25-.03 2.6.65 3.65.68 1.05 1.78 1.72 3.03 1.84 1.26.13 2.56-.25 3.53-1.02.97-.77 1.54-1.93 1.54-3.17V.02z" })
});
var InstagramIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 24 24",
	fill: "currentColor",
	className: "w-5 h-5",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" })
});
var WhatsAppIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 24 24",
	fill: "currentColor",
	className: "w-5 h-5",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.031 0h-.032C5.385 0 .015 5.37.015 11.984c0 2.656.852 5.132 2.33 7.155L.54 24l5.05-1.326c1.942 1.341 4.238 2.122 6.441 2.122 6.613 0 11.984-5.371 11.984-11.985C24.015 5.371 18.644 0 12.031 0zm0 22.614c-2.203 0-4.35-.591-6.22-1.696l-.447-.264-3.568.937.954-3.48-.29-.462c-1.218-1.936-1.859-4.183-1.859-6.49C.587 6.577 4.215 2.185 8.847 2.185c2.316 0 4.492.903 6.13 2.54 1.638 1.637 2.54 3.813 2.54 6.13 0 4.63-3.626 8.4-8.258 8.411v-.001h-.001-.001c-.004 0-.008 0-.012 0h-.015z" })
});
function Footer() {
	const { t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		id: "contact",
		className: "border-t border-border bg-cream pt-16 relative z-10 overflow-hidden max-w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1180px] gap-10 px-4 sm:px-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GotchaLogo, { className: "h-10 w-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-2xl font-bold text-plum",
							children: ["Gotcha ", t({
								en: "Fresh Tea",
								ar: "فريش تي"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-sm sm:text-base leading-relaxed font-medium text-plum/90",
						children: t({
							en: "Handcrafted fresh tea, born in Melbourne, grown on our own farms in Taiwan.",
							ar: "شاي طازج بلمسة يدوية، وُلد في ملبورن، وينمو في مزارعنا الخاصة بتايوان."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex gap-3",
						children: [
							{
								label: "WhatsApp",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, {})
							},
							{
								label: "X",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XIcon, {})
							},
							{
								label: "TikTok",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TikTokIcon, {})
							},
							{
								label: "Instagram",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramIcon, {})
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							"aria-label": s.label,
							className: "flex h-11 w-11 items-center justify-center rounded-full border border-pink-deep/30 bg-card text-plum shadow-soft transition-all duration-300 hover:bg-pink-soft hover:scale-110 hover:border-pink-deep hover:text-pink-deep hover:shadow-glow",
							children: s.icon
						}, s.label))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-bold uppercase tracking-[0.18em] text-ink",
					children: t({
						en: "Explore",
						ar: "استكشف"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2.5",
					children: [
						{
							href: "#story",
							label: {
								en: "Our Story",
								ar: "قصتنا"
							}
						},
						{
							href: "#menu",
							label: {
								en: "Menu",
								ar: "القائمة"
							}
						},
						{
							href: "#farms",
							label: {
								en: "Tea Farms",
								ar: "مزارعنا"
							}
						},
						{
							href: "#gallery",
							label: {
								en: "Gallery",
								ar: "لحظاتنا"
							}
						},
						{
							href: "#rewards",
							label: {
								en: "Rewards",
								ar: "المكافآت"
							}
						}
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "text-sm sm:text-base font-bold text-plum/80 transition-colors hover:text-neon",
						children: t(l.label)
					}) }, l.href))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-bold uppercase tracking-[0.18em] text-ink",
					children: t({
						en: "Get in Touch",
						ar: "تواصل معنا"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2.5 text-sm sm:text-base font-bold text-plum/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "hover:text-neon transition-colors",
						children: "hello@gotcha-jeddah.sa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t({
						en: "Jeddah, Saudi Arabia",
						ar: "جدة، المملكة العربية السعودية"
					}) })]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-12 flex max-w-[1180px] flex-col sm:flex-row items-center justify-between gap-4 border-t border-border px-4 sm:px-6 py-6 text-xs sm:text-sm font-semibold text-plum/80",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t({
				en: "© 2026 Gotcha Fresh Tea, Jeddah. All rights reserved.",
				ar: "© 2026 قوتشا فريش تي، جدة. جميع الحقوق محفوظة."
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-2 rounded-full border border-pink-deep/30 bg-gradient-to-r from-card via-cream-2 to-pink-soft/60 px-5 py-2 text-xs font-bold text-plum shadow-glow-sm transition-all duration-300 hover:scale-105 hover:border-neon hover:shadow-glow",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-neon animate-pulse" }),
					"تم تطوير هذا الموقع بواسطة ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-neon font-display",
						children: "abed"
					})
				]
			})]
		})]
	});
}
function CartDrawer() {
	const { t, lang } = useLang();
	const { lines, isOpen, setOpen, total, updateQty, remove, clear, count } = useCart();
	const { user, addPoints, setAuthOpen } = useAuth();
	const [orderType, setOrderType] = (0, import_react.useState)("pickup");
	const [name, setName] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	useAnimation();
	if (!isOpen) return null;
	const handleDragEnd = (e, info) => {
		if (info.offset.x > 100 || info.velocity.x > 500) setOpen(false);
	};
	const sugarIce = (sugar, ice) => `${t({
		en: "Sugar",
		ar: "سكر"
	})} ${sugar}% · ${t({
		en: "Ice",
		ar: "ثلج"
	})}: ${{
		no: t({
			en: "none",
			ar: "بدون"
		}),
		less: t({
			en: "less",
			ar: "قليل"
		}),
		regular: t({
			en: "regular",
			ar: "عادي"
		}),
		extra: t({
			en: "extra",
			ar: "إضافي"
		})
	}[ice]}`;
	const buildMessage = () => {
		const header = lang === "ar" ? `طلب جديد من موقع قوتشا فريش تي (${orderType === "pickup" ? "استلام من الفرع" : "توصيل"})` : `New Gotcha Fresh Tea order (${orderType === "pickup" ? "Pickup" : "Delivery"})`;
		const body = lines.map((l) => {
			const tops = l.toppings.map((id) => t(TOPPINGS.find((x) => x.id === id).label)).join(", ");
			return `• ${l.qty}x ${t(l.name)} — ${l.size === "large" ? t({
				en: "Large",
				ar: "كبير"
			}) : t({
				en: "Regular",
				ar: "وسط"
			})} — ${sugarIce(l.sugar, l.ice)}${tops ? ` — ${tops}` : ""} = ${l.qty * l.unitPrice} ${t({
				en: "SAR",
				ar: "ر.س"
			})}`;
		}).join("\n");
		const footer = `${t({
			en: "Total",
			ar: "الإجمالي"
		})}: ${total} ${t({
			en: "SAR",
			ar: "ر.س"
		})}`;
		const who = name || (user ? user.name : "");
		return `${header}\n\n${body}\n\n${footer}${who ? `\n${t({
			en: "Name",
			ar: "الاسم"
		})}: ${who}` : ""}${note ? `\n${t({
			en: "Notes",
			ar: "ملاحظات"
		})}: ${note}` : ""}`;
	};
	const handleCheckout = () => {
		if (user) {
			const earned = Math.round(total * 10);
			addPoints(earned, total);
		}
		const msg = encodeURIComponent(buildMessage());
		window.open(`https://wa.me/966500000000?text=${msg}`, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[60]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			"aria-label": t({
				en: "Close cart",
				ar: "إغلاق السلة"
			}),
			onClick: () => setOpen(false),
			className: "absolute inset-0 w-full cursor-default bg-plum/40 backdrop-blur-sm"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
			drag: "x",
			dragConstraints: {
				left: 0,
				right: 0
			},
			dragElastic: {
				left: 0,
				right: .8
			},
			onDragEnd: handleDragEnd,
			initial: { x: "100%" },
			animate: { x: 0 },
			exit: { x: "100%" },
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 200
			},
			className: "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card shadow-2xl touch-pan-y",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-lg font-bold text-plum",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5 text-ink" }),
							t({
								en: "Your order",
								ar: "طلبك"
							}),
							" (",
							count,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						"aria-label": t({
							en: "Close",
							ar: "إغلاق"
						}),
						className: "rounded-full p-2 text-plum-soft hover:bg-pink-soft hover:text-plum transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-3 overflow-y-auto px-6 py-4",
					children: [lines.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-12 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-4xl",
							children: "🧋"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-plum-soft font-medium",
							children: t({
								en: "Your cart is still empty 🌸",
								ar: "سلتك فارغة حتى الآن 🌸"
							})
						})]
					}), lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-cream-2 p-4 transition-all hover:border-pink-deep/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-semibold text-plum",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											className: "me-1.5",
											children: l.icon
										}), t(l.name)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-plum-soft",
										children: [
											l.size === "large" ? t({
												en: "Large",
												ar: "كبير"
											}) : t({
												en: "Regular",
												ar: "وسط"
											}),
											" ·",
											" ",
											sugarIce(l.sugar, l.ice)
										]
									}),
									l.toppings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-plum-soft",
										children: l.toppings.map((id) => t(TOPPINGS.find((x) => x.id === id).label)).join(" · ")
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => remove(l.key),
								"aria-label": t({
									en: "Remove",
									ar: "حذف"
								}),
								className: "rounded-full p-1.5 text-plum-soft hover:text-destructive transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => updateQty(l.key, -1),
										"aria-label": t({
											en: "Decrease",
											ar: "إنقاص"
										}),
										className: "rounded-full p-1 text-plum-soft hover:text-plum",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-5 text-center text-sm font-bold text-plum",
										children: l.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => updateQty(l.key, 1),
										"aria-label": t({
											en: "Increase",
											ar: "زيادة"
										}),
										className: "rounded-full p-1 text-plum-soft hover:text-plum",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-bold text-ink",
								children: [
									l.qty * l.unitPrice,
									" ",
									t({
										en: "SAR",
										ar: "ر.س"
									})
								]
							})]
						})]
					}, l.key))]
				}),
				lines.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "space-y-3 border-t border-border px-6 py-4 bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl bg-pink-soft/70 px-3.5 py-2 text-xs text-plum border border-pink-deep/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-neon" }), user ? t({
									en: `Earn +${total * 10} loyalty points`,
									ar: `ستكسب +${total * 10} نقطة ولاء`
								}) : t({
									en: "Sign in to earn loyalty points!",
									ar: "سجل الدخول لكسب نقاط الولاء!"
								})]
							}), !user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setAuthOpen(true),
								className: "font-bold underline text-plum hover:text-neon",
								children: t({
									en: "Login",
									ar: "دخول"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: ["pickup", "delivery"].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOrderType(o),
								className: `flex-1 rounded-full px-4 py-2 text-xs font-semibold transition-all ${orderType === o ? "bg-gradient-neon text-primary-foreground shadow-sm" : "border border-border text-plum-soft hover:text-plum"}`,
								children: o === "pickup" ? t({
									en: "Pickup",
									ar: "استلام من الفرع"
								}) : t({
									en: "Delivery",
									ar: "توصيل"
								})
							}, o))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: user ? user.name : t({
								en: "Your name",
								ar: "اسمك"
							}),
							className: "w-full rounded-2xl border border-border bg-cream-2 px-4 py-2.5 text-sm text-plum outline-none placeholder:text-plum-soft focus:border-pink-deep transition-colors"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: note,
							onChange: (e) => setNote(e.target.value),
							rows: 2,
							placeholder: t({
								en: "Notes (optional)",
								ar: "ملاحظات (اختياري)"
							}),
							className: "w-full resize-none rounded-2xl border border-border bg-cream-2 px-4 py-2.5 text-sm text-plum outline-none placeholder:text-plum-soft focus:border-pink-deep transition-colors"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm font-bold text-plum pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t({
								en: "Total",
								ar: "الإجمالي"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-ink text-base",
								children: [
									total,
									" ",
									t({
										en: "SAR",
										ar: "ر.س"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleCheckout,
							className: "bg-gradient-neon flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-95",
							children: t({
								en: "Confirm & Send order",
								ar: "تأكيد وإرسال الطلب"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: clear,
							className: "w-full rounded-full py-1.5 text-xs font-semibold text-plum-soft hover:text-plum transition-colors",
							children: t({
								en: "Clear cart",
								ar: "إفراغ السلة"
							})
						})
					]
				})
			]
		})]
	});
}
function FloatingActions() {
	const { t } = useLang();
	const { setOpen } = useCart();
	const [showTop, setShowTop] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShowTop(window.scrollY > 600);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-6 end-6 z-40 flex flex-col items-center gap-3",
		children: [showTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => window.scrollTo({
				top: 0,
				behavior: "smooth"
			}),
			"aria-label": t({
				en: "Back to top",
				ar: "العودة للأعلى"
			}),
			className: "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-plum shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen(true),
			"aria-label": t({
				en: "Quick Cart & Order",
				ar: "الطلب السريع"
			}),
			className: "bg-gradient-neon flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg active:scale-95 animate-pulse",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" })
		})]
	});
}
function MouseGlow() {
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	const cursorX = useSpring(0, {
		stiffness: 100,
		damping: 25,
		mass: .5
	});
	const cursorY = useSpring(0, {
		stiffness: 100,
		damping: 25,
		mass: .5
	});
	(0, import_react.useEffect)(() => {
		const moveCursor = (e) => {
			cursorX.set(e.clientX - 200);
			cursorY.set(e.clientY - 200);
			if (!isVisible) setIsVisible(true);
		};
		const handleMouseLeave = () => setIsVisible(false);
		const handleMouseEnter = () => setIsVisible(true);
		window.addEventListener("mousemove", moveCursor);
		document.addEventListener("mouseleave", handleMouseLeave);
		document.addEventListener("mouseenter", handleMouseEnter);
		return () => {
			window.removeEventListener("mousemove", moveCursor);
			document.removeEventListener("mouseleave", handleMouseLeave);
			document.removeEventListener("mouseenter", handleMouseEnter);
		};
	}, [
		cursorX,
		cursorY,
		isVisible
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		style: {
			translateX: cursorX,
			translateY: cursorY,
			opacity: isVisible ? 1 : 0
		},
		className: "hidden md:block pointer-events-none fixed inset-0 h-[400px] w-[400px] rounded-full bg-pink-soft/20 blur-[100px] mix-blend-screen transition-opacity duration-500 z-0"
	});
}
//#endregion
export { Testimonials as _, Farms as a, Gallery as c, LanguageProvider as d, Locations as f, Story as g, Rewards as h, CartProvider as i, Header as l, MouseGlow as m, AuthProvider as n, FloatingActions as o, MenuSection as p, CartDrawer as r, Footer as s, AuthModal as t, Hero as u };
