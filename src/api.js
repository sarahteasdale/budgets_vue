import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3000";

// `baseURL` is prepended to URLs passed to axios
axios.defaults.baseURL = API_URL;

// POST with JSON content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// `xsrfCookieName` is the name of the cookie
// to use as a value for xsrf token.
// Default is 'XSRF-TOKEN'
axios.defaults.xsrfCookieName = "CSRF-TOKEN";

// `xsrfHeaderName` is the name of the http header
// that carries the xsrf token value.
// Default is 'X-XSRF-TOKEN'
axios.defaults.xsrfHeaderName = "X-CSRF-Token";

// `withCredentials` indicates whether or not cross-site
// Access-Control requests should be made using credentials.
axios.defaults.withCredentials = true;

export default {
  getServices() {
    return axios.get("/services");
  },
  getBudgetItems() {
    return axios.get("/budget-items");
  },
  createBudgetItem(serviceId) {
    return axios.post("/budget-items", { service_id: serviceId });
  },
  getBudgetTypes(serviceId) {
    return axios.get(`/services/${serviceId}/budget_types`);
  },
  createBudgetType(serviceId, aBudgetType) {
    return axios.post(`/services/${serviceId}/budget_types`, aBudgetType);
  },
  createSession(username, password) {
    return axios.post("/session", { username, password });
  },
  deleteSession() {
    return axios.delete("/session", {});
  },
  createUser(username, password) {
    return axios.post("/users", { username, password });
  }
};

// Intercept all 401 Unauthorized responses before
// they are handled by `then` or `catch`

import store from "./store";
import router from "./router";

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (!error.response) {
      // network error
      alert(`Unable to access API: ${error.message}`);
    } else if (error.response.status == 401) {
      console.error("Unauthorized! Signing out...");
      store.dispatch("signOut").then(() => {
        router.replace("sign-in");
      });
    }
    return Promise.reject(error);
  }
);
