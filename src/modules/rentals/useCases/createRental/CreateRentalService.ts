import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

import { IRentalRepository } from '@modules/rentals/infra/typeorm/repositories/IRentalRepository'
import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/cars/ICarsRepository'

import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
  car_id: string
  expected_date: Date
}

@injectable()
class CreateRentalService {
  constructor(
    @inject('RentalRepository')
    private rentalsRepository: IRentalRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(createData: IRequest) {
    const { car_id, user_id, expected_date } = createData

    const unavailableCar = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    )

    if (unavailableCar) throw new AppError('Car is unavailable')

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )

    if (rentalOpenToUser)
      throw new AppError("There's a rental in progress for this user")

    const compare = this.dateProvider.compare(
      this.dateProvider.dateNow(),
      expected_date,
      'h'
    )

    const minHour = 24

    if (compare < minHour)
      throw new AppError(
        `Min duration must be equal or greater than ${minHour}h`
      )

    const rental = await this.rentalsRepository.create(createData)

    await this.carsRepository.updateAvailable(rental.car_id, false)

    return rental
  }
}

export { CreateRentalService }
