/**
 * Created by common on 2017/7/19.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters} from '../action/actions'
import AddTodo from '../component/AddTodo'
import TodoList from '../component/TodoList'
import Footer from '../component/Footer'
import {getVisibleTodos} from '../selectors/todoSelectors'

class App extends Component {
  render() {
    const {dispatch, visibleTodos, visibilityFilter} = this.props
    return (
      <div>
        <AddTodo onAddClick={text => dispatch(addTodo(text))}/>
        <TodoList todos={visibleTodos} onTodoClick={index => dispatch(toggleTodo(index))}/>
        <Footer filter={visibilityFilter} onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))}/>
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

const mapStateToProps = ({todoList}) => {
  return {
    visibleTodos: getVisibleTodos(todoList),
    visibilityFilter: todoList.visibilityFilter
  }
}

export default connect(mapStateToProps)(App)
