import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";
import { RentalEntity } from "../../infra/typeorm/entities/RentalEntity";

export interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<RentalEntity>;
  findOpenRentalByUser(user_id: string): Promise<RentalEntity>;
  create(payload: CreateRentalDTO): Promise<RentalEntity>;
}