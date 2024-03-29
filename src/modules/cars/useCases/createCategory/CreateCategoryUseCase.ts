import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/contracts/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  private categoriesRepository: ICategoriesRepository

  constructor(@inject("CategoriesRepository") categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadExits = await this.categoriesRepository.findByName(name);

    if(categoryAlreadExits) {
      throw new AppError("Category already exists!");
    }
  
    this.categoriesRepository.create({name, description});
  }
}