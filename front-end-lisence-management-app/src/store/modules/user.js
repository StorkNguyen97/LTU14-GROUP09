import axios from "@/plugin/axios";

// Init state
const state = {
  users: [],
  functions: [],
  user: {},
  usersByGroup: []
};

// Getters
const getters = {};

// Actions
const actions = {
  getListUsers: (context, params) => {
    return axios.get("user.index", params).then(response => {
      context.commit("GET_LIST_USERS", response);
    });
  },
  getListUsersByGroupId: (context, params) => {
    return axios.get("group.user", params).then(response => {
      context.commit("GET_LIST_USERS_BY_GROUP_ID", response);
    });
  },
  getAllFunctions: (context, params) => {
    return axios.get("user.functions", params).then(response => {
      context.commit("GET_ALL_FUNCTIONS_SUCCESS", response);
    });
  },
  getUserInfo: (context, params) => {
    return axios.get("user.detail", params).then(response => {
      context.commit("GET_USER_INFO_SUCCESS", response);
    });
  },
  deleteUserById: (context, params) => {
    return axios.delete("user.detail", params).then(() => {
      context.commit("DELETE_USER_BY_ID_SUCCESS", params);
    });
  },
  createNewUser: (context, params) => {
    return axios.post("user.index", params).then(response => {
      context.commit("ADD_NEW_USER_SUCCESS", response);
    });
  },
  updateUserInfo: (context, params) => {
    return axios.put("user.index", params).then(response => {
      context.commit("UPDATE_USER_INFO_SUCCESS", response);
    });
  },
  updateUserInfoAdmin: (context, params) => {
    return axios.put("user.admin", params).then(response => {
      context.commit("UPDATE_USER_INFO_SUCCESS", response);
    });
  }
};

// Mutation
const mutations = {
  GET_LIST_USERS(state, users) {
    state.users = users;
  },
  GET_LIST_USERS_BY_GROUP_ID(state, data) {
    state.usersByGroup = data;
  },
  GET_ALL_FUNCTIONS_SUCCESS(state, functions) {
    state.functions = functions;
  },
  GET_USER_INFO_SUCCESS(state, user) {
    state.user = user;
  },
  ADD_NEW_USER_SUCCESS(state, user) {
    state.users.push(user);
  },
  UPDATE_USER_INFO_SUCCESS(state, user) {
    user.createdAt = state.user.createdAt;
    user.email = state.user.email;
    function findUserIndex(element) {
      return element.id === user.id;
    }
    const index = state.users.findIndex(findUserIndex);
    state.users.splice(index, 1, user);
  },
  DELETE_USER_BY_ID_SUCCESS(state, params) {
    function findUserIndex(element) {
      return element.id === params.id;
    }
    const index = state.users.findIndex(findUserIndex);
    state.users.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
