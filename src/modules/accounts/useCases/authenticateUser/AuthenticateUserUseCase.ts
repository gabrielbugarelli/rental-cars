import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../respositories/contracts/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  };

  async execute({email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    
    if(!user) {
      throw new AppError('Email or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const token = sign({}, '3272357538782F413F4428472D4B6150', {
      subject: user.id,
      expiresIn: '1d'
    });

    let userTokenResponse: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }

    return userTokenResponse;
  }
}