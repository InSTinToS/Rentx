import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from './ICategoriesRepository'

import { Category } from '@modules/cars/infra/typeorm/models/Category'

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async read(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name)
  }

  async create(dataToCreate: ICreateCategoryDTO): Promise<void> {
    const category = new Category()
    this.categories.push(Object.assign(category, dataToCreate))
  }
}

export { CategoriesRepositoryInMemory }
