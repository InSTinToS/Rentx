import { Rental } from '../models/Rental'

export interface ICreateRentalDTO {
  user_id: string
  car_id: string
  expected_date: Date
  id?: string
  end_date?: Date
}

interface IRentalRepository {
  findByUser(user_id: string): Promise<Rental[]>
  findOpenRentalByCar(car_id: string): Promise<Rental>
  create(createData: ICreateRentalDTO): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>
  findById(id: string): Promise<Rental>
}

export { IRentalRepository }
