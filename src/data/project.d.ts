import * as Money from 'ts-money'

type TName = string
type TDate = {
  date: Date
  title: string
  notes: string[]
}
type TBudget = number
type TCategory = string
type TNote = string
type TPlayer = string
type TMediaUrl = string
type TResourceUrl = string

// A location can be a single point or a polygon region
type TCoordinate = [number, number]
type TPolygon = TCoordinate[]
type TLocation = TPolygon | TCoordinate

export type TProject = {
  names: TName[]
  keyDates: TDate[]
  locations: TLocation[]
  budgets: Money.Money[]
  categories: TCategory[]
  notes: TNote[]
  players: TPlayer[]
  mediaUrls: TMediaUrl[]
  resourceUrls: TResourceUrl[]
}
