/**
 * Created by linxiaojie on 2016/11/21.
 */
import * as types from '../mutation-types.js'
const _ = require('lodash')

const state = {
  list: [],
  detail: {
    _id: '',
    source: '',
    host: '',
    link: '',
    name: '',
    author: '',
    status: '',
    update: '',
    description: '',
    chapterName: '',
    chapters: [],
    page: 1,
    pageSize: 10,
    totalPage: 0
  },
  reader: {
    name: '',
    index: 0,
    text: ''
  }
}

const mutations = {
  [types.RECEIVE_BOOKS] (state, {list}) {
    state.list = list
  },
  [types.RECEIVE_BOOK_CHAPTERS] (state, {chapters}) {
    state.detail.chapters = chapters
  },
  [types.RECEIVE_BOOK_DETAIL] (state, {detail}) {
    _.each(detail, (val, key) => {
      if (_.has(state.detail, key)) {
        state.detail[key] = val
      }
    })
  },
  [types.DEL_BOOK_ITEM] (state, {index}) {
    state.list.splice(index, 1)
  },
  [types.RE_BOOK_CONTENT] (state, {content}) {
    _.each(content, (val, key) => {
      if (_.has(state.detail.reader, key)) {
        state.detail.reader[key] = val
      }
    })
  }
}

export default {
  state,
  mutations
}
