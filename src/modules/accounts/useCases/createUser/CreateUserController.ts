import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUSerUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {name, username, email, password, driver_license} = request.body;
    const createUserUseCase: CreateUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({name, username, email, password, driver_license});

    return response.status(201).send({created: true});
  }
}