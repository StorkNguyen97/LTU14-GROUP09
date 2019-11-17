import axios from "@/plugins/axios";
const LICENSE_API = "/licenses";

export default {
  namespaced: true,
  state: {
    items: [],
    item: {}
  },
  actions: {
    fetchItems({ commit }) {
      return axios.get(LICENSE_API).then(result => commit("setItems", result));
    },
    fetchItemById({ commit }, id) {
      return axios
        .get(`${LICENSE_API}/${id}`)
        .then(result => commit("setItem", result));
    }
  },
  mutations: {
    setItems(state, data) {
      state.items = data;
    },
    setItem(state, data) {
      state.item = data;
    }
  }
};
