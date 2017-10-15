import * as React from 'react'
import * as TMapboxGl from 'mapbox-gl' // Import this for the types...
const MapboxGl = require('mapbox-gl') // ... bc types are broken for this

import {TFeature, TCollection, TCoord} from './features.d'
import Sidebar from './Sidebar'

MapboxGl.accessToken =
  'pk.eyJ1IjoiZGV2b256dWVnZWwiLCJhIjoickpydlBfZyJ9.wEHJoAgO0E_tg4RhlMSDvA'

type TState = {
  zoom: number[]
  center: number[]
  selected?: string
}

class CuriosMap extends React.Component<{data: TCollection}, TState> {
  initialCenter = [-122.4194, 37.7749] // Centered on SF
  initialZoom = [12]
  pointZoom = [15]
  polygonZoom = [14]
  style = 'mapbox://styles/devonzuegel/cj8rx2ti3aw2z2rnzhwwy3bvp'
  color = '#15232c'
  data = this.props.data
  pointFeaturesNames = 'point-features'
  polygonFeaturesNames = 'polygon-features'

  state: TState = {
    center: this.initialCenter,
    zoom: this.initialZoom,
  }

  map: TMapboxGl.Map
  layers: TMapboxGl.Layer[] = [
    {
      type: 'symbol',
      id: 'labels',
      source: 'features',
      layout: {
        'text-field': {stops: [[12, ''], [14, '{place}']]},
        'text-letter-spacing': 0.05,
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.4],
        'text-anchor': 'top',
      },
    },
    {
      id: this.polygonFeaturesNames,
      type: 'fill',
      source: 'features',
      paint: {
        'fill-color': this.color,
        'fill-outline-color': this.color,
        'fill-opacity': 0.3,
      },
      filter: ['==', '$type', 'Polygon'],
    },
    {
      id: this.pointFeaturesNames,
      type: 'circle',
      source: 'features',
      paint: {
        'circle-radius': {stops: [[12, 1], [15, 5]]},
        'circle-color': this.color,
        'circle-stroke-width': 1,
        'circle-stroke-color': this.color,
        'circle-stroke-opacity': {stops: [[12, 0.25], [15, 0.3]]},
      },
      filter: ['==', '$type', 'Point'],
    },
  ]

  private zoomToFeature = (feat: TFeature) => {
    if (feat.geometry.type === 'Point') {
      this.map.flyTo({
        center: feat.geometry.coordinates as TCoord,
        zoom: 15,
      })
    }
    if (feat.geometry.type === 'Polygon') {
      const bounds = new MapboxGl.LngLatBounds()
      const coords = feat.geometry.coordinates[0] as TCoord[]
      coords.forEach(([lng, lat]) => bounds.extend(new MapboxGl.LngLat(lng, lat)))
      this.map.fitBounds(bounds)
    }
  }

  componentDidMount() {
    this.map = new MapboxGl.Map({
      container: 'map',
      style: this.style,
      center: this.initialCenter,
      zoom: this.initialZoom,
    })
    this.map.on('load', () => {
      this.map.addSource('features', {type: 'geojson', data: this.props.data})
      this.layers.map(l => this.map.addLayer(l))
    })
    this.map.on('click', (e: {point: TMapboxGl.Point; lngLat: TMapboxGl.LngLat}) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: [this.pointFeaturesNames, this.polygonFeaturesNames],
      })
      if (features.length > 0) {
        this.zoomToFeature(features[0] as TFeature)
      }
    })
  }

  render() {
    return (
      <div>
        <div id="map" className="map pad2" />
        <Sidebar
          features={this.props.data.features}
          selectedPlace={this.state.selected}
          selectFeature={(f: TFeature) => () => {
            const alreadySelected = this.state.selected === f.properties.place
            this.setState({
              selected: alreadySelected ? undefined : f.properties.place,
            })
            this.zoomToFeature(f)
          }}
        />
      </div>
    )
  }
}

export default CuriosMap
