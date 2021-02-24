import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import CreateForm from './CreateForm'

describe('tests for CreateForm component', () => {
  test('check submit handler', () => {
    const mockSubmit = jest.fn()
    const component = render(<CreateForm createBlog={ mockSubmit}/>)
    const submitObj = {
      title:'title:testing of forms could be easier',
      author:'author:testing of forms could be easier',
      url:'url:testing of forms could be easier',
    }
    fireEvent.change(
      component.container.querySelector('input[name=\'title\']'),
      { target: { value:  submitObj.title } }
    )
    fireEvent.change(
      component.container.querySelector('input[name=\'author\']'),
      { target: { value:  submitObj.author } }
    )
    fireEvent.change(
      component.container.querySelector('input[name=\'url\']'),
      { target: { value:  submitObj.url } }
    )
    fireEvent.click(component.getByText('create'))
    expect(mockSubmit.mock.calls).toHaveLength(1)
    expect(mockSubmit.mock.calls[0][0]).toEqual(submitObj)
  })
})