import Vue from "vue";
import Router from "vue-router";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Views
const License = () => import("@/views/License");
const User = () => import("@/views/User");
const Software = () => import("@/views/Software");
const UserSoftware = () => import("@/views/UserSoftware");


// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");

// Views - Client
const Dashboard = () => import("@/views/client/Dashboard");

// VueX store
import store from "../store";

Vue.use(Router);

// Before enter functions
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/login");
};

function configRoutes() {
  return [
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: ifAuthenticated
    },
    {
      path: "*",
      name: "Page404",
      component: Page404
    },
    {
      path: "/",
      redirect: "/license",
      name: "Home",
      component: DefaultContainer,
      children: [
        {
          path: "license",
          name: "License",
          component: License,
          beforeEnter: ifAuthenticated
        },
        {
          path: "user",
          name: "User",
          component: User,
          beforeEnter: ifAuthenticated
        },
        {
          path: "software",
          name: "Software",
          component: Software,
          beforeEnter: ifAuthenticated

        },
        {
          path: "user/software",
          name: "UserSoftware",
          component: UserSoftware,
          beforeEnter: ifAuthenticated
        }
      ]
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        {
          path: "500",
          name: "Page500",
          component: Page500
        },

        {
          path: "register",
          name: "Register",
          component: Register
        }
      ]
    }
  ];
}

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});
