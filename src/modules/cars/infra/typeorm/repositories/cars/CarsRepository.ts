import { ICarsRepository, ICreateCarDTO } from './ICarsRepository'

import { Car } from '@modules/cars/infra/typeorm/models/Car'

import { getRepository, Repository } from 'typeorm'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id=:id')
      .setParameters({ id })
      .execute()
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne({ id })
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
    const carsQuery = this.repository.createQueryBuilder('car')

    if (available) carsQuery.where('car.available = :available', { available })
    if (brand) carsQuery.andWhere('car.brand = :brand', { brand })
    if (name) carsQuery.andWhere('car.name = :name', { name })
    if (category_id)
      carsQuery.andWhere('car.category_id = :category_id', { category_id })

    return await carsQuery.getMany()
  }

  async read(): Promise<Car[]> {
    return await this.repository.find()
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate })
    return car
  }

  async create(newCarData: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(newCarData)
    await this.repository.save(car)
    return car
  }
}

export { CarsRepository }
