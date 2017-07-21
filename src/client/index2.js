/**
 * Created by unnKoel on 2017/7/18.
 */

import {addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters} from './action/actions'
import {createStore} from 'redux'
import todoApp from './reducer/reducers'

let store = createStore(todoApp);

console.log(store.getState())

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(addTodo('learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

unsubscribe();
