import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserEntity } from "../../infra/typeorm/entities/UserEntity";

export interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<void>;
  findByEmail(email:string): Promise<UserEntity>;
  findById(id:string): Promise<UserEntity>;
}