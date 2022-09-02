import { ImportCategoriesRepository } from "../../repositories/implementations/ImportCategoriesRepository";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

const importCategoriesRepository = new ImportCategoriesRepository();
const importCategoryUseCase = new ImportCategoryUseCase(importCategoriesRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };