import { Category } from "../../infra/typeorm/entities/CategoryEntity";
import { ICategoriesRepository, ICreateCategoryDTO } from "../contracts/ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category(name, description, new Date());
    this.categories.push(...this.categories, category);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}