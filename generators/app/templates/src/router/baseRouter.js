export default [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/basePage/login.vue"),
  },
]