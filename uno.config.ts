import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  shortcuts: [
    {
      'color-base': 'dark:text-#ffffff text-#222222',

      'bg-ctrl-primary': 'bg-[linear-gradient(180deg,#4FADDF_0%,#3186B4_44.79%,#2475A0_47.4%,#3186B4_100%)]',
      'bg-ctrl-primary-hover':
        '@hover:bg-[radial-gradient(50%_31.25%_at_50%_100%,_rgba(255,255,255,0.50)_0%,_rgba(255,255,255,0.00)_100%),linear-gradient(180deg,#4FADDF_0%,#3186B4_44.79%,#2475A0_47.4%,#3186B4_100%)]',

      'scroll-bar': 'scrollbar-thumb-color-[#808080] scrollbar-track-color-transparent scrollbar-thumb-radius-4 scrollbar-track-radius-4',

      // ref: https://github.com/unocss/unocss/issues/2614
      'break-anywhere': '[@supports(overflow-wrap:anywhere)]:[overflow-wrap:anywhere] [@supports(overflow-wrap:anywhere)]:[word-break:normal]',
    },
  ],
  theme: {
    colors: {
      primary: '#6CBBFF',
      accent: '#7A7A7A',
      head: '#1E1E1E',
    },
  },
  rules: [
    [/^h-(\d+)dvh$/, ([_, d]) => [
      ['height', `${d}vh`],
      ['height', `${d}dvh`],
    ]],
    [/^max-h-(\d+)dvh$/, ([_, d]) => [
      ['max-height', `${d}vh`],
      ['max-height', `${d}dvh`],
    ]],
    [/^min-h-(\d+)dvh$/, ([_, d]) => [
      ['min-height', `${d}vh`],
      ['min-height', `${d}dvh`],
    ]],
  ],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Noto Sans TC',
        roboto: 'Roboto',
      },
    }),
    presetScrollbar(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
