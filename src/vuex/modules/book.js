/**
 * Created by linxiaojie on 2016/11/21.
 */
import * as types from '../mutation-types.js'
const _ = require('lodash')

const state = {
  list: [],
  detail: {
    id: '',
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
    title: '',
    index: '',
    text: ''
  },
  search: {
    list: []
  }
}

const mutations = {
  [types.RECEIVE_BOOKS] (state, {list}) {
    state.list = list
  },
  [types.RECEIVE_SEARCH_BOOK_RES] (state, {list}) {
    state.search.list = list
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
  [types.RECEIVE_BOOK_CONTENT] (state, {content}) {
    _.each(content, (val, key) => {
      if (_.has(state.reader, key)) {
        state.reader[key] = val
      }
    })
  }
}

export default {
  state,
  mutations
}
