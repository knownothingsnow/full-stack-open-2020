import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import Blog from './Blog'

describe('test for blog component',() => {
  test('test right render', () => {
    const blog = {
      title: 'test-title',
      author: 'test-author',
      url: 'test-url',
      likes: 233,
      id: '601ea1a16ed7f4f49c5d6668'
    }

    const component = render(
      <Blog blog={blog} likeBlog={() => {}} removeBlog={() => {}}/>
    )

    expect(component.container.querySelector('.blog-title')).toHaveTextContent('test-title')
    expect(component.container.querySelector('.blog-author')).toHaveTextContent('test-author')
    expect(component.container.querySelector('.blog-author')).not.toHaveTextContent('test-url')
    expect(component.container.querySelector('.blog-author')).not.toHaveTextContent(233)
  })
})