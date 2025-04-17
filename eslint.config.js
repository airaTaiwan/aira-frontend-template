import antfu from '@antfu/eslint-config'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'vue/no-mutating-props': 'off',
      'style/type-generic-spacing': 'off',
    },
  },
).append(
  vueI18n.configs.recommended,
  {
    settings: {
      'vue-i18n': {
        localeDir: 'locales/*.json',
      },
    },
    rules: {
      '@intlify/vue-i18n/no-missing-keys': 'error',
      '@intlify/vue-i18n/no-raw-text': 'off',
      '@intlify/vue-i18n/no-deprecated-modulo-syntax': 'off',
      '@intlify/vue-i18n/key-format-style': 'error',
      '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'error',
    },
  },
)
