import * as React from 'react'
import * as Enzyme from 'enzyme'

const EnzymeAdapter = require('enzyme-adapter-react-16')

Enzyme.configure({adapter: new EnzymeAdapter()})

import NewOrg from './'

it('contains the expected number of components', () => {
  const onSubmit = jest.fn()
  const wrapper = Enzyme.mount(<NewOrg onSubmit={onSubmit} />)
  expect(wrapper.find('input').length).toBe(3)
  expect(wrapper.find('button').length).toBe(1)
})

it('disables the button until the form is valid', () => {
  const onSubmit = jest.fn()
  const wrapper = Enzyme.mount(<NewOrg onSubmit={onSubmit} />)
  const attemptSubmit = ({timesCalled}: {timesCalled: number}) => {
    wrapper.find('button').simulate('click')
    expect(onSubmit).toHaveBeenCalledTimes(timesCalled)
  }
  attemptSubmit({timesCalled: 0})
  wrapper
    .find('#business-name')
    .simulate('change', {target: {value: 'xyz_businessname'}})
    .simulate('blur')
  attemptSubmit({timesCalled: 0})
  wrapper
    .find('#first-name')
    .simulate('change', {target: {value: 'abc_firstname'}})
    .simulate('blur')
  attemptSubmit({timesCalled: 0})
  wrapper
    .find('#last-name')
    .simulate('change', {target: {value: 'pqr_lastname'}})
    .simulate('blur')
  attemptSubmit({timesCalled: 1})
  expect(onSubmit).toBeCalledWith({
    businessName: {edited: true, error: null, value: 'xyz_businessname'},
    firstName: {edited: true, error: null, value: 'abc_firstname'},
    lastName: {edited: true, error: null, value: 'pqr_lastname'},
  })
})
