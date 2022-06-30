import { Specification } from "../models/specification.model";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create({name, description}: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}