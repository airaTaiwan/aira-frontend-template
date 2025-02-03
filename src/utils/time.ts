import { format } from 'date-fns'
import * as localeData from 'date-fns/locale'
import { cacheLanguage } from '~/plugin/i18n'

const { zhTW, enUS, es, fr, ja, th } = localeData

const locales = {
  zh: zhTW,
  en: enUS,
  es,
  fr,
  jp: ja,
  th,
}

export type SupportedLocale = keyof typeof locales

export function localFormat(date: Date | string, formatStr: string) {
  return format(date, formatStr, { locale: locales[cacheLanguage.value as SupportedLocale] })
}
