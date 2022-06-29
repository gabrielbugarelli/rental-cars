import { Router, Request, Response } from 'express';
import { CategoriesRepository } from '../repositories/categories.repository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;
  const categoryAlreadExits = categoriesRepository.findByName(name);

  if(categoryAlreadExits) {
    return response.status(400).json({error: 'Category Already Exists!'});
  }

  categoriesRepository.create({name, description});
  return response.status(201).send({created: true});
});

categoriesRoutes.get('/', (_: Request, response: Response) => {
  return response.status(200).send(categoriesRepository.list());
});

export { categoriesRoutes };
