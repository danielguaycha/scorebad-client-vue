import Vue from 'vue'
import App from './App.vue'
import routing from './modules/routing'
import './core/plugins/axios'
import store from './modules/store'
import moment from  'vue-moment';

Vue.use(moment);
Vue.config.productionTip = false;

new Vue({
  router: routing,
  store,
  render: h => h(App)
}).$mount('#app')
