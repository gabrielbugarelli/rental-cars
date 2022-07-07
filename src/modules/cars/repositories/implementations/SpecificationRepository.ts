import { Specification } from "../../models/specification.model";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository{
  private specification: Specification[];

  private static INSTANCE: SpecificationRepository;

  constructor() {
    this.specification = [];
  }

  public static getInstance(): SpecificationRepository {
    if(!SpecificationRepository.INSTANCE) {
        return SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    
    return SpecificationRepository.INSTANCE;
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