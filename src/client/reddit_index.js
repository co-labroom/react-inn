/**
 * Created by common on 2017/7/19.
 */
import thunkMiddleWare from 'redux-thunk'
import createLogger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import {selectSubreddit, fetchPosts} from './action/reddit_actions'
import rootReducer from './reducer/reddit'

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleWare, //运行我们dispatch()函数
    loggerMiddleware  //打印action日志
  )
)

store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState))
