import { RentalEntity } from "../../infra/typeorm/entities/RentalEntity";
import { IRentalsRepository } from "../contracts/IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository{
  private readonly repository: RentalEntity[] = [];

  async findOpenRentalByCar(car_id: string): Promise<RentalEntity> {
    return this.repository.find(rental => rental.car_id === car_id && rental.end_date === null);
  }
  
  async findOpenRentalByUser(user_id: string): Promise<RentalEntity> {
    return this.repository.find(rental => rental.user_id === user_id);
  }

}