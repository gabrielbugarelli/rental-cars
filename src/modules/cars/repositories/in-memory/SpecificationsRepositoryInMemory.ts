import { Specification } from "../../infra/typeorm/entities/SpecificationEntity";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../contracts/ISpecificationsRepository";

export class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private readonly specifications: Specification[] = []; 

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification(name, description, new Date());
    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(spec => spec.name === name);
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(spec => ids.includes(spec.id));

    return specifications;
  }
}