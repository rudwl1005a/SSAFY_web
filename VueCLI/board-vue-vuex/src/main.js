import Vue from 'vue'
import App from './App.vue'
import router from './routers/routers.js'

Vue.config.productionTip = false

// bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
