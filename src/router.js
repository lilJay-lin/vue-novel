/**
 * Created by liljay on 2016/11/23.
 */
import VueRouter from 'vue-router'
import Vue from 'vue'
import Books from './components/Books'
import BookDetail from './components/BookDetail'
import Reader from './components/Reader'

Vue.use(VueRouter)

const routes = [
  {name: 'books', path: '/book', component: Books},
  {name: 'bookDetail', path: '/book/:bookId', component: BookDetail},
  {name: 'bookChapter', path: '/book/:bookId/chapter/:chapterIndex', component: Reader},
  {path: '*', redirect: {name: 'books'}}
]

const router = new VueRouter({
  routes
})

export default router
