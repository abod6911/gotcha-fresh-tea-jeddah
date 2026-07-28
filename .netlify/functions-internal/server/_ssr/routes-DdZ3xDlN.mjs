import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { _ as Testimonials, a as Farms, c as Gallery, d as LanguageProvider, f as Locations, g as Story, h as Rewards, i as CartProvider, l as Header, m as MouseGlow, n as AuthProvider, o as FloatingActions, p as MenuSection, r as CartDrawer, s as Footer, t as AuthModal, u as Hero } from "./mouse-glow-C5cRHSqo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DdZ3xDlN.js
var import_jsx_runtime = require_jsx_runtime();
function IndexPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MouseGlow, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative w-full max-w-full overflow-x-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Farms, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rewards, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locations, {})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingActions, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			richColors: true
		})
	] }) }) });
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndexPage, {});
}
//#endregion
export { IndexPage, Index as component };
