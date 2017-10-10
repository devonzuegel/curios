const centralSubway = {
  name: 'Central Subway',
  dates: [
    {
      // 'start'
      name: 'Ground Breaking',
      value: 'February 9, 2010',
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=23',
    },
    {
      // 'end'
      name: 'Revenue Service',
      value: 'December 10, 2019',
      forecast: true,
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=23',
    },
  ],
  location: {
    kind: 'polygon',
    // eyeballed from PDF and drawn on http://www.gmapgis.com/
    coordinates: [
      [-122.39353, 37.77567],
      [-122.39312, 37.77599],
      [-122.40576, 37.78594],
      [-122.40596, 37.78584],
      [-122.40614, 37.78583],
      [-122.40802, 37.79505],
      [-122.40819, 37.79504],
      [-122.40635, 37.78558],
    ],
    source:
      'https://www.sfmta.com/sites/default/files/projects/2017/alignment_map_080614.pdf',
  },
  completion: [
    {
      name: 'Based on Expenditures',
      value: 0.6937,
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=3',
    },
    {
      name: 'Based on Earned Value',
      value: 0.7064,
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=3',
    },
  ],
  cost: [
    {
      name: 'Original at FFGA',
      value: 1578300000,
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=3',
    },
    {
      name: 'Current Estimate',
      estimate: true,
      value: 1578300000,
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=3',
    },
  ],
  notes: [
    // oversight report
    'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf',
    // lay piece
    'https://sf.curbed.com/2017/7/25/16019566/chinatown-san-francisco-central-subway',
    // journalism (mostly negative pieces here)
    'http://escholarship.org/uc/item/387160wq', // 2012
    'https://archives.sfweekly.com/sanfrancisco/covering-their-tracks-the-central-subway-project-buries-millions-in-a-deep-dark-place/Content?oid=2949067', // 2014 whistleblower
  ],
  keyPlayers: [
    // federal funding ~88%?
    // Chinatown politics?
  ],
}
