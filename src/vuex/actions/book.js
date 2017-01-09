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
export const searchBook = ({state, commit}, name) => {
  return server.request({
    url: base + '/search/' + name
  }).then(({res: {list}}) => {
    commit(types.RECEIVE_SEARCH_BOOK_RES, {
      list
    })
  }, (res) => {
    return Promise.reject(res)
  })
}

function showBookDetail ({commit}, {url, type = types.RECEIVE_BOOK_DETAIL}) {
  return server.request({
    url
  }).then(({res: {book}}) => {
    commit(type, {
      detail: book
    })
    return book
  }, (res) => {
    return Promise.reject(res)
  })
}

/*
 * 通过ID搜索
 * */
export const getBookDetail = ({state, commit}, {id, page = 1, type = types.RECEIVE_BOOK_DETAIL}) => {
  return showBookDetail({state, commit}, {
    url: base + '/' + id + '?pageSize=' + state.book.detail.pageSize + '&page=' + page,
    type
  })
}

/*
 * 通过关键字搜索
 * */
export const getBookDetailByName = ({state, commit}, book) => {
  const {name, href, source} = book
  let url = base + '/new?name=' + encodeURIComponent(name) + '&link=' + encodeURIComponent(href) + '&source=' + encodeURIComponent(source) + '&pageSize=' + state.book.detail.pageSize
  return showBookDetail({state, commit}, {url})
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
export const deleteBook = ({state, commit}, id, index) => {
  commit(types.DEL_BOOK_ITEM, {index})
  return server.request({
    url: base + '/' + id,
    method: 'delete'
  }).then((res) => {
    return Promise.resolve(res)
  }, ({message}) => {
    alert(message)
    window.location.reload()
  })
}

/*
 * 请求下一页章节目录
 * */
export const getNextPageChapters = ({state, commit}) => {
  let detail = state.book.detail
  return getBookDetail({state, commit}, {
    id: detail.id,
    page: parseInt(detail.page, 10) + 1,
    type: types.RECEIVE_NEXT_PAGE_CHAPTERS
  })
}

