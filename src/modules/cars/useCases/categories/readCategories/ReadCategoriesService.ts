import { Category } from '../../../infra/typeorm/models/Category'
import { ICategoriesRepository } from '../../../infra/typeorm/repositories/categories/ICategoriesRepository'

import { inject, injectable } from 'tsyringe'

@injectable()
class ReadCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  execute(): Promise<Category[]> {
    return this.categoriesRepository.read()
  }
}

export { ReadCategoriesService }
