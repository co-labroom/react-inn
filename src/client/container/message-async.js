/**
 * Created by unnKoel on 2017/7/16.
 */

// @flow
import { connect } from 'react-redux'
import MessageAsync from '../component/message'

const mapStateToProps = state => ({
  message: state.hello.get('messageAsync'),
})

export default connect(mapStateToProps)(MessageAsync)
