# 🏪 Store Admin Dashboard (Frontend Showcase)

> ## ⚠️ IMPORTANT ASSIGNMENT NOTICE
> **PLEASE NOTE:** This current deployment represents the **Frontend UI & TypeScript architecture only**. It has been deployed at this stage to fulfill my current assignment requirements, showcasing advanced client-side state handling, dynamic UI rendering, and strict type safety. 
> 
> **Current Status:** I am actively working on the Backend infrastructure. The full-stack integration (database, API endpoints, and server authentication) will be fully completed and merged in the next phase of development.

---

A modern, highly responsive, and beautifully animated **Frontend Prototype** for an E-commerce & Shop Management Dashboard. Built using **Next.js** (App Router), **Tailwind CSS**, **TypeScript**, and optimized **Shadcn UI** component patterns.

This codebase serves as a pure user interface implementation, demonstrating advanced state handling, responsive grid layouts, data filtering, and interactive UI states for modern store management.

---

## ✨ Main Frontend Modules

- **📊 Interactive Analytics:** Pure Tailwind CSS animated revenue graphs, traffic source distribution bars, and high-fidelity tabular data for product metrics.
- **👥 Access & Role Management:** Dynamic role modification (`Admin`, `Manager`, etc.), simulated member invitations, and deletion guards using custom modal overlay flows.
- **🛍️ Customer Base Engine:** Client-side dynamic state controls featuring live status filtering (`Active`, `Blocked`), quick search functionality, and grid-to-list view toggles.
- **⚙️ Configurable Store Forms:** State-driven business hour matrices, input control validation for custom notifications, and live shop availability state switchers.
- **💳 Billing & Plan Views:** Pixel-perfect subscription status cards, local promotional token application simulations, and interactive invoice download layouts.
- **🎬 Viewport Motion Wrappers:** Fully integrated with a global viewport `<AnimationContainer />` component powered by customized Tailwind keyframes.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (App Router - Client-Side State Driven)
- **Styling:** Tailwind CSS (Utility-First)
- **UI Components:** Shadcn UI Ecosystem (Optimized & Self-contained)
- **Icons:** Lucide React
- **Language:** TypeScript (`.tsx`)

---

## 📂 Frontend Directory Map

The visual layer relies entirely on modular UI blocks arranged below:

```text
components/
├── shared/
│   ├── animationContainer/
│   └── container/
└── ui/
    ├── alert-dialog.tsx
    ├── badge.tsx
    ├── breadcrumb.tsx
    ├── button.tsx
    ├── card.tsx
    ├── dropdown-menu.tsx
    ├── input.tsx
    ├── label.tsx
    ├── table.tsx
    └── ... (ready-to-use frontend primitives)