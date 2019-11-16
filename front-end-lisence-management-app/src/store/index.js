import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import license from "./modules/license";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    license
  }
});
