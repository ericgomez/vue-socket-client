import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import "./plugins/vue-resource";
import "./plugins/vuelidate";

Vue.config.productionTip = false;

// Create a EventBus Global
Vue.prototype.$rootBus = new Vue;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
