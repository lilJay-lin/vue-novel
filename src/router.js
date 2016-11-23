/**
 * Created by liljay on 2016/11/23.
 */
import VueRouter from 'vue-router'
import Books from './components/Books'
import BookDetail from './components/BookDetail'
import Reader from './components/Reader'

const routers = [
  {name: 'books', path: '/', component: Books},
  {name: 'bookDetail', path: '/:bookIndex', component: BookDetail},
  {name: 'bookChapter', path: '/:bookIndex/chapter/:chapterIndex', component: Reader}
]

export default new VueRouter({
  routers
})
