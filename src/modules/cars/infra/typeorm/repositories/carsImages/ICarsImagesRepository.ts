import { CarImage } from '../../../typeorm/models/CarImage'

interface IDataToCreate {
  car_id: string
  image_name: string
}

interface ICarsImagesRepository {
  create(dataToCreate: IDataToCreate): Promise<CarImage>
}

export { ICarsImagesRepository }

export type { IDataToCreate }
