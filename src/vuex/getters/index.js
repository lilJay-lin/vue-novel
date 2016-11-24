/**
 * Created by linxiaojie on 2016/11/21.
 */
import {combineObject} from '../../utils/helper.js'
import * as novelGetters from './book.js'
import * as loadingGetters from './loading.js'

export default combineObject(novelGetters, loadingGetters)
