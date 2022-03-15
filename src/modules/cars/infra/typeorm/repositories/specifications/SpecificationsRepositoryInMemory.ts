import { Specification } from '../../models/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository
} from './ISpecificationsRepository'

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = []

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification =>
      ids.includes(specification.id)
    )
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => name === specification.name
    )
  }

  async create(createData: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, createData)

    this.specifications.push(specification)

    return specification
  }
}

export { SpecificationsRepositoryInMemory }
