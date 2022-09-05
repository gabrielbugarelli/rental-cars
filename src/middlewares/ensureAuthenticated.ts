import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/respositories/implementations/UsersRepository";

export async function ensureAuthenticated(request: Request, __: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error('Token is missing!');
  }

  const [_, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '3272357538782F413F4428472D4B6150');

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(String(user_id));

    if (!user) {
      throw new Error('User does not exists!');
    }

    next();
    
  } catch (error) {
    throw new Error('Ivalid token!');
  }
}