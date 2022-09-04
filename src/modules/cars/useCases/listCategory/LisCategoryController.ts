import { Request, Response } from "express"
import { container } from "tsyringe";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoryController {
  async handle (_: Request, response: Response) {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);
    const data = await listCategoryUseCase.execute();

    return response.status(200).send(data);
  }
}