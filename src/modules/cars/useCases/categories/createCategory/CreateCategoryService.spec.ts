import { CategoriesRepositoryInMemory } from '../../../infra/typeorm/repositories/categories/CategoriesRepositoryInMemory'
import { CreateCategoryService } from './CreateCategoryService'

import { AppError } from '@shared//errors/AppError'

let createCategoryService: CreateCategoryService
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create cateogory', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryService = new CreateCategoryService(
      categoriesRepositoryInMemory
    )
  })

  it('Should be able to create a new cateogory', async () => {
    const newCategory = {
      name: 'Category name test',
      description: 'Category description test'
    }

    await createCategoryService.execute(newCategory)

    const foundCategory = await categoriesRepositoryInMemory.findByName(
      newCategory.name
    )

    expect(foundCategory).toHaveProperty('id')
  })

  it('Should not be able to create a new cateogory with same name', async () => {
    const newCategory = {
      name: 'Category name test',
      description: 'Category description test'
    }

    await createCategoryService.execute(newCategory)

    expect(async () => {
      await createCategoryService.execute(newCategory)
    }).rejects.toBeInstanceOf(AppError)
  })
})
