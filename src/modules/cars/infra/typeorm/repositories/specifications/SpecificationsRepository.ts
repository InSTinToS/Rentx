import {
  ICreateSpecificationDTO,
  ISpecificationsRepository
} from './ISpecificationsRepository'

import { Specification } from '@modules/cars/infra/typeorm/models/Specification'

import { getRepository, Repository } from 'typeorm'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids)
  }

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create(data)

    await this.repository.save(specification)

    return specification
  }

  async findByName(name: string) {
    const found = await this.repository.findOne({ name })

    return found
  }
}

export { SpecificationsRepository }
