import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import BooksManager from '@/components/BooksManager'
import AddBook from '@/components/AddBook'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-376439.oktapreview.com/oauth2/default',
  client_id: '0oaevtsafk3hXkWJq0h7',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/books-manager',
      name: 'BooksManager',
      component: BooksManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-book',
      name: 'addBook',
      component: AddBook,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
