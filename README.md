[![License][license-src]][license-href]

<p align='center'>
  <img src='https://raw.githubusercontent.com/airaTaiwan/aira-frontend-template/refs/heads/main/public/favicon.ico' alt='AIRA Logo' width='600'/>
</p>

<h5 align='center'>
<b>AIRA 前端專案模板</b>
</h5>

<br>

## 特徵

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - 就是快！

- 🗂 [基於檔案的路由](./src/pages)

- 📦 [组件自動化加載](./src/components)

- 🍍 [使用 Pinia 的狀態管理](https://pinia.vuejs.org)

- 📑 [布局系統](./src/layouts)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - 高性能且極具靈活性的即時原子化 CSS 引擎。

- 😃 [各種圖標集為你所用](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🌍 [I18n 國際化開箱即用](./locales)

- 🛸 [ky](https://github.com/sindresorhus/ky) - 輕量級 HTTP 客戶端

- 📅 [date-fns](https://github.com/date-fns/date-fns) - 日期處理函數庫

- 🦾 TypeScript, 當然

<br>

## 預設配置

### UI 框架

- [UnoCSS](https://github.com/antfu/unocss) - 高性能且極具靈活性的即時原子化 CSS 引擎。
- [CoreUI](https://coreui.io/) - AIRA 產品御用 UI 框架

### Icons

- [Iconify](https://iconify.design) - 使用任意的圖標集，瀏覽 [🔍Icônes](https://icones.netlify.app/)
- [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### 插件

- [Vue Router](https://github.com/vuejs/vue-router)
  - [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) - 以文件系統為基礎的路由
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - 頁面佈局系統
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 等，無需導入
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - 自動加載組件
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - 國際化
  - [`unplugin-vue-i18n`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n) - Vue I18n 的 Vite 插件
- [VueUse](https://github.com/antfu/vueuse) - 實用的 Composition API 工具合集

### 代碼風格

- 使用 Composition API 的 [`<script setup>` SFC 語法](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) 配置為 [@antfu/eslint-config](https://github.com/antfu/eslint-config), 單引號, 無分號.

### GitHub 模板

[使用這個模板創建倉庫.](https://github.com/airaTaiwan/aira-frontend-template/generate).

### 克隆到本地

請使用這種方式來建立專案，這樣可以保留更乾淨的 git 歷史紀錄

```bash
npx degit airaTaiwan/aira-frontend-template airaApp
cd airaApp
pnpm i # 如果你沒裝過 pnpm, 可以先運行: npm install -g pnpm
```

### 授權

此模板改至 [vitesse-lite](https://github.com/antfu-collective/vitesse-lite) 模板

[MIT](./LICENSE) License © 2024-PRESENT [airaTaiwan](https://github.com/airaTaiwan)

<!-- Badges -->

[license-src]: https://img.shields.io/github/license/airaTaiwan/aira-frontend-template.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/airaTaiwan/aira-frontend-template/blob/main/LICENSE
