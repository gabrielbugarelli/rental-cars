import { Request, Response, Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationUseCase } from "../modules/cars/useCases/createSpecification/CreateSpecificationUseCase";

export const specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationsRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;
  const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);

  createSpecificationUseCase.execute({name, description});
  return response.status(201).send({created: true});
});