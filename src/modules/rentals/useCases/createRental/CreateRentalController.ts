import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expected_return_date } = request.body as CreateRentalDTO;
    const { id } = request.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const rental = await createRentalUseCase.execute({car_id, user_id: id, expected_return_date});

    return response.status(201).json(rental);
  }
}