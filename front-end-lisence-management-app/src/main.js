import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from "./store/index";
import BootstrapVue from 'bootstrap-vue';

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

// Filters
import { formatDatetime } from './utils/datetime';

Vue.use(PaperDashboard);
Vue.use(BootstrapVue);

Vue.filter('formatDateTime', formatDatetime);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
