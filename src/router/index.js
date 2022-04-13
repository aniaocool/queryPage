import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect: '/index'
  },
  {
    path:'/index',
    name:"index",
    component: () =>
          import(/* webpackChunkName: "about" */ "../views/index.vue"),
  },
  {
    path: "/queryPage",
    name: "queryPage",
    component: () =>
          import(/* webpackChunkName: "about" */ "../views/index.vue"),
    children:[
      {
        path:'/queryPage/:pagekey',
        name:'查询',
        meta:{
          keepAlive:true
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/queryPage.vue"),
      },
      {
        path:'/queryConfig/edit/:pagekey',
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/queryPageConfig.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
