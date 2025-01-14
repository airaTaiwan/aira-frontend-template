import type { App } from 'vue'

import { VxeButton, VxeCheckbox, VxeIcon, VxeLoading, VxeRadio, VxeSwitch, VxeUI } from 'vxe-pc-ui'
import { VxeColgroup, VxeColumn, VxeGrid, VxeToolbar } from 'vxe-table'

import zhTW from 'vxe-table/lib/locale/lang/zh-TW'

import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'

function lazyVxeUI(app: App) {
  app.use(VxeButton)
  app.use(VxeCheckbox)
  app.use(VxeIcon)
  app.use(VxeLoading)
  app.use(VxeRadio)
  app.use(VxeSwitch)
}

function lazyVxeTable(app: App) {
  app.use(VxeColumn)
  app.use(VxeColgroup)
  app.use(VxeGrid)
  app.use(VxeToolbar)
}

export default (app: App) => {
  VxeUI.setTheme('light')
  VxeUI.setI18n('zh-TW', zhTW)
  VxeUI.setLanguage('zh-TW')

  app.use(lazyVxeUI).use(lazyVxeTable)
}
