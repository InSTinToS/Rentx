import { AppError } from '@shared/errors/AppError'

import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/cars/ICarsRepository'

import { inject, injectable } from 'tsyringe'

interface IRequest {
  name?: string
  brand?: string
  isAuthenticated: boolean
  available?: string
  category_id?: string
  license_plate?: string
}

@injectable()
class ReadCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    available,
    license_plate,
    isAuthenticated,
    ...otherFilters
  }: IRequest) {
    if (!isAuthenticated && available === 'false')
      throw new AppError('Must be authenticated to read unavailable cars', 401)

    if (license_plate) {
      const foundCarByLicensePlate =
        await this.carsRepository.findByLicensePlate(license_plate)

      return foundCarByLicensePlate.available
        ? foundCarByLicensePlate
        : undefined
    }

    if (isAuthenticated) {
      const filteredCars = await this.carsRepository.filterByQuery({
        available: available,
        ...otherFilters
      })

      return filteredCars
    } else {
      const filteredAvailableCars = await this.carsRepository.filterByQuery({
        available: 'true',
        ...otherFilters
      })

      return filteredAvailableCars
    }
  }
}
//? && -> imprime o primeiro falso ou o ultimo verdadeiro

export { ReadCarsService }
