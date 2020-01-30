import Vue from 'vue'
import App from './App.vue'

import router from "@/router/router";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faUserPlus, faSignInAlt);

import Multiselect from 'vue-multiselect'
import 'trumbowyg/dist/ui/trumbowyg.css';
import VueTrumbowyg from 'vue-trumbowyg';
import VueFilterDateFormat from 'vue-filter-date-format';

Vue.use(VueFilterDateFormat);
Vue.use(VueTrumbowyg);
Vue.component('multiselect', Multiselect)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');