import * as React from 'react'
import * as MapboxGl from 'mapbox-gl'
import {throttle} from 'lodash'
import {MapEvent} from 'react-mapbox-gl/lib/map'
import ReactMapboxGl, {GeoJSONLayer} from 'react-mapbox-gl'

import {TFeature, TCollection} from './features.d'
import Sidebar from './Sidebar'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZGV2b256dWVnZWwiLCJhIjoickpydlBfZyJ9.wEHJoAgO0E_tg4RhlMSDvA',
})

type TState = {
  zoom: number[]
  center: number[]
  selected?: string
  style: string
}

type TProps = {
  data: TCollection
}

class CuriosMap extends React.Component<TProps, TState> {
  state: TState = {
    center: [-122.4194, 37.7749],
    zoom: [12],
    style: 'mapbox://styles/devonzuegel/cj8rx2ti3aw2z2rnzhwwy3bvp',
  }

  private boundsChanged: MapEvent = throttle(
    (map: MapboxGl.Map): void => this.setState({center: map.getCenter().toArray()}),
    500,
    {leading: true}
  )

  private selectPoint = (feat: TFeature) => {
    if (this.state.selected === feat.properties.place) {
      this.setState({selected: undefined})
      return
    }
    this.setState({
      selected: feat.properties.place,
      center: feat.geometry.coordinates as number[], // TODO: This coercion may cause problems
      zoom: [15],
    })
  }

  private selectPolygon = (feat: TFeature) => {
    if (this.state.selected === feat.properties.place) {
      this.setState({selected: undefined})
      return
    }
    const bounds = new MapboxGl.LngLatBounds()
    // TODO: This coercion may cause problems
    ;(feat.geometry.coordinates as [number, number][]).forEach(coordPair => {
      const latLng = new MapboxGl.LngLat(coordPair[0][0], coordPair[0][1])
      bounds.extend(latLng)
    })
    // map.fitBounds(bounds)
    this.setState({
      selected: feat.properties.place,
      center: bounds.getCenter().toArray(),
      zoom: [14],
    })
  }

  private featureLayer = (f: TFeature) => {
    const darkBlue = '#15232c'
    if (f.geometry.type === 'Point') {
      return (
        <GeoJSONLayer
          data={f}
          circleOnClick={({features}: TCollection) => this.selectPoint(features[0])}
          circleLayout={{visibility: 'visible'}}
          circlePaint={{
            'circle-radius': {stops: [[12, 2], [15, 5]]},
            'circle-color': darkBlue,
            'circle-stroke-width': 1,
            'circle-stroke-color': darkBlue,
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
            'text-color': darkBlue,
            'text-halo-color': 'white',
            'text-halo-width': 2,
            'text-halo-blur': 1,
          }}
        />
      )
    }
    if (f.geometry.type === 'Polygon') {
      return (
        <GeoJSONLayer
          data={f}
          fillOnClick={({features}: TCollection) => this.selectPolygon(f)}
          fillPaint={{
            'fill-outline-color': '#ffffff',
            'fill-color': darkBlue,
            'fill-opacity': {stops: [[13, 0.15], [14, 0.25]]},
          }}
          symbolLayout={{
            'text-padding': 100,
            'icon-padding': 100,
            'text-field': {stops: [[13, ''], [14, '{place}']]},
            'text-letter-spacing': 0.05,
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-anchor': 'top',
          }}
          symbolPaint={{
            'text-color': darkBlue,
            'text-halo-color': 'white',
            'text-halo-width': 2,
            'text-halo-blur': 1,
          }}
        />
      )
    }
    return null
  }
  public render() {
    return (
      <div>
        <div id="map" className="map pad2">
          <Map
            onClick={() => this.setState({selected: undefined})}
            onZoom={this.boundsChanged}
            onMove={this.boundsChanged}
            zoom={this.state.zoom}
            center={this.state.center}
            style={this.state.style}
            containerStyle={{height: '100%', width: '100%'}}
          >
            {this.props.data.features.map(this.featureLayer)}
            />
          </Map>
        </div>

        <Sidebar
          features={this.props.data.features}
          selectedPlace={this.state.selected}
          selectFeature={(f: TFeature) => () => {
            if (f.geometry.type === 'Point') {
              this.selectPoint(f)
            } else if (f.geometry.type === 'Polygon') {
              this.selectPolygon(f)
            }
          }}
        />
      </div>
    )
  }
}

export default CuriosMap
