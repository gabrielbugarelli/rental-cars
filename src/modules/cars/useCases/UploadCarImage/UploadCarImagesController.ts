import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFales {
  filename: string;
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const images = request.files as IFales[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const fileNames = images.map((files) => files.filename);

    await uploadCarImageUseCase.execute({car_id: id, images_name: fileNames});

    response.status(201).send({created: true});
  }
}