import { AppError } from '@shared/errors/AppError'

import {
  ICarsRepository,
  ICreateCarDTO
} from '@modules/cars/infra/typeorm/repositories/cars/ICarsRepository'
import { Car } from '@modules/cars/infra/typeorm/models/Car'

import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(newCarData: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      newCarData.license_plate
    )

    if (carAlreadyExists)
      throw new AppError('Car with this license_plate already exists')

    const car = await this.carsRepository.create(newCarData)

    return car
  }
}

export { CreateCarService }
