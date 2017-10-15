import * as React from 'react'
import * as classnames from 'classnames'
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
  color = 'rgba(21, 69, 103, 1)'
  data = this.props.data
  labelNames = 'labels'
  pointFeaturesNames = 'point-features'
  pointFeaturesNamesHover = 'point-features-hover'
  polygonFeaturesNames = 'polygon-features'
  polygonFeaturesNamesHover = 'polygon-features-hover'

  state: TState = {
    center: this.initialCenter,
    zoom: this.initialZoom,
  }

  map: TMapboxGl.Map
  layers: TMapboxGl.Layer[] = [
    {
      id: this.polygonFeaturesNames,
      type: 'fill',
      source: 'features',
      paint: {
        'fill-color': this.color,
        'fill-outline-color': this.color,
        'fill-opacity': {stops: [[12, 0.25], [15, 0.35]]},
      },
      filter: ['==', '$type', 'Polygon'],
    },
    {
      id: this.polygonFeaturesNamesHover,
      type: 'fill',
      source: 'features',
      paint: {
        'fill-color': this.color,
        'fill-outline-color': this.color,
        'fill-opacity': 0.1,
      },
      filter: [
        'all',
        ['==', '$type', 'Polygon'],
        ['==', 'place', ''], // Hover filter (start with no hover)
      ],
    },
    {
      id: this.pointFeaturesNames,
      type: 'circle',
      source: 'features',
      paint: {
        'circle-radius': {stops: [[12, 1], [15, 4]]},
        'circle-color': this.color,
        'circle-stroke-width': 1,
        'circle-stroke-color': this.color,
        'circle-stroke-opacity': 0.4,
        'circle-opacity': 0.3,
      },
      filter: ['==', '$type', 'Point'],
    },
    {
      id: this.pointFeaturesNamesHover,
      type: 'circle',
      source: 'features',
      paint: {
        'circle-opacity': 0.1,
      },
      filter: [
        'all',
        ['==', '$type', 'Point'],
        ['==', 'place', ''], // Hover filter (start with no hover)
      ],
    },
    {
      type: 'symbol',
      id: 'labels',
      source: 'features',
      paint: {
        'text-color': this.color,
        'text-halo-width': 1,
        'text-halo-color': 'rgba(255, 255, 255, 1)',
        'icon-halo-blur': 4,
      },
      layout: {
        'text-size': {stops: [[14, 13], [15, 20]]},
        'text-field': {stops: [[12, ''], [14, '{place}']]},
        'text-letter-spacing': 0.05,
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.4],
        'text-anchor': 'top',
      },
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

  private getOverlappingFeatures = (point: TMapboxGl.Point) => {
    const layers = [
      this.pointFeaturesNames,
      this.polygonFeaturesNames,
      this.labelNames,
    ]
    return this.map.queryRenderedFeatures(point, {layers})
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
      this.map.on('click', (e: TMapboxGl.MapMouseEvent) => {
        const features = this.getOverlappingFeatures(e.point)
        if (features.length > 0) {
          this.zoomToFeature(features[0] as TFeature)
        } else {
          console.log(e.point) // TODO: Create new features in the future
        }
      })
      this.map.on('mousemove', (e: TMapboxGl.MapMouseEvent) => {
        const features = this.getOverlappingFeatures(e.point)
        const featurePlaceName =
          features.length === 0 ? '' : features[0].properties.place

        this.map.setFilter(this.polygonFeaturesNamesHover, [
          '==',
          'place',
          featurePlaceName,
        ])
        this.map.setFilter(this.pointFeaturesNamesHover, [
          'all',
          ['==', 'place', featurePlaceName],
          ['==', '$type', 'Point'],
        ])
      })
    })
  }

  render() {
    return (
      <div>
        <div
          id="map"
          className={classnames({
            map: true,
            'feature-selected': !!this.state.selected,
          })}
        />
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
