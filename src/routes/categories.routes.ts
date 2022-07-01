import { Router, Request, Response } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/categories.repository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (_: Request, response: Response) => {
  return response.status(200).send(categoriesRepository.list());
});

export { categoriesRoutes };
