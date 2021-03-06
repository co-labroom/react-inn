/**
 * Created by unnKoel on 2017/7/16.
 */
// @flow
import React from 'react'
import {Switch} from 'react-router'
import {Route} from 'react-router-dom'

import './style/bootstrap.min.css'
// import './style/bootstrap-theme.min.css'

import Nav from './nav'
import HomePage from './component/page/home'
import HelloPage from './component/page/hello'
import HelloAsyncPage from './component/page/hello-async'
import NotFoundPage from './component/page/not-found'
import TodoListPage from './component/page/todoList'

import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  DO_LIST_ROUTE
} from '../shared/routes'

const APP_NAME = process.env.REACT_APP_NAME

const App = () =>
  (<div>
    <h1>{APP_NAME}</h1>
    <Nav />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />}/>
      <Route path={HELLO_PAGE_ROUTE} render={() => <HelloPage />}/>
      <Route path={HELLO_ASYNC_PAGE_ROUTE} render={() => <HelloAsyncPage />}/>
      <Route path={DO_LIST_ROUTE} render={() => <TodoListPage />}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </div>)

export default App
