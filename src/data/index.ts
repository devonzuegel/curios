import salesforceTower from './salesforceTower'

const data: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject> = {
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
        coordinates: salesforceTower.locations[0],
      },
    },
  ],
}

export default data
