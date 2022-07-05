import { Specification } from "../../models/specification.model";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository{
  private specification: Specification[];

  constructor() {
    this.specification = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification(name, description, new Date());
    this.specification.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specification.find(specification => specification.name === name);
    return specification;
  }
}