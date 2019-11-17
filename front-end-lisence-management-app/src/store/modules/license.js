import axios from "@/plugins/axios";
import alert from "@/plugins/alert";
const LICENSE_API = "/licenses";

export default {
  namespaced: true,
  state: {
    items: [],
    item: {}
  },
  actions: {
    fetchItems({ commit, rootState }) {
      return axios
        .get(LICENSE_API)
        .then(result => commit("setItems", result))
        .catch(e => alert.error(e));
    }
  },
  mutations: {
    setItems(state, data) {
      state.items = data;
    }
  }
};
