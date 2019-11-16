import axios from "@/plugins/axios";
import alert from "@/plugins/alert";
const KEYS_API = "/keys";

export default {
  namespaced: true,
  state: {
    keys: [],
    key: {}
  },
  actions: {
    fetchKeys({ commit, rootState }) {
      return axios
        .get(KEYS_API)
        .then(result => commit("setKeys", result))
        .catch(e => alert.error(e));
    }
  },
  mutations: {
    setKeys(state, keys) {
      state.keys = keys;
    }
  }
};
