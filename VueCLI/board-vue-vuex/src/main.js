import Vue from 'vue'
import App from './App.vue'
import router from './routers/routers.js'
import store from './store/store.js'

Vue.config.productionTip = false

// bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
