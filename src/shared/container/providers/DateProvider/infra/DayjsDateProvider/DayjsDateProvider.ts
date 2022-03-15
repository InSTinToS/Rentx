import 'reflect-metadata'

import {
  AddTime,
  Compare,
  ConvertToUTC,
  DateNow,
  IDateProvider,
  IsBeforeDate
} from '../../IDateProvider'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  dateNow: DateNow = () => dayjs().toDate()

  addTime: AddTime = (days, unit) => dayjs().add(days, unit).toDate()

  convertToUTC: ConvertToUTC = date => dayjs(date).utc().local().format()

  isBeforeDate: IsBeforeDate = (startDate, endDate) =>
    dayjs(startDate).isBefore(endDate)

  compare: Compare = (startDate, endDate, unit) =>
    dayjs(this.convertToUTC(endDate)).diff(this.convertToUTC(startDate), unit)
}

export { DayjsDateProvider }
