/**
 * Created by linxiaojie on 2016/11/21.
 */
import server from '../../api/server'
import * as types from '../mutation-types.js'

const base = '/novel'
export const getAllBooks = ({commit}) => {
  return server.request({
    url: base + '/book'
  }).then(({res: {list}}) => {
    commit(types.RECEIVE_BOOKS, {
      list
    })
  })
}

export const getBookDetail = ({commit}, {name, link, source}) => {
  return server.request({
    url: base + '/book/' + encodeURIComponent(name) + '?link=' + encodeURIComponent(link) + '&source=' + encodeURIComponent(source)
  }).then(({res: {book}}) => {
    commit(types.RECEIVE_BOOK_DETAIL, {
      detail: book
    })
  })
}

export const getBookContent = ({state, commit}, index) => {
  let detail = state.book.detail
  index = detail.page * detail.pageSize + index
  return server.request({
    url: base + '/detail/' + encodeURIComponent(detail.name) + '/chapter/' + index
  }).then(({res}) => {
    commit(types.RECEIVE_BOOK_DETAIL, {
      content: res
    })
  })
}

/*
* todo：请求服务器
* */
export const deleteBook = ({commit}, index) => {
  commit(types.DEL_BOOK_ITEM, {index})
}
