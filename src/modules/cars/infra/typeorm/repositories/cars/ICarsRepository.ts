import { Specification } from '../../models/Specification'

import { Car } from '@modules/cars/infra/typeorm/models/Car'

interface ICreateCarDTO {
  id?: Car['id']
  name: Car['name']
  brand: Car['brand']
  daily_rate: Car['daily_rate']
  description: Car['description']
  fine_amount: Car['fine_amount']
  category_id?: Car['category_id']
  specifications?: Specification[]
  license_plate: Car['license_plate']
}

interface ICarsRepository {
  read(): Promise<Car[]>
  findById(id: Car['id']): Promise<Car>
  create(newCarData: ICreateCarDTO): Promise<Car>
  updateAvailable(id: Car['id'], available: boolean): Promise<void>
  findByLicensePlate(license_plate: Car['license_plate']): Promise<Car>
  filterByQuery(queryData: {
    name?: string
    brand?: string
    available?: string
    category_id?: string
  }): Promise<Car[]>
}

export { ICarsRepository }
export type { ICreateCarDTO }
