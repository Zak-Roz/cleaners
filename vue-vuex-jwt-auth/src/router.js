import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/navigation/Home.vue';
import Help from './views/navigation/Help.vue';
import Profile from './views/navigation/Profile.vue';

import BoardUser from './views/navigation/BoardUser.vue';
import BoardAdmin from './views/navigation/BoardAdmin.vue';

import allUsers from './views/users/allUsers.vue';
import User from './views/users/User.vue';

import Register from './views/navigation/Register.vue';
import Login from './views/navigation/Login.vue';

import Cleaners from './views/cleaners/Cleaners.vue';
import Cleaner from './views/cleaners/Cleaner.vue';
import NewCleaner from './views/cleaners/NewCleaner.vue';

import OrdersAdmin from './views/orders/OrdersAdmin.vue';
import OrdersUser from './views/orders/OrdersUser.vue';
import Order from './views/orders/Order.vue';
import OrderEdit from './views/orders/OrderEdit.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new-cleaner',
      name: 'NewCleaner',
      component: NewCleaner
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/user/:id',
      component: User,
      props: true,
    },
    {
      path: '/order/:id',
      component: Order,
      props: true,
    },
    {
      path: '/my-orders',
      component: OrdersUser
    },
    {
      path: '/all-orders',
      component: OrdersAdmin
    },
    {
      path: '/cleaners',
      component: Cleaners
    },
    {
      path: '/cleaner/:id',
      component: Cleaner,
      props: true,
    },
    {
      path: '/edit-order/:id',
      component: OrderEdit,
      props: true,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/admin',
      name: 'admin',
      component: BoardAdmin,
    },
    {
      path: '/user',
      name: 'user',
      component: BoardUser,
    },
    {
      path: '/all-users/:id',
      component: allUsers,
      props: true,
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    }
  ]
});