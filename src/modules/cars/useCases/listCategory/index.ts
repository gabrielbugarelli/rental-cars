import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoryController } from "./LisCategoryController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

const categoriesRepository = null;
const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);
const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController };