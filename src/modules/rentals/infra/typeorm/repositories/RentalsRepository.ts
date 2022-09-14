import { getRepository, Repository } from "typeorm";
import { IRentalsRepository } from "../../../repositories/contracts/IRentalsRepository";
import { RentalEntity } from "../entities/RentalEntity";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<RentalEntity>;

  constructor() {
    this.repository = getRepository(RentalEntity);
  }

  findOpenRentalByCar(car_id: string): Promise<RentalEntity> {
    throw new Error("Method not implemented.");
  }
  findOpenRentalByUser(user_id: string): Promise<RentalEntity> {
    throw new Error("Method not implemented.");
  }

}