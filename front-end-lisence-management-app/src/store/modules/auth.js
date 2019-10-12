const BASE_COM_URL = "/account-api";

const defaultState = {
  auth: {
    loggedIn: false,
    user: {}
  }
};

const state = {
  auth: defaultState.auth
};

const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  }
};

const actions = {
  async LOGIN({ commit }, body) {
    const { data } = await this.$axios.post(BASE_COM_URL + "/login", body);
    commit("setAuth", { loggedIn: true, user: data.data });
  },
  LOGOUT({ commit }) {
    commit("logOut");
  }
};

const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
    localStorage.setItem("token", auth.user.token);
  },
  logOut(state) {
    state.auth = defaultState.auth;
    localStorage.clear();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
