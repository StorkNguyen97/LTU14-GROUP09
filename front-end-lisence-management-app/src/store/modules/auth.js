import _ from "lodash";
import axios from "@/plugin/axios";
const AUTH_API = "/auth/local";

const state = {
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : {}
};

const getters = {
  isAuthenticated: state => !!_.get(state, "currentUser.user._id"),
  currentUser: state => state.currentUser
};

const actions = {
  actionLogin: (context, params) => {
    return axios.post(AUTH_API, params).then(response => {
      context.commit("LOGIN_SUCCESS", response);
    });
  },
  actionLogout: context => {
    return new Promise(resolve => {
      context.commit("LOGOUT_SUCCESS");
      resolve();
    });
  }
};

const mutations = {
  LOGIN_SUCCESS: (state, response) => {
    state.currentUser = response;
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    const jwt = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser")).jwt
      : null;
    axios.defaults.headers.common.Authorization = "Bearer " + jwt;
  },
  LOGOUT_SUCCESS: state => {
    state.currentUser = null;
    localStorage.removeItem("currentUser");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
