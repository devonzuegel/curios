import * as Money from 'ts-money'

import * as MapboxGl from 'mapbox-gl'

type TName = string
type TDate = {
  date: Date
  title: string
  source?: string
  forecast?: boolean
  notes: string[]
}
type TCategory = string
type TNote = string
type TPlayer = string
type TMediaUrl = string
type TResourceUrl = string
type TBudget = {
  cost: Money.Money
  name?: string
  source?: string
  forecast?: boolean
}

type TCoordinates = number[]
type TPolygon = {kind: 'polygon'; coordinates: TCoordinates[]; source?: string}
type TPoint = {kind: 'point'; coordinates: TCoordinates; source?: string}

export type TProject = {
  names: TName[]
  keyDates: TDate[]
  locations: TPolygon[] | TPoint[]
  budgets: TBudget[]
  categories: TCategory[]
  notes: TNote[]
  players: TPlayer[]
  mediaUrls: TMediaUrl[]
  resourceUrls: TResourceUrl[]
}
