import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderListView from '@/views/OrderListView.vue'
import OrderDetailView from '@/views/OrderDetailView.vue'
import MenuList from '@/components/MenuList.vue'
import ContornoList from '@/components/ContornoList.vue'
import BebidaList from '@/components/BebidaList.vue'
import SalesView from '@/components/SalesView.vue'
import UserCrud from '@/components/UserCrud.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import UserDetailView from '@/views/UserDetailView.vue'
import Clients from '@/components/Clients.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/clients',
      name: 'Client',
      component: Clients,
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('../views/OrderView.vue'),
    },
    {
      path: '/orders',
      name: 'OrderList',
      component: OrderListView,
    },
    {
      path: '/orders/:id',
      name: 'OrderDetail',
      component: OrderDetailView,
      props: true, 
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
    },
    {
      path: '/menus',
      name: 'MenuList',
      component: MenuList,
    },
    {
      path: '/contornos',
      name: 'ContornoList',
      component: ContornoList,
    },
    {
      path: '/bebidas',
      name: 'BebidaList',
      component: BebidaList,
    },
    {
      path: '/sales',
      name: 'SalesView',
      component: SalesView,
    },
    {
      path: '/users',
      name: 'UserCrud',
      component: UserCrud,
    },
    {
      path: '/users/edit/:id',
      name: 'EditView',
      component: () => import('../views/UserEditView.vue'),
    },
    {
      path: '/users/register',
      name: 'RegisterForm',
      component: () => import('../components/forms/RegisterForm.vue'),

    },
    {
      path: '/user/:id',
      name: 'UserDetailView',
      component: UserDetailView,
    },
    // {
    //   path: '/user/updated/:id',
    //   name: 'UserUpdateView',
    //   component: () => import('../views/CLientListView.vue'),

    // },
    {
      path: '/client/register',
      name: 'RegisterView',
      component: () => import('../components/forms/ClientForm.vue'),
    },
    
    {
      path: '/waiter',
      name: 'RegisterView',
      component: () => import('../views/WaiterDashboardView.vue'),

    },
    
  ],
})

export default router
