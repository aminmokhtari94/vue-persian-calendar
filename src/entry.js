// Import vue component
import component from './PersianCalendar.vue'

// Import Store Module
import PersianCalendarModule from './store/PersianCalendarModule'

// Declare install function executed by Vue.use()
export function install (Vue, options = {}) {
  if (install.installed) return
  install.installed = true

  Vue.component('PersianCalendar', component)

  // if (!options.store) console.error('[Persian Calendar Error] Please provide a store!!')
  options.store.registerModule('persianCalendar', PersianCalendarModule)
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default component
