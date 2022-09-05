import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserEntity } from "../../entities/UserEntity";

export interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<void>;
  findByEmail(email:string): Promise<UserEntity>;
}