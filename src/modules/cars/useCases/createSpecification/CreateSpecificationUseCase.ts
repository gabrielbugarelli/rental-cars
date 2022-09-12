import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/contracts/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  private specificationsRepository: ISpecificationsRepository;

  constructor(@inject('SpecificationsRepository') specificationsRepository: ISpecificationsRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  async execute({name, description}: IRequest): Promise<void>  {
    const specificationAlreadExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadExists) {
      throw new Error("Specificatin already exists!");
    }

    await this.specificationsRepository.create({name, description});
  }
}