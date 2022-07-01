import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  private specificationRepository: ISpecificationRepository

  constructor(specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  execute({name, description}: IRequest): void  {
    const specificationAlreadExists = this.specificationRepository.findByName(name);

    if (specificationAlreadExists) {
      throw new Error("Specificatin already exists!");
    }

    this.specificationRepository.create({name, description});
  }
}