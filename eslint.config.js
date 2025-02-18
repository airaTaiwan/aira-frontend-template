import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'vue/no-mutating-props': 'off',
    },
  },
)
