/**
 * Created by linxiaojie on 2016/11/21.
 */
import server from '../../api/server'
import * as types from '../mutation-types.js'

const base = '/novel'
export const getAllBooks = ({commit}) => {
  return server.request({
    url: base + '/'
  }).then(({res: {list}}) => {
    commit(types.RECEIVE_BOOKS, {
      list
    })
  }, (res) => {
    return Promise.reject(res)
  })
}

/*
export const getBookDetail = ({state, commit}, id) => {
  let books = state.book.list
  index = parseInt(index, 10)
  if (isNaN(index) || books.length <= index || index < 0) {
    return Promise.reject({message: '找不到图书信息'})
  }
  const {name, link, source} = state.book.list[index]
  return server.request({
    url: base + '/' + encodeURIComponent(name) + '?link=' + encodeURIComponent(link) + '&source=' + encodeURIComponent(source)
  }).then(({res: {book}}) => {
    commit(types.RECEIVE_BOOK_DETAIL, {
      detail: book
    })
  }, (res) => {
    return Promise.reject(res)
  })
}
*/

export const getBookDetail = ({state, commit}, id) => {
  return server.request({
    url: base + '/' + id
  }).then(({res: {book}}) => {
    commit(types.RECEIVE_BOOK_DETAIL, {
      detail: book
    })
  }, (res) => {
    return Promise.reject(res)
  })
}

export const getBookContent = ({state, commit}, {id, index}) => {
  let detail = state.book.detail
  index = (detail.page - 1) * detail.pageSize + parseInt(index, 10)
  return server.request({
    url: base + '/' + id + '/chapter/' + index
  }).then(({res}) => {
    commit(types.RECEIVE_BOOK_CONTENT, {
      content: res
    })
  }, (res) => {
    return Promise.reject(res)
  })
}

/*
* todo：请求服务器
* */
export const deleteBook = ({commit}, index) => {
  commit(types.DEL_BOOK_ITEM, {index})
}
