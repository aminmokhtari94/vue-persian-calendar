import Vue from 'vue'
import App from './App.vue'

//Vue Jalali Moment
import moment from 'vue-jalali-moment'
Vue.use(moment)

new Vue({
  render: h => h(App)
}).$mount('#app')
