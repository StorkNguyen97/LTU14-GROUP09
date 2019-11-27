import apiService from "../../services/api";
import _ from "lodash";

const state = {
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : {}
};

const getters = {
  isAuthenticated: state => !!_.get(state, "currentUser.id"),
  currentUser: state => state.currentUser
};

const actions = {
  actionLogin: (context, params) => {
    return apiService.post("auth.login", params).then(response => {
      context.commit("LOGIN_SUCCESS", response);
    });
  },
  actionResetPass: (context, params) => {
    return apiService.post("auth.resetPass", params);
  },
  actionChangePass: (context, params) => {
    return apiService.put("auth.changePass", params);
  },
  actionLogout: context => {
    return new Promise(resolve => {
      context.commit("LOGOUT_SUCCESS");
      resolve();
    });
  },
  getCurrentUserDetail: context => {
    return apiService
      .get("user.detail", {
        id: state.currentUser.userId
      })
      .then(response => {
        context.commit("UPDATE_CURRENT_USER_DETAIL_STATE", response);
      });
  },
  updateCurrentUserOptions: (context, params) => {
    return apiService.put("user.options", params).then(response => {
      context.commit("UPDATE_CURRENT_USER_OPTIONS_STATE", response.options);
    });
  },
  saveSelectedAttCameras: (context, selectedAttCameras) => {
    context.commit("SAVE_SELECTED_ATT_CAMERAS", selectedAttCameras);
  },
  saveSelectedAttWelcomeCamera: (context, selectedAttCameras) => {
    context.commit("SAVE_SELECTED_ATT_CAMERAS_WELCOME", selectedAttCameras);
  },
  saveSelectedReceptionCameras: (context, selectedCameras) => {
    context.commit("SAVE_SELECTED_RECEPTION_CAMERAS", selectedCameras);
  },
  updateState: (context, payload) => {
    context.commit("UPDATE_STATE", payload);
  }
};

const mutations = {
  LOGIN_SUCCESS: (state, response) => {
    state.currentUser = response;
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  },
  LOGOUT_SUCCESS: state => {
    state.currentUser = null;
    localStorage.removeItem("currentUser");
  },
  UPDATE_CURRENT_USER_DETAIL_STATE: (state, response) => {
    state.currentUser = {
      ...state.currentUser,
      userDetail: response
    };
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  },
  UPDATE_CURRENT_USER_OPTIONS_STATE: (state, response) => {
    state.currentUser = {
      ...state.currentUser,
      userDetail: {
        ...state.currentUser.userDetail,
        options: response
      }
    };
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  },
  SAVE_SELECTED_ATT_CAMERAS: (state, selectedAttCameras) => {
    state.currentUser = {
      ...state.currentUser,
      selectedAttCameras: selectedAttCameras
    };
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  },
  SAVE_SELECTED_ATT_CAMERAS_WELCOME: (state, selectedAttCameras) => {
    state.currentUser = {
      ...state.currentUser,
      selectedAttCamerasWelcome: selectedAttCameras
    };
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  },
  SAVE_SELECTED_RECEPTION_CAMERAS: (state, selectedCameras) => {
    state.currentUser = {
      ...state.currentUser,
      selectedReceptionCameras: selectedCameras
    };
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  },
  UPDATE_STATE: (state, payload) => {
    const { stateName, value } = payload;
    state[stateName] = value;
    if (stateName === "currentUser") {
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
