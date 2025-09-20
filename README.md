# BCA Admin Dashboard & Supabase Learning Hub

This repository contains two main projects:

## 1. BCA Admin Dashboard (Main Project)
A React + TypeScript admin dashboard for managing BCA (Billiard Congress of America) leagues, featuring:
- Season management
- Team and player administration
- Schedule management
- Firebase integration
- Real-time data updates

**Tech Stack:** React, TypeScript, Vite, Firebase, React Query

## 2. Supabase Learning Hub
A dedicated learning environment for exploring Supabase features and building practice projects.

**Location:** `/supabase-learning-hub/`

### Quick Start for Supabase Learning
```bash
cd supabase-learning-hub
npm install
# Follow the setup guide in supabase-learning-hub/README.md
```

---

## BCA Dashboard - Original README

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
