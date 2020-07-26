import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import PersianCalendarModule from './PersianCalendarModule'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    PersianCalendarModule
  }
})
