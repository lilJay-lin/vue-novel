/**
 * Created by linxiaojie on 2016/11/21.
 */
const _ = require('lodash')
export const combineObject = (...list) => {
  const all = {}
  _.each(list, (objs) => {
    _.each(objs, (obj, key) => {
      if (_.has(all, key)) {
        throw new Error('action名称重复，请检查: actionName =' + key)
      }
      all[key] = obj
    })
  })
  return all
}
