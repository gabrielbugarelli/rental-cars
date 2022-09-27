import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  async handle(request: Request, respons: Response) {
    const id = request.user.id
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const avatar_file = request.file.filename;

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    response.status(204).send({ updated: true });
  }
}