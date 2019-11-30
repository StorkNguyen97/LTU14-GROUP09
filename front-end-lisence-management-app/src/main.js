// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "core-js/es6/promise";
import "core-js/es6/string";
import "core-js/es7/array";
// import cssVars from 'css-vars-ponyfill'
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App";
import router from "./router";
import store from "./store/index";
import VeeValidate from "vee-validate";
import Toaster from "v-toaster";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

// Filters
import { formatDatetime } from "@/plugin/datetime";

// todo
// cssVars()

Vue.use(BootstrapVue);
Vue.use(VeeValidate, { fieldsBagName: "veeFields" });
Vue.use(Toaster, { timeout: 3000 });

// Filters
Vue.filter("formatDateTime", formatDatetime);

// Components
Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
});
