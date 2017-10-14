import * as React from 'react'
import * as MapboxGl from 'mapbox-gl'
import * as classnames from 'classnames'
import {throttle} from 'lodash'
import ReactMapboxGl, {GeoJSONLayer} from 'react-mapbox-gl'
import {MapEvent} from 'react-mapbox-gl/lib/map'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZGV2b256dWVnZWwiLCJhIjoickpydlBfZyJ9.wEHJoAgO0E_tg4RhlMSDvA',
})

type TState = {
  zoom: number[]
  center: number[]
  selected?: string
}

type TProps = {
  points: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject>
  polygons: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject>
}

class CuriosMap extends React.Component<TProps, TState> {
  state: TState = {center: [-122.4194, 37.7749], zoom: [12]}

  private boundsChanged: MapEvent = throttle(
    (map: MapboxGl.Map): void => this.setState({center: map.getCenter().toArray()}),
    500,
    {leading: true}
  )

  private selectPoint = (feat: GeoJSON.Feature<GeoJSON.DirectGeometryObject>) => {
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
  private selectPolygon = (feat: GeoJSON.Feature<GeoJSON.DirectGeometryObject>) => {
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

  private onPointClick = (
    e: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject>
  ) => this.selectPoint(e.features[0])

  private onPolygonClick = (
    e: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject>
  ) => this.selectPolygon(e.features[0])

  public render() {
    const darkBlue = '#15232c'
    const data = [...this.props.points.features, ...this.props.polygons.features]
    return (
      <div>
        <div id="map" className="map pad2">
          <Map
            onClick={() => this.setState({selected: undefined})}
            onZoom={this.boundsChanged}
            onMove={this.boundsChanged}
            zoom={this.state.zoom}
            center={this.state.center}
            style="mapbox://styles/devonzuegel/cj8qgke1p5m932rpmjkmuup3u"
            containerStyle={{height: '100%', width: '100%'}}
          >
            <GeoJSONLayer
              data={this.props.points}
              circleOnClick={this.onPointClick}
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
            <GeoJSONLayer
              data={this.props.polygons}
              fillOnClick={this.onPolygonClick}
              fillPaint={{
                'fill-outline-color': '#ffffff',
                'fill-color': darkBlue,
                'fill-opacity': {stops: [[13, 0.1], [14, 0.2]]},
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
          </Map>
        </div>

        <div className="sidebar">
          {data.map((feature, k) => {
            const selected = feature.properties.place === this.state.selected
            return (
              <div
                className={classnames({listing: true, selected})}
                onClick={() => {
                  if (feature.geometry.type === 'Point') {
                    this.selectPoint(feature)
                  } else if (feature.geometry.type === 'Polygon') {
                    this.selectPolygon(feature)
                  }
                }}
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
