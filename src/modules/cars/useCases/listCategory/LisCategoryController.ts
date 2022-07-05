import { Request, Response } from "express"
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoryController {
  private listCategoryUseCase: ListCategoryUseCase;

  constructor ( listCategoryUseCase: ListCategoryUseCase ) {
    this.listCategoryUseCase = listCategoryUseCase;
  }

  async handle (request: Request, response: Response) {
    const data = this.listCategoryUseCase.execute();

    return response.status(200).send(data);
  }
}