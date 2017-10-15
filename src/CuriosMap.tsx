import * as React from 'react'
import * as MapboxGl from 'mapbox-gl'
import ReactMapboxGl from 'react-mapbox-gl'
import {throttle} from 'lodash'
import {MapEvent} from 'react-mapbox-gl/lib/map'

import {TFeature, TCollection} from './features.d'
import Sidebar from './Sidebar'
import Point from './Point'
import Polygon from './Polygon'

type TProps = {
  data: TCollection
}

type TState = {
  zoom: number[]
  center: number[]
  selected?: string
}

class CuriosMap extends React.Component<TProps, TState> {
  initialCenter = [-122.4194, 37.7749]
  initialZoom = [12]
  pointZoom = [15]
  polygonZoom = [14]
  style = 'mapbox://styles/devonzuegel/cj8rx2ti3aw2z2rnzhwwy3bvp'
  color = '#15232c'
  Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZGV2b256dWVnZWwiLCJhIjoickpydlBfZyJ9.wEHJoAgO0E_tg4RhlMSDvA',
  })

  state: TState = {
    center: this.initialCenter, // Centered on SF
    zoom: this.initialZoom,
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
      zoom: this.pointZoom,
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
      zoom: this.polygonZoom,
    })
  }

  private featureLayer = (f: TFeature) => {
    if (f.geometry.type === 'Point') {
      return <Point onClick={this.selectPoint} feature={f} color={this.color} />
    }
    if (f.geometry.type === 'Polygon') {
      return <Polygon onClick={this.selectPolygon} feature={f} color={this.color} />
    }
    return null
  }

  public render() {
    return (
      <div>
        <div id="map" className="map pad2">
          <this.Map
            onClick={() => this.setState({selected: undefined})}
            onZoom={this.boundsChanged}
            onMove={this.boundsChanged}
            zoom={this.state.zoom}
            center={this.state.center}
            style={this.style}
            containerStyle={{height: '100%', width: '100%'}}
          >
            {this.props.data.features.map(this.featureLayer)}
            />
          </this.Map>
        </div>

        <Sidebar
          features={this.props.data.features}
          selectedPlace={this.state.selected}
          selectFeature={(f: TFeature) => () => {
            if (f.geometry.type === 'Point') this.selectPoint(f)
            if (f.geometry.type === 'Polygon') this.selectPolygon(f)
          }}
        />
      </div>
    )
  }
}

export default CuriosMap
