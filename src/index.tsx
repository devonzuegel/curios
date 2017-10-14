import * as React from 'react'
import * as ReactDOM from 'react-dom'
import data from './data'
import CuriosMap from './CuriosMap'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const root = document.getElementById('root') as HTMLElement
ReactDOM.render(<CuriosMap data={data} />, root)
registerServiceWorker()
