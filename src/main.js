import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import axios from 'axios';
import './main.scss';

Vue.config.productionTip = false
Vue.use(VModal, axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
