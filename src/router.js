import Vue from "vue";
import Router from "vue-router";

import Signup from "./views/Signup";
import Signin from "./views/Signin";
import Services from "./views/Services";
import Budgets from "./views/Budgets";
import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/services",
      component: Services
    },
    {
      path: "/budgets",
      component: Budgets,
      beforeEnter: requireAuth
    },
    {
      path: "/sign-in",
      component: Signin
    },
    {
      path: "/sign-up",
      component: Signup
    },
    {
      path: "/sign-out",
      beforeEnter(to, from, next) {
        store.dispatch("signOut");
        next("sign-in");
      }
    },
    {
      path: "*",
      redirect: "/services"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

function requireAuth(to, from, next) {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next({
      path: "/sign-in",
      query: { redirect: to.fullPath }
    });
  }
}
