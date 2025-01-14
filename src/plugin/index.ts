import type { App } from 'vue'
import installI18n from './i18n'
import installTable from './table'

export default (app: App) => {
  installI18n(app)
  installTable(app)
}
