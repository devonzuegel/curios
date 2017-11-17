import * as React from 'react'
import * as Enzyme from 'enzyme'

const EnzymeAdapter = require('enzyme-adapter-react-16')

Enzyme.configure({adapter: new EnzymeAdapter()})

import Signin from './'

it('contains the expected number of components', () => {
  const onSubmit = jest.fn()
  const wrapper = Enzyme.mount(<Signin onSubmit={onSubmit} />)
  expect(wrapper.find('input').length).toBe(2)
  expect(wrapper.find('button').length).toBe(1)
})

it('disables the button until the form is valid', () => {
  const onSubmit = jest.fn()
  const wrapper = Enzyme.mount(<Signin onSubmit={onSubmit} />)
  const attemptSubmit = ({timesCalled}: {timesCalled: number}) => {
    wrapper.find('button').simulate('click')
    expect(onSubmit).toHaveBeenCalledTimes(timesCalled)
  }
  attemptSubmit({timesCalled: 0})
  wrapper
    .find('#email')
    .simulate('change', {target: {value: 'email1'}})
    .simulate('blur')
  attemptSubmit({timesCalled: 0})
  wrapper
    .find('#password')
    .simulate('change', {target: {value: 'password1'}})
    .simulate('blur')
  attemptSubmit({timesCalled: 1})
  expect(onSubmit).toBeCalledWith({
    email: {edited: true, error: null, value: 'email1'},
    password: {edited: true, error: null, value: 'password1'},
  })
})

it('submits the form with the expected values', () => {
  const onSubmit = jest.fn()
  const wrapper = Enzyme.mount(<Signin onSubmit={onSubmit} />)
  wrapper
    .find('#email')
    .simulate('change', {target: {value: 'email2'}})
    .simulate('blur')
  wrapper
    .find('#password')
    .simulate('change', {target: {value: 'password2'}})
    .simulate('blur')
  wrapper.find('button').simulate('click')
  expect(onSubmit).toBeCalledWith({
    email: {edited: true, error: null, value: 'email2'},
    password: {edited: true, error: null, value: 'password2'},
  })
})

it('marks fields as edited only upon blur', () => {
  const onSubmit = jest.fn()
  const wrapper = Enzyme.mount(<Signin onSubmit={onSubmit} />)
  wrapper
    .find('#email')
    .simulate('change', {target: {value: 'email2'}})
    .simulate('blur')
  wrapper
    .find('#password') // Don't blur this time
    .simulate('change', {target: {value: 'password2'}})
  wrapper.find('button').simulate('click')
  expect(onSubmit).toBeCalledWith({
    email: {edited: true, error: null, value: 'email2'},
    password: {edited: false, error: null, value: 'password2'},
  })
})
