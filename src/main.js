import Vue from 'vue'
import App from './App.vue'

import './assets/style.scss'

import feather from 'vue-icon'
Vue.use(feather, 'v-icon')

//Vue Jalali Moment
import moment from 'vue-jalali-moment'
Vue.use(moment)

new Vue({
  render: h => h(App)
}).$mount('#app')
