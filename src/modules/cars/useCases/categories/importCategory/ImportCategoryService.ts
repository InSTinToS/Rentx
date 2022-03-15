import { ICategoriesRepository } from '../../../infra/typeorm/repositories/categories/ICategoriesRepository'

import { parse as csvParse } from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

interface IImportCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []

      const parseFile = csvParse({})
      const stream = fs.createReadStream(file.path)

      stream.pipe(parseFile)

      parseFile
        .on('data', async line => {
          const [name, description] = line
          categories.push({ name, description })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', error => reject(error))
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async category => {
      const { name, description } = category

      const existCategory = await this.categoriesRepository.findByName(name)

      if (!existCategory)
        this.categoriesRepository.create({ name, description })
    })
  }
}

export { ImportCategoryService }
