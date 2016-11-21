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

/*
* todo:
* */
export const deleteBook = ({commit}, index) => {
  commit(types.DEL_BOOK_ITEM, {index})
}
