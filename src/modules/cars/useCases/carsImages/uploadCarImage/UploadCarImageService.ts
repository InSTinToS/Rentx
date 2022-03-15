import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'

import { ICarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/carsImages/ICarsImagesRepository'

import { inject, injectable } from 'tsyringe'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImageService {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async image => {
      await this.carsImagesRepository.create({ car_id, image_name: image })
      await this.storageProvider.save(image, 'cars')
    })
  }
}

export { UploadCarImageService }
