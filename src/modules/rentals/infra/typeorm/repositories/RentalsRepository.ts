import { getRepository, Repository } from "typeorm";
import { CreateRentalDTO } from "../../../dtos/CreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/contracts/IRentalsRepository";
import { RentalEntity } from "../entities/RentalEntity";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<RentalEntity>;

  constructor() {
    this.repository = getRepository(RentalEntity);
  }
  
  create(payload: CreateRentalDTO): Promise<RentalEntity> {
    throw new Error("Method not implemented.");
  }

  findOpenRentalByCar(car_id: string): Promise<RentalEntity> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByUser(user_id: string): Promise<RentalEntity> {
    throw new Error("Method not implemented.");
  }

}