import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

export async function ensureAuthenticated(request: Request, __: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError('Token is missing!', 401);
  }

  const [_, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '3272357538782F413F4428472D4B6150');

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(String(user_id));

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: String(user_id)
    }

    return next();
    
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}