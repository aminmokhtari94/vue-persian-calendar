import Vue from 'vue'
import App from './App.vue'

import feather from 'vue-icon'
Vue.use(feather, 'v-icon')

import store from './store'

//Vue Jalali Moment
import moment from 'vue-jalali-moment'
Vue.use(moment)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
