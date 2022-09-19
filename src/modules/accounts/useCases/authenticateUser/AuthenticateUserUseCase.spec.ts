import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../respositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it('should not be able to authenticate user', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Gabriel',
        email: 'gabriel@dev.com',
        password: '123457',
        driver_license: '123456'
      };
  
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({email: user.email, password: user.password});
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password!', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '2323',
        email: 'user@user.com',
        password: '124',
        name: 'User Test Error'
      };

      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({email: user.email, password:'incorrectPassword'});
    }).rejects.toBeInstanceOf(AppError);
  });
});