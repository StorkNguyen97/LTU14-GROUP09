const BASE_COM_URL = "/...-api";

// Init state
const state = {
  items: [],
  item: {}
};

// Getters
const getters = {};

// Actions
const actions = {
  resetData: context => {
    context.commit("RESET_DATA_SUCCESS");
  },
  async delele({ commit }, body) {
    return await this.$axios.delete(
      `${BASE_COM_URL}/...`,
      { data: body }
    );
  },
  async add({ commit }, body) {
    return await this.$axios.post(
      `${BASE_COM_URL}/...`,
      body
    );
  },
  async edit({ commit }, body) {
    return await this.$axios.put(
      `${BASE_COM_URL}/...`,
      body
    );
  },
  async getList({ commit }, id) {
    const { data } = await this.$axios.get(`${BASE_COM_URL}/...`);
    commit("GET_LIST_USER", data.data);
  }
};

// Mutation
const mutations = {
  RESET_DATA_SUCCESS: (state, response) => {
    state.items = [];
    state.item = {};
  },
  GET_LIST_USER: (state, response) => {
    state.items = response;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
