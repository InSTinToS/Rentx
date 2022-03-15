import { CreateCarSpecificationsService } from './CreateCarSpecificationsService'
import { FakeCar } from '../../cars/readCars/ReadCarsService.spec'

import { AppError } from '@shared/errors/AppError'

import { CarsRepositoryInMemory } from '@modules/cars/infra/typeorm/repositories/cars/CarsRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '@modules/cars/infra/typeorm/repositories/specifications/SpecificationsRepositoryInMemory'

import { v4 } from 'uuid'

let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepository: SpecificationsRepositoryInMemory
let createCarSpecificationsService: CreateCarSpecificationsService

describe('Create Car Specifications', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepository = new SpecificationsRepositoryInMemory()
    createCarSpecificationsService = new CreateCarSpecificationsService(
      carsRepositoryInMemory,
      specificationsRepository
    )
  })

  it('should not be able to specification to create car if car not exists', async () => {
    const car_id = v4()
    const specifications_id = [v4(), v4()]

    expect(async () => {
      await createCarSpecificationsService.execute({
        car_id,
        specifications_id
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create car specification', async () => {
    const car = new FakeCar()

    const specification = await specificationsRepository.create({
      description: 'desc',
      name: 'name'
    })

    const createdCar = await carsRepositoryInMemory.create(car)

    const carSpecifications = await createCarSpecificationsService.execute({
      car_id: createdCar.id,
      specifications_id: [specification.id]
    })

    expect(carSpecifications).toHaveProperty('specifications')
    expect(carSpecifications.specifications.length).toBe(1)
  })
})
