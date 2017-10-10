import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

jest.mock('react-mapbox-gl', () => ({
  default: () => () => 'Map',
  Layer: 'Layer',
  Feature: 'Feature',
  Marker: 'Marker',
}))

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
