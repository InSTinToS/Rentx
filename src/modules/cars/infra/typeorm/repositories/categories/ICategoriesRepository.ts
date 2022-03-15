import { Category } from '@modules/cars/infra/typeorm/models/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoriesRepository {
  read(): Promise<Category[]>
  findByName(name: string): Promise<Category>
  create(dataToCreate: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO }
