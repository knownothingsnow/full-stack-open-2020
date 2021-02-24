import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import Blog from './Blog'

describe('test for blog component', () => {
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

  test('test right render', () => {
    expect(component.container.querySelector('.blog-title')).toHaveTextContent('test-title')
    expect(component.container.querySelector('.blog-author')).toHaveTextContent('test-author')
    expect(component.container.querySelector('.blog-url')).toBeNull()
    expect(component.container.querySelector('.blog-likes')).toBeNull()
  })

  test('show url and likes', () => {
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
    fireEvent.click(component.getByText('view'))
    expect(component.container.querySelector('.blog-url')).toHaveTextContent('test-url')
    expect(component.container.querySelector('.blog-likes')).toHaveTextContent('Likes:233')
  } )
})