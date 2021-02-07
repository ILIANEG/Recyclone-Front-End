import { createRouter, createWebHashHistory } from 'vue-router'
import FindBin from '../views/FindBin'
import AddLocation from '../views/AddLocation'
import AboutUs from '../views/AboutUs'

const routes = [
  {
    path: '/',
    redirect: '/findBin'
  },
  {
    path: '/findBin',
    name: 'FindBin',
    component: FindBin
  },
  {
    path: '/addLocation',
    name: 'AddLocation',
    component: AddLocation,
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    component: AboutUs
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
