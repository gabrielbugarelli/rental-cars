import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const category = {
    id: uuid(), 
    name, 
    description
  }

  categories.push(category);

  return response.status(201).send({created: true});
});

categoriesRoutes.get('/', (_: Request, response: Response) => {
  return response.status(200).send(categories);
});

export { categoriesRoutes };
