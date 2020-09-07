import Vue from 'vue'
import App from './App.vue'

// Import utilities functions
import './utils'

//Vue Jalali Moment
import moment from 'vue-jalali-moment'
Vue.use(moment)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
