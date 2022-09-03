import { Category } from "../entities/CategoryEntity";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

export class PostgresRepository implements ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
    return null;
  }
  list(): Category[] {
    return null;
  }
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
}