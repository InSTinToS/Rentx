import { ICarsRepository, ICreateCarDTO } from './ICarsRepository'

import { Car } from '@modules/cars/infra/typeorm/models/Car'

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = []

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const foundIndex = this.cars.findIndex(car => car.id === id)

    if (this.cars[foundIndex]?.available)
      this.cars[foundIndex].available = available
  }

  async create(newCarData: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, newCarData)
    this.cars.push(car)

    return car
  }

  async findById(id: string): Promise<Car> {
    return await this.cars.find(car => car.id === id)
  }

  async filterByQuery({
    name,
    brand,
    available,
    category_id
  }: {
    name?: string
    brand?: string
    available?: string
    category_id?: string
  }): Promise<Car[]> {
    let filteredCars: Car[] = []

    if (available !== undefined)
      filteredCars.push(
        ...this.cars.filter(car => String(car.available) === available)
      )
    else filteredCars.push(...this.cars)

    if (category_id)
      filteredCars = filteredCars.filter(car => car.category_id === category_id)

    if (brand) filteredCars = filteredCars.filter(car => car.brand === brand)

    if (name) filteredCars = filteredCars.filter(car => car.name === name)

    return filteredCars
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  async read(): Promise<Car[]> {
    return this.cars
  }
}

export { CarsRepositoryInMemory }
