/**
 * Created by unnKoel on 2017/7/16.
 */

// @flow
import React from 'react'

type Props = {
  message: string,
}

const Message = ({ message }: Props) =>
  <p>{message}</p>

export default Message
