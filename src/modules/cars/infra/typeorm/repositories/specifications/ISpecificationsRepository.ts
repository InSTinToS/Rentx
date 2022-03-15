import { Specification } from '@modules/cars/infra/typeorm/models/Specification'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  findByIds(ids: string[]): Promise<Specification[]>
  findByName(name: string): Promise<Specification | undefined>
  create({ description, name }: ICreateSpecificationDTO): Promise<Specification>
}

export { ISpecificationsRepository, ICreateSpecificationDTO }
