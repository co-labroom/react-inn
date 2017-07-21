/**
 * Created by common on 2017/7/20.
 */

/**
 * 避免switch的Reducer的生成函数
 * @param initialState
 * @param handlers
 * @returns {reducer}
 */
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}
