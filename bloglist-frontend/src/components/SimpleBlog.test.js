import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, findAllByTestId } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    likes: 0
  }

  const component = render(
    <SimpleBlog blog = { blog } />
  )

  expect(component.container).toHaveTextContent(
    'Blog title'
  )
})