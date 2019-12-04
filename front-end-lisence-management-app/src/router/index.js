import Vue from "vue";
import Router from "vue-router";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");
const DefaultClientLayout = () => import("@/containers/DefaultClientLayout");

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
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters["auth/isAuthenticated"]) {
    checkPermissions(to, from, next);
    // next();
    return;
  }
  next("/login");
};

const checkPermissions = (to, from, next) => {
  next();
  const { role } = to.meta;
  // const currentUser = store.getters["auth/currentUser"]
  // if (role === "Administrator" && currentUser && currentUser.user && currentUser.user.role && currentUser.user.role.name === "Administrator") {
  //   next();
  // }
}

function configRoutes() {
  return [
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/user",
      name: "Dashboard",
      redirect: "/user/dashboard",
      component: DefaultClientLayout,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
          beforeEnter: ifAuthenticated
        },
        {
          path: "software",
          name: "UserSoftware",
          component: UserSoftware,
          beforeEnter: ifAuthenticated
        },
      ],
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
          beforeEnter: ifAuthenticated,
          meta: { role: "Administrator" }
        },
        {
          path: "user",
          name: "User",
          component: User,
          beforeEnter: ifAuthenticated,
          meta: { role: "Administrator" }
        },
        {
          path: "software",
          name: "Software",
          component: Software,
          beforeEnter: ifAuthenticated,
          meta: { role: "Administrator" }
        },
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
