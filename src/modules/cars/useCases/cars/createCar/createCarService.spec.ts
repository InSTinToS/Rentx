import { CreateCarService } from './createCarService'

import { AppError } from '@shared/errors/AppError'

import { CarsRepositoryInMemory } from '@modules/cars/infra/typeorm/repositories/cars/CarsRepositoryInMemory'

const newCarData = {
  name: 'name',
  brand: 'brand',
  daily_rate: 99,
  fine_amount: 999,
  description: 'description',
  category_id: 'category_id',
  license_plate: 'license_plate'
}

let createCarService: CreateCarService
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarService = new CreateCarService(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarService.execute(newCarData)

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a new car with license place already registered', async () => {
    const newCar = {
      ...newCarData,
      license_plate: 'license_plate_to_throw_error'
    }

    await createCarService.execute(newCar)

    expect(async () => {
      await createCarService.execute(newCar)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarService.execute({
      ...newCarData,
      license_plate: '3'
    })

    expect(car.available).toBe(true)
  })
})
