import { Request, Response, Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/createSpecification.service";

export const specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationsRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;
  const createSpecificationService = new CreateSpecificationService(specificationRepository);

  createSpecificationService.execute({name, description});
  return response.status(201).send({created: true});
});