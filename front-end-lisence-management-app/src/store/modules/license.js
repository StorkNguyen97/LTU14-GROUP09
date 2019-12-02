import axios from "@/plugin/axios";
const LICENSE_API = "/licenses";
// Init state
const state = {
  items: [],
  item: {}
};

// Getters
const getters = {};

// Actions
const actions = {
  getList: context => {
    return axios.get(LICENSE_API).then(response => {
      context.commit("GET_LIST_SUCCESS", response);
    });
  },
  getById: (context, params) => {
    return axios.get(`${LICENSE_API}/${params}`).then(response => {
      context.commit("GET_INFO_SUCCESS", response);
    });
  },
  add: (context, params) => {
    return axios.post(LICENSE_API, params).then(response => {
      context.commit("ADD_NEW_SUCCESS", response);
    });
  },
  update: (context, params) => {
    return axios.put(`${LICENSE_API}/${params.id}`, params).then(response => {
    context.commit("UPDATE_INFO_SUCCESS", response);
    });
  },
  deleteById: (context, params) => {
    return axios.delete(`${LICENSE_API}/${params}`).then(() => {
      context.commit("DELETE_BY_ID_SUCCESS", params);
    });
  }
};

// Mutation
const mutations = {
  GET_LIST_SUCCESS(state, items) {
    state.items = items;
  },
  GET_INFO_SUCCESS(state, item) {
    state.item = item;
  },
  ADD_NEW_SUCCESS(state, item) {
    state.items.push(item);
  },
  UPDATE_INFO_SUCCESS(state, item) {
    function findLicenseIndex(element) {
      return element.id === item.id;
    }
    const index = state.items.findIndex(findLicenseIndex);
    state.items.splice(index, 1, item);
  },
  DELETE_BY_ID_SUCCESS(state, params) {
    function findLicenseIndex(element) {
      return element.id === params.id;
    }
    const index = state.items.findIndex(findLicenseIndex);
    state.items.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
