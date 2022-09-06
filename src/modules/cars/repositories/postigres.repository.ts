import { Category } from "../infra/typeorm/entities/CategoryEntity";
import { ICategoriesRepository, ICreateCategoryDTO } from "./contracts/ICategoriesRepository";

export class PostgresRepository implements ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void> {
    console.log(name, description);
    return null;
  }
  list(): Promise<Category[]> {
    return null;
  }
  findByName(name: string): Promise<Category> {
    console.log(name);
    return null;
  }
}