import { RentalEntity } from "../../infra/typeorm/entities/RentalEntity";

export interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<RentalEntity>;
  findOpenRentalByUser(user_id: string): Promise<RentalEntity>;
}