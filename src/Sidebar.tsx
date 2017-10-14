import * as React from 'react'
import * as classnames from 'classnames'

import {TFeature} from './features.d'

const Sidebar = (props: {
  features: TFeature[]
  selectFeature: (f: TFeature) => () => void
  selectedPlace?: string
}) => (
  <div className="sidebar">
    {props.features.map((f: TFeature, k) => {
      const selected = f.properties.place === props.selectedPlace
      return (
        <div
          className={classnames({listing: true, selected})}
          onClick={props.selectFeature(f)}
          key={k}
        >
          {f.properties.place}
          {selected && <pre>{JSON.stringify(f.properties, null, 2)}</pre>}
        </div>
      )
    })}
  </div>
)

export default Sidebar
