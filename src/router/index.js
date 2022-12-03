import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "../views/Auth/Login";
import Live from "../views/Live";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Auth/Register')
  },
  {
    path: '/live',
    name: 'Live',
    component: Live,
    beforeEnter(from, to, next) {
      // Checked if exist socket
      if (!Vue.prototype.$socket) {
        require("../plugins/socket-io");
      }
      next();
    },
    children: [
      {
        path: '/rooms',
        name: 'Rooms',
        component: () => import(/* webpackChunkName: "rooms" */ '../views/Rooms')
      },
      {
        path: '/room',
        name: 'Room',
        component: () => import(/* webpackChunkName: "room" */ '../views/Room')
      },
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
