/**
 * Created by unnKoel on 2017/7/16.
 */

// @flow
import { connect } from 'react-redux'

import { sayHello } from '../action/hello'
import Button from '../component/button'

const mapStateToProps = () => ({
  label: 'Say hello',
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => {
    dispatch(sayHello('Hello!'))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)
