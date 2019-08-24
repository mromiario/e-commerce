import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/register.vue')
    },
    {
      path: '/products',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "products" */ './views/products.vue'),
      children: [
        {
          path: ':id',
          name: 'detilProducts',
          component: () => import(/* webpackChunkName: "detailProducts" */ './views/detailProducts.vue')
        }
      ]
    },
    {
      path: '/sell-products',
      name: 'sell-products',
      component: () => import(/* webpackChunkName: "sell-products" */ './views/sell-products.vue')
    },
    {
      path: '/my-profile',
      name: 'my-profile',
      component: () => import(/* webpackChunkName: "my-profile" */ './views/myProfile.vue')
    },
    {
      path: '/buy/:id',
      name: 'buy',
      component: () => import(/* webpackChunkName: "transaction" */ './views/buy.vue')
    }
  ]
})
