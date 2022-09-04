import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/CategoryEntity";
import { ICategoriesRepository } from "../../repositories/contracts/ICategoriesRepository";

@injectable()
export class ListCategoryUseCase {
  private categoryRepository: ICategoriesRepository;

  constructor(@inject('CategoriesRepository') categoryRepository: ICategoriesRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(): Promise<Category[]> {
    const allCategory = await this.categoryRepository.list();
    return allCategory;
  }
}