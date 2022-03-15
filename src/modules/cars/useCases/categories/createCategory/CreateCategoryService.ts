import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '../../../infra/typeorm/repositories/categories/ICategoriesRepository'

import { AppError } from '@shared//errors/AppError'

import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    )

    if (categoryAlreadyExists)
      throw new AppError('Category already exists', 400)

    await this.categoriesRepository.create({ description, name })
  }
}
