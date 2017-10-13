import {Money, Currencies} from 'ts-money'
import {TProject} from './project.d'

const centralSubway: TProject = {
  names: ['Central Subway'],
  keyDates: [
    {
      date: new Date('February 9, 2010'),
      title: 'Ground breaking',
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=23',
      notes: [],
    },
    {
      title: 'Revenue Service',
      date: new Date('December 10, 2019'),
      forecast: true,
      notes: [],
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=23',
    },
  ],
  locations: [
    {
      kind: 'polygon',
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
  ],
  budgets: [
    {
      name: 'Original at FFGA',
      cost: Money.fromDecimal(1578300000, Currencies.USD),
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=3',
    },
    {
      name: 'Current Estimate',
      forecast: true,
      cost: Money.fromDecimal(1578300000, Currencies.USD),
      source:
        'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf#page=3',
    },
  ],
  categories: ['construction', 'transit', 'underground'],
  notes: [
    // oversight report
    'https://www.sfmta.com/sites/default/files/reports/2017/1708_PMOC.pdf',
    // lay piece
    'https://sf.curbed.com/2017/7/25/16019566/chinatown-san-francisco-central-subway',
    // journalism (mostly negative pieces here)
    'http://escholarship.org/uc/item/387160wq', // 2012
    // 2014 whistleblower
    'https://archives.sfweekly.com/sanfrancisco/covering-their-tracks-the-' +
      'central-subway-project-buries-millions-in-a-deep-dark-place/Content?oid=2949067',
  ],
  players: [
    // federal funding ~88%?
    // Chinatown politics?
  ],
  mediaUrls: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/' +
      'Salesforce_Tower_during_construction%2C_January_2017.jpg/' +
      '1920px-Salesforce_Tower_during_construction%2C_January_2017.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Salesforce_Tower_April_2017.jpg',
  ],
  resourceUrls: ['https://en.wikipedia.org/wiki/Salesforce_Tower'],
}

export default centralSubway
