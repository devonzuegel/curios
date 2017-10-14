import * as React from 'react'
import {GeoJSONLayer} from 'react-mapbox-gl'

import {TFeature, TCollection} from './features.d'

type TProps = {
  onClick: (c: TFeature) => void
  feature: TFeature
  color: string
}

const Point = (props: TProps) => (
  <GeoJSONLayer
    data={props.feature}
    circleOnClick={({features}: TCollection) => props.onClick(features[0])}
    circleLayout={{visibility: 'visible'}}
    circlePaint={{
      'circle-radius': {stops: [[12, 2], [15, 5]]},
      'circle-color': props.color,
      'circle-stroke-width': 1,
      'circle-stroke-color': props.color,
      'circle-stroke-opacity': 0.6,
    }}
    symbolLayout={{
      'text-padding': 100,
      'icon-padding': 100,
      'text-field': {stops: [[13, ''], [14, '{place}']]},
      'text-letter-spacing': 0.05,
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.4],
      'text-anchor': 'top',
    }}
    symbolPaint={{
      'text-color': props.color,
      'text-halo-color': 'white',
      'text-halo-width': 2,
      'text-halo-blur': 1,
    }}
  />
)

export default Point
