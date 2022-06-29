import { Router, Request, Response } from 'express';
import { CategoriesRepository } from '../repositories/categories.repository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;
  categoriesRepository.create({name, description});

  return response.status(201).send({created: true});
});

categoriesRoutes.get('/', (_: Request, response: Response) => {
  // return response.status(200).send(categories);
});

export { categoriesRoutes };
