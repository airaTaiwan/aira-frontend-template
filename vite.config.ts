import path from 'node:path'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Vue from '@vitejs/plugin-vue'
import VueComplexTypes from '@vue.ts/complex-types/vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}`,
      '~@coreui': `${path.resolve(__dirname, 'node_modules/@coreui/coreui-pro')}`,
    },
  },
  plugins: [
    VueComplexTypes(),
    Vue(),

    // https://github.com/posva/unplugin-vue-router
    VueRouter(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-i18n', '@vueuse/core', VueRouterAutoImports, {
        // add any other imports you were relying on
        'vue-router/auto': ['useLink'],
      }],
      dts: true,
      dirs: [
        'src/composables',
        'src/stores',
        'src/queries',
        'src/utils',
        'src/api',
        'src/constants',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dirs: ['src/components', 'src/atomic'],
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [`${path.resolve(__dirname, 'src/plugins/i18n/**')}`],
    }),
  ],
  build: {
    target: 'esnext',
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10).replace(/-/g, '')),
  },
})
