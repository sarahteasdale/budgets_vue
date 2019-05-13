import Vue from "vue";
import Vuex from "vuex";

import api from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    budgetItems: [],
    user: JSON.parse(localStorage.getItem("user"))
  },
  getters: {
    budgetCount: state => state.budgetItems.length,
    isAuthenticated: state => !!state.user
  },
  mutations: {
    setBudgetItems(state, items) {
      state.budgetItems = items;
    },
    addBudgetItem(state, item) {
      state.budgetItems.push(item);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
      state.budgetItems = [];
    }
  },
  actions: {
    getBudgetItems({ commit }) {
      if (this.getters.isAuthenticated) {
        api.getBudgetItems().then(response => {
          commit("setBudgetItems", response.data);
        });
      }
    },
    createBudgetItem({ commit }, serviceId) {
      api.createBudgetItem(serviceId).then(response => {
        commit("addBudgetItem", response.data);
      });
    },
    signIn({ commit }, { username, password }) {
      // The Promise used for router redirect in Signin.vue
      return new Promise((resolve, reject) => {
        api
          .createSession(username, password)
          .then(response => {
            commit("setUser", response.data);
            this.dispatch("getBudgetItems");
            resolve();
          })
          .catch(error => {
            // if the request fails, clear user
            commit("clearUser");
            reject(error.response.data.error);
          });
      });
    },
    signUp({ commit }, { username, password }) {
      // The Promise used for router redirect in Signup.vue
      return new Promise((resolve, reject) => {
        api
          .createUser(username, password)
          .then(response => {
            commit("setUser", response.data);
            this.dispatch("getBudgetItems");
            resolve();
          })
          .catch(error => {
            commit("clearUser");
            reject(error.response.data.errors);
          });
      });
    },
    signOut({ commit }) {
      // The Promise used for router redirect in Header.vue
      return new Promise(resolve => {
        api.deleteSession().then(() => {
          commit("clearUser");
          resolve();
        });
      });
    }
  }
});
