import Vue from "vue";
import VueRouter from "vue-router";
import baseRouter from './baseRouter'
import notFound from '@/views/basePage/notFoundPage'
import store from "@/store";
// 主要处理改变menu菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);
const routes = [
  ...baseRouter,
  {
    path: '/baseMain',
    component: () => import("../views/basePage/baseMain.vue"),
    name: 'baseMain',
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: '首页',
        component: () => import("../views/basePage/welcome.vue")
      },


    ]
  },
  {
    path: '/404',
    name: '404',
    component: notFound,
    hidden: true

  },
  {
    path: '*',
    redirect: '/',
    hidden: true
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {

  next()
})

router.afterEach((to, from) => { })
export default router;
