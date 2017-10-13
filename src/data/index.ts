import salesforceTower from './salesforceTower'
import centralSubway from './centralSubway'

export const points: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        ...salesforceTower,
        place: salesforceTower.names[0],
      },
      geometry: {
        type: 'Point',
        coordinates: salesforceTower.locations[0].coordinates,
      },
    },
  ],
}

export const polygons: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        ...centralSubway,
        place: centralSubway.names[0],
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-122.39353, 37.77567],
            [-122.39312, 37.77599],
            [-122.40576, 37.78594],
            [-122.40596, 37.78584],
            [-122.40614, 37.78583],
            [-122.40802, 37.79505],
            [-122.40819, 37.79504],
            [-122.40635, 37.78558],
          ],
        ],
      },
    },
  ],
}
