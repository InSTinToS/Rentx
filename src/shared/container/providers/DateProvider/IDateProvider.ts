type UnitTypeDate = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'

type DateNow = () => Date
type ConvertToUTC = (date: Date) => string
type AddTime = (time: number, unit: UnitTypeDate) => Date
type IsBeforeDate = (startDate: Date, endDate: Date) => boolean
type Compare = (startDate: Date, endDate: Date, unit: UnitTypeDate) => number

interface IDateProvider {
  addTime: AddTime
  compare: Compare
  dateNow: DateNow
  isBeforeDate: IsBeforeDate
  convertToUTC: ConvertToUTC
}

export type {
  AddTime,
  Compare,
  DateNow,
  IsBeforeDate,
  ConvertToUTC,
  IDateProvider
}
