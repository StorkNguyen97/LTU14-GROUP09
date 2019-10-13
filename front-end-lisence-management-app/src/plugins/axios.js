import Axios from "axios";
import store from "@/store";
import loading from "./loading";

const CONNECTION_FAIL_MSG = "Connection fail";
const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT
});

// setCommonAuthorizationToken(localStorage.jwt)

axios.interceptors.request.use(
  config => {
    if (!config.hideLoading) loading.show();
    return config;
  },
  error => {
    loading.hide();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    loading.hide();
    return res.data;
  },
  err => {
    loading.hide();
    if (err.response) {
      const {
        response: { data, status }
      } = err;
      if (status === 401) {
        store.dispatch("auth/signOut");
      }
      throw data.message || data;
    } else if (err.request) {
      throw CONNECTION_FAIL_MSG;
    } else {
      throw err.message || err;
    }
  }
);

export default axios;

export function setCommonAuthorizationToken(jwt) {
  if (!jwt) return;
  localStorage.jwt = jwt;
  axios.defaults.headers.common.Authorization = "Bearer " + jwt;
}

export function removeCommonAuthorizationToken() {
  delete axios.defaults.headers.common.Authorization;
}
