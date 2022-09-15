import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";
import { RentalEntity } from "../../infra/typeorm/entities/RentalEntity";
import { IRentalsRepository } from "../contracts/IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository{
  private readonly repository: RentalEntity[] = [];

  async create(payload: CreateRentalDTO): Promise<RentalEntity> {
    const {car_id, user_id, expected_return_date} = payload;
    const rental = new RentalEntity();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });

    this.repository.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<RentalEntity> {
    return this.repository.find(rental => rental.car_id === car_id && !rental.end_date);
  }
  
  async findOpenRentalByUser(user_id: string): Promise<RentalEntity> {
    return this.repository.find(rental => rental.user_id === user_id && !rental.end_date);
  }

}