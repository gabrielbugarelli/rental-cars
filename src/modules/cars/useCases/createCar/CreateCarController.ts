import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const payload = request.body as IRequest;
    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute(payload);

    return response.status(201).json(car);
  }
}