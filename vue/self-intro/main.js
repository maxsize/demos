// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router"
import * as Store from './store/index.js'
import Login from './components/Login'
import MainBody from './components/MainBody'

Vue.config.productionTip = false

Vue.use(VueRouter)
var store = Store.store

const routes = [
  { path:'', name:'home', component:Login },
  { path:'/body', name:'main', component:MainBody }
]
const router = new VueRouter(
  {
    routes
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
