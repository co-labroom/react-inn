/**
 * Created by unnKoel on 2017/7/16.
 */

// @flow
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {sayHelloAsync} from '../action/hello'
import Button from '../component/button'

const mapStateToProps = () => ({
  label: 'Say hello asynchronously and send 1234',
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => {
    dispatch(sayHelloAsync(1234))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)

