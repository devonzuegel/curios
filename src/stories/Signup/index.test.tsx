import * as React from 'react'
import * as Enzyme from 'enzyme'

const EnzymeAdapter = require('enzyme-adapter-react-16')

Enzyme.configure({adapter: new EnzymeAdapter()})

import Signup from './'

it('contains the expected number of components', () => {
  const onSubmit = jest.fn()
  const wrapper = Enzyme.mount(<Signup onSubmit={onSubmit} />)
  expect(wrapper.find('input').length).toBe(4)
  expect(wrapper.find('button').length).toBe(1)
})

it('disables the button until the form is valid', () => {
  const onSubmit = jest.fn()
  const wrapper = Enzyme.mount(<Signup onSubmit={onSubmit} />)
  const attemptSubmit = ({timesCalled}: {timesCalled: number}) => {
    wrapper.find('button').simulate('click')
    expect(onSubmit).toHaveBeenCalledTimes(timesCalled)
  }
  attemptSubmit({timesCalled: 0})
  wrapper
    .find('#invitation-code')
    .simulate('change', {target: {value: 'code1'}})
    .simulate('blur')
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
  attemptSubmit({timesCalled: 0})
  wrapper
    .find('#password-again')
    .simulate('change', {target: {value: 'password1'}})
    .simulate('blur')
  attemptSubmit({timesCalled: 1})
  expect(onSubmit).toBeCalledWith({
    email: {edited: true, error: null, value: 'email1'},
    invitationCode: {edited: true, error: null, value: 'code1'},
    password: {edited: true, error: null, value: 'password1'},
    passwordAgain: {edited: true, error: null, value: 'password1'},
  })
})

it('checks that the password and passwordAgain match', () => {
  const onSubmit = jest.fn()
  const wrapper = Enzyme.mount(<Signup onSubmit={onSubmit} />)
  const attemptSubmit = ({timesCalled}: {timesCalled: number}) => {
    wrapper.find('button').simulate('click')
    expect(onSubmit).toHaveBeenCalledTimes(timesCalled)
  }
  attemptSubmit({timesCalled: 0})
  wrapper
    .find('#invitation-code')
    .simulate('change', {target: {value: 'code1'}})
    .simulate('blur')
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
  attemptSubmit({timesCalled: 0})
  wrapper
    .find('#password-again')
    .simulate('change', {target: {value: 'password-foo'}})
    .simulate('blur')
  attemptSubmit({timesCalled: 0})
  expect(wrapper.text()).toContain(`Passwords don't match`)
})
