import { Category } from "../../models/category.model";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoryUseCase {
  private categoryRepository: ICategoriesRepository;

  constructor(categoryRepository: ICategoriesRepository) {
    this.categoryRepository = categoryRepository;
  }

  execute(): Category[] {
    const allCategory = this.categoryRepository.list();

    return allCategory;
  }
}