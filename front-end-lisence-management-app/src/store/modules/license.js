import axios from "@/plugin/axios";
// Init state
const state = {
  items: [],
  item: {}
};

// Getters
const getters = {};

// Actions
const actions = {
  getListLicenses: (context, params) => {
    return axios.get("item.index", params).then(response => {
      context.commit("GET_LIST_GROUPS_SUCCESS", response);
    });
  },
  getLicenseInfo: (context, params) => {
    return axios.get("item.detail", params).then(response => {
      context.commit("GET_GROUP_INFO_SUCCESS", response);
    });
  },
  createNewLicense: (context, params) => {
    return axios.post("item.index", params).then(response => {
      context.commit("ADD_NEW_GROUP_SUCCESS", response);
    });
  },
  updateLicenseInfo: (context, params) => {
    return axios.put("item.index", params).then(response => {
      context.commit("UPDATE_GROUP_INFO_SUCCESS", response);
    });
  },
  deleteLicenseById: (context, params) => {
    return axios.delete("item.detail", params).then(() => {
      context.commit("DELETE_GROUP_BY_ID_SUCCESS", params);
    });
  }
};

// Mutation
const mutations = {
  GET_LIST_GROUPS_SUCCESS(state, items) {
    state.items = items;
  },
  GET_GROUP_INFO_SUCCESS(state, item) {
    state.item = item;
  },
  ADD_NEW_GROUP_SUCCESS(state, item) {
    state.items.push(item);
  },
  UPDATE_GROUP_INFO_SUCCESS(state, item) {
    function findLicenseIndex(element) {
      return element.id === item.id;
    }
    const index = state.items.findIndex(findLicenseIndex);
    state.items.splice(index, 1, item);
  },
  DELETE_GROUP_BY_ID_SUCCESS(state, params) {
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
