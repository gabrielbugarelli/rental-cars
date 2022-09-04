import { Specification } from "../../entities/SpecificationEntity";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create({name, description}: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}