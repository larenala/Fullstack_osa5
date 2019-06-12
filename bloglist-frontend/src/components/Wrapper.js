import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import LoginForm from './LoginForm'

const Wrapper = (props) => {

  const onChange = (event) => {
    props.state.value = event.target.value
  }

  return (
    <LoginForm
      value={props.state.value}
      onSubmit={props.onSubmit}
      handleChange={onChange}
    />
  )
}