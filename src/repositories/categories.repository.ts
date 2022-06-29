import { Category } from "../models/category.model";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category(name, description, new Date());

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }
}