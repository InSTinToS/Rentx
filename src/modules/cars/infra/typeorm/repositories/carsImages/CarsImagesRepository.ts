import { CarImage } from '../../models/CarImage'
import { ICarsImagesRepository, IDataToCreate } from './ICarsImagesRepository'

import { getRepository, Repository } from 'typeorm'

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  async create(dataToCreate: IDataToCreate): Promise<CarImage> {
    const carImage = this.repository.create(dataToCreate)
    await this.repository.save(carImage)
    return carImage
  }
}

export { CarsImagesRepository }
