import { CategoriesRepository } from "../repositories/categories.repository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryService {
  private categoryRepository: CategoriesRepository;

  constructor(categoryRepository: CategoriesRepository) {
    this.categoryRepository = categoryRepository;
  }

  execute({ name, description }: IRequest): void {
    const categoryAlreadExits = this.categoryRepository.findByName(name);

    if(categoryAlreadExits) {
      throw new Error("Category already exists!");
    }
  
    this.categoryRepository.create({name, description});
  }
}