import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import key from "./modules/key";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    key
  }
});
