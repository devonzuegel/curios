import * as React from 'react'
import * as MapboxGl from 'mapbox-gl'
import * as classnames from 'classnames'
import {throttle} from 'lodash'
import ReactMapboxGl, {GeoJSONLayer} from 'react-mapbox-gl'
import {MapEvent} from 'react-mapbox-gl/lib/map'

import geojson from './data'

const Map = ReactMapboxGl({
  // TODO: extract into config
  accessToken:
    'pk.eyJ1Ijoib3NuciIsImEiOiJjajZwanhjYmwwMDB3MnhxcG9ocHJmMDBsIn0.T8Xi_6tEDq_4Yf3YSYLEPA',
})

type TState = {
  zoom: number[]
  center: number[]
  selected?: string
}

class CuriosMap extends React.Component<{}, TState> {
  state: TState = {center: [-122.4194, 37.7749], zoom: [12]}

  private boundsChanged: MapEvent = throttle(
    (map: MapboxGl.Map): void => this.setState({center: map.getCenter().toArray()}),
    500,
    {leading: true}
  )

  private selectFeature = (feat: GeoJSON.Feature<GeoJSON.DirectGeometryObject>) => {
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

  private onCircleClick = (
    e: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject>
  ) => this.selectFeature(e.features[0])

  public render() {
    const darkBlue = '#15232c'
    return (
      <div>
        <div id="map" className="map pad2">
          <Map
            onClick={() => this.setState({selected: undefined})}
            onZoom={this.boundsChanged}
            onMove={this.boundsChanged}
            zoom={this.state.zoom}
            center={this.state.center}
            style="mapbox://styles/mapbox/outdoors-v9"
            containerStyle={{height: '100%', width: '100%'}}
          >
            <GeoJSONLayer
              data={geojson}
              circleOnClick={this.onCircleClick}
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
          </Map>
        </div>

        <div className="sidebar">
          {geojson.features.map((feature, k) => {
            const selected = feature.properties.place === this.state.selected
            return (
              <div
                className={classnames({listing: true, selected})}
                onClick={() => this.selectFeature(feature)}
                key={k}
              >
                {feature.properties.place}
                {selected && (
                  <pre>{JSON.stringify(feature.properties, null, 2)}</pre>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default CuriosMap
