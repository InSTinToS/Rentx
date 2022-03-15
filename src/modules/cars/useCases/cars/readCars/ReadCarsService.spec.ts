import { CreateCarService } from '../createCar/createCarService'
import { ReadCarsService } from './ReadCarsService'

import { AppError } from '@shared/errors/AppError'

import { CarsRepositoryInMemory } from '@modules/cars/infra/typeorm/repositories/cars/CarsRepositoryInMemory'
import { Car } from '@modules/cars/infra/typeorm/models/Car'
import { Category } from '@modules/cars/infra/typeorm/models/Category'
import { Specification } from '@modules/cars/infra/typeorm/models/Specification'

import { v4 } from 'uuid'

export class FakeCar implements Car {
  id?: string
  category_id?: string
  name: string
  brand: string
  daily_rate: number
  fine_amount: number
  license_plate: string
  available: boolean
  description: string
  created_at: Date
  category: Category
  specifications: Specification[]

  constructor() {
    this.name = 'name'
    this.brand = 'brand'
    this.daily_rate = 99
    this.fine_amount = 99
    this.available = true
    this.license_plate = v4()
    this.description = 'description'
    this.category_id = v4()
  }
}

let readCarsService: ReadCarsService
let createCarService: CreateCarService
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Read cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    readCarsService = new ReadCarsService(carsRepositoryInMemory)
    createCarService = new CreateCarService(carsRepositoryInMemory)
  })

  it('should be able to read available and unavailable cars when is authenticated', async () => {
    const fakeAvailableCar = new FakeCar()
    const fakeUnavailableCar = new FakeCar()

    fakeUnavailableCar.available = false

    const createdAvailableCar = await createCarService.execute(fakeAvailableCar)
    const createdUnavailableCar = await createCarService.execute(
      fakeUnavailableCar
    )

    const cars = await readCarsService.execute({ isAuthenticated: true })

    expect(cars).toEqual([createdAvailableCar, createdUnavailableCar])
  })

  it("should not be able to filter by unavailable when isn't authenticated", async () => {
    expect(
      async () =>
        await readCarsService.execute({
          isAuthenticated: false,
          available: 'false'
        })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to filter by unavailable cars when is authenticated', async () => {
    const fakeAvailableCar = new FakeCar()
    const fakeUnavailableCar = new FakeCar()

    fakeAvailableCar.available = true
    fakeUnavailableCar.available = false

    const createdUnavailableCar = await createCarService.execute(
      fakeUnavailableCar
    )

    await createCarService.execute(fakeAvailableCar)

    const filteredCars = await readCarsService.execute({
      available: 'false',
      isAuthenticated: true
    })

    expect(filteredCars).toEqual([createdUnavailableCar])
  })

  it('should be able to filter by available cars', async () => {
    const fakeAvailableCar = new FakeCar()
    const fakeUnavailableCar = new FakeCar()

    fakeAvailableCar.available = true
    fakeUnavailableCar.available = false

    const createdAvailableCar = await createCarService.execute(fakeAvailableCar)
    await createCarService.execute(fakeUnavailableCar)

    const filteredCars = await readCarsService.execute({
      available: 'true',
      isAuthenticated: true
    })

    const filteredCarsNotAuthenticated = await readCarsService.execute({
      isAuthenticated: false
    })

    expect(filteredCars).toEqual([createdAvailableCar])
    expect(filteredCarsNotAuthenticated).toEqual([createdAvailableCar])
  })

  it('should be able find by license_plate', async () => {
    const fakeCar = new FakeCar()
    const fakeCarToNotBeFound = new FakeCar()

    const createdCar = await createCarService.execute(fakeCar)
    await createCarService.execute(fakeCarToNotBeFound)

    const cars = await readCarsService.execute({
      license_plate: fakeCar.license_plate,
      isAuthenticated: false
    })

    expect(cars).toEqual(createdCar)
  })

  it('should be able to filter by name', async () => {
    const fakeCar = new FakeCar()
    const fakeCarToNotBeFound = new FakeCar()

    fakeCar.name = 'find my name'

    const createdCar = await createCarService.execute(fakeCar)
    await createCarService.execute(fakeCarToNotBeFound)

    const cars = await readCarsService.execute({
      name: 'find my name',
      isAuthenticated: false
    })

    expect(cars).toEqual([createdCar])
  })

  it('should be able to filter by category_id', async () => {
    const fakeCar = new FakeCar()
    const fakeCarToNotBeFound = new FakeCar()

    const createdCar = await createCarService.execute(fakeCar)
    await createCarService.execute(fakeCarToNotBeFound)

    const cars = await readCarsService.execute({
      category_id: fakeCar.category_id,
      isAuthenticated: false
    })

    expect(cars).toEqual([createdCar])
  })

  it('should be able to filter by brand', async () => {
    const fakeCar = new FakeCar()
    const fakeCarToNotBeFound = new FakeCar()

    fakeCar.brand = 'find my brand'

    const createdCar = await createCarService.execute(fakeCar)
    await createCarService.execute(fakeCarToNotBeFound)

    const cars = await readCarsService.execute({
      brand: 'find my brand',
      isAuthenticated: false
    })

    expect(cars).toEqual([createdCar])
  })
})
