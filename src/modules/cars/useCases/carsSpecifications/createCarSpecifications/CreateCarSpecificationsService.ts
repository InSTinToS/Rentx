import { AppError } from '@shared/errors/AppError'

import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/cars/ICarsRepository'
import { ISpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/specifications/ISpecificationsRepository'
import { Car } from '@modules/cars/infra/typeorm/models/Car'

import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarSpecificationsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) throw new AppError('Car does not exist', 400)

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    )

    carExists.specifications = specifications

    return await this.carsRepository.create(carExists)
  }
}

export { CreateCarSpecificationsService }
