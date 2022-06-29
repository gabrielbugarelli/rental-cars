import { Router, Request, Response } from 'express';
import { CategoriesRepository } from '../repositories/categories.repository';
import { PostgresRepository } from '../repositories/postigres.repository';
import { CreateCategoryService } from '../services/createCategory.service';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();
const postgresRepository = new PostgresRepository();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;
  const createCategoryService: CreateCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({name, description});

  return response.status(201).send({created: true});
});

categoriesRoutes.get('/', (_: Request, response: Response) => {
  return response.status(200).send(categoriesRepository.list());
});

export { categoriesRoutes };
