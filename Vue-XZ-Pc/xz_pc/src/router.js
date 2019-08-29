import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index'
import Details from './views/Details'
import Products from './views/Products'
import Login from './views/Login'
import NotFound from './views/NotFound'
import Cart from './views/Cart'
//ES6

Vue.use(Router)

export default new Router({
//  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Home, children:[
        { path:"", component: Index },
        { path:"/index", component: Index },
        { path:"/details/:lid", component: Details,props:true},
        { path:"/products/:kw", component: Products,props:true},
        { path:"/cart", component:Cart}
    ]},
    { path: '/login/:back', component: Login,props:true,props:true },
    { path: '/*', component:NotFound }
  ]
})
