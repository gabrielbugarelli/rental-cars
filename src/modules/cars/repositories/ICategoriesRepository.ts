import { Category } from "../models/category.model";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create({name, description}: ICreateCategoryDTO): void;
  list(): Category[];
  findByName(name: string): Category;
}