# 🧋 Gotcha Fresh Tea — Jeddah | قوتشا فريش تي جدة

> **Handcrafted Fresh Tea, Boba & Collagen Drinks — Melbourne Born, Taiwan Grown, Now Blooming in Jeddah 🇸🇦**

![Gotcha Fresh Tea](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4095c8bd-047b-4b35-8520-398e5c69132e/id-preview-5017517c--9e4d8328-f827-4211-97f1-06cc8cef075b.lovable.app-1785167902806.png)

---

## 🌟 Overview / نظرة عامة

Welcome to the official repository of **Gotcha Fresh Tea Jeddah**. This platform is a state-of-the-art web application designed with a modern **Gen-Z & K-Pop Brand System**, featuring real-time 3D cup brewing animations, full Arabic (RTL) & English (LTR) internationalization, infinite marquee testimonials, and an interactive loyalty rewards system.

مرحباً بك في المستودع الرسمي لموقع **قوتشا فريش تي - جدة**. منصة رقمية فائقة التطور مصممة بنظام هوية عصرية شبابية (Gen-Z & K-Pop Aesthetic)، تتميز بمحاكي تحضير الكوب التفاعلي ثلاثي الأبعاد، دعم كامل للغتين العربية والإنجليزية، شريط تقييمات تفاعلي غير متناهٍ، ونظام ولاء ومكافآت متكامل.

---

## 🎨 Brand Guidelines & Color System | الهوية البصرية والألوان

The project strictly adheres to the official **Gotcha Fresh Tea Brand Identity**:

| Token Name | HEX Code | Visual Preview | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Pink** | `#FF69B4` | `██████` | Core brand identity & vibrant accents |
| **Pastel Pink** | `#FFD1DC` | `██████` | Soft card backgrounds & badges |
| **Neon Pink** | `#FF1493` | `██████` | Glowing buttons & active hover states |
| **Neutral Dark** | `#1A1A1A` | `██████` | High-contrast body typography & titles |
| **Milk Swirl** | `#FFF0F5` | `██████` | Background milk swirl gradient transitions |

---

## 🚀 Key Features | الميزات الرئيسية

- **🧋 Interactive Boba Brewing Cup:** Real-time visual cup simulator with animated tapioca boba pearls, tea liquid physics, floating ice, and the official 3D HD Gotcha logo emblem.
- **🌐 Full i18n Support (RTL & LTR):** Seamless instant switching between Arabic (Cairo & Tajawal typography) and English (Poppins & Inter typography) with auto-reversing side fade gradients.
- **⭐ Infinite Continuous Marquee:** Customer testimonials carousel with auto-pause on hover/touch and smooth directional scrolling (`marquee-track-rtl` & `marquee-track-ltr`).
- **🍃 High-Altitude Tea Story & Farms:** Immersive showcase of 1,200m elevation Taiwanese mountain tea gardens and the global journey from Melbourne to Jeddah.
- **🎁 Loyalty & Rewards Society:** Interactive user dashboard tracking blossoms, points, tiers, and instant WhatsApp order integration.
- **📱 100% Mobile & Touch Optimized:** Zero horizontal scroll bleed, hardware-accelerated ambient backlight system, and high-DPI crisp rendering across all screen sizes.

---

## 🛠️ Tech Stack | التقنيات المستخدمة

- **Framework:** [TanStack Start](https://tanstack.com/router) + [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode, 0 Errors)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + Custom OKLCH / Brand Color Tokens
- **Animations:** [Framer Motion](https://www.framer.com/motion/) + CSS Keyframe Animations
- **Icons & Typography:** [Lucide React](https://lucide.dev/), Google Fonts (Cairo, Tajawal, Poppins, Inter)

---

## 💻 Local Development | التشغيل المحلي

### Prerequisites
Make sure you have **Node.js (v18+)** and **npm** or **bun** installed.

```bash
# 1. Clone the repository
git clone https://github.com/abod6911/gotcha-fresh-tea-jeddah.git

# 2. Navigate to project directory
cd gotcha-fresh-tea-jeddah

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

The app will be running at `http://localhost:3000`.

---

## 📂 Project Structure | هيكلة المشروع

```
src/
├── components/
│   ├── site/
│   │   ├── auth-modal.tsx       # Loyalty & auth modal
│   │   ├── cart-drawer.tsx      # Slide-over shopping cart
│   │   ├── decor.tsx            # Decorative Tabebuia trees & petals
│   │   ├── farms.tsx            # Taiwan high-altitude farms card
│   │   ├── footer.tsx           # Brand footer & social links
│   │   ├── gallery.tsx          # Visual Instagram moments gallery
│   │   ├── header.tsx           # Glassmorphic floating nav pill
│   │   ├── hero.tsx             # Interactive 3D boba cup & brewing steps
│   │   ├── locations.tsx        # Jeddah branch map & geolocation
│   │   ├── logo.tsx             # Official crisp HD Gotcha emblem logo
│   │   ├── menu-section.tsx     # Filterable drinks menu & customizer
│   │   ├── rewards.tsx          # Loyalty society & blossom rewards
│   │   ├── story.tsx            # Global tea journey (Melbourne -> Taiwan -> Jeddah)
│   │   └── testimonials.tsx     # Infinite continuous marquee testimonials
│   └── ui/                      # Shared design system components
├── hooks/                        # Custom React hooks (scroll reveal, etc.)
├── lib/                          # Core state (i18n, cart, auth, error reporting)
├── routes/                       # TanStack router page routes
└── styles.css                    # Design system, CSS variables & keyframe animations
```

---

## 📄 License & Attribution

Designed & Developed for **Gotcha Fresh Tea Jeddah**. All rights reserved.
