/**
 * Created by linxiaojie on 2016/11/21.
 */
import {combineObject} from '../../utils/helper.js'
import * as novelActions from './book.js'
import * as loadingActions from './loading.js'

export default combineObject(novelActions, loadingActions)
