/**
 * Created by unnKoel on 2017/7/16.
 */

import React from 'react'

import HelloButton from '../../container/hello-button'
import Message from '../../container/message'
import { Button } from 'react-bootstrap';

const HelloPage = () =>
  (<div>
    <Message />
    <HelloButton />
    <Button bsStyle="danger">Link12</Button>
  </div>)
export default HelloPage
