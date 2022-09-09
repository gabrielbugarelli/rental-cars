import { Request, Response } from "express";
import { container } from "tsyringe";
import { CarEntity } from "../../infra/typeorm/entities/CarEntity";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

type Payload = {
  category_id?: string;
  brand?: string;
  name?: string;
}

export class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response<CarEntity[]>> {
    const { category_id, brand, name, } = request.query as Payload;
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableCarsUseCase.execute({ category_id, brand, name, });

    return response.status(200).json(cars);
  }
}