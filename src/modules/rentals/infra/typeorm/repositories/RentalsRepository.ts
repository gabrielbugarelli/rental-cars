import { getRepository, Repository } from "typeorm";
import { CreateRentalDTO } from "../../../dtos/CreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/contracts/IRentalsRepository";
import { RentalEntity } from "../entities/RentalEntity";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<RentalEntity>;

  constructor() {
    this.repository = getRepository(RentalEntity);
  }
  
  async create(payload: CreateRentalDTO): Promise<RentalEntity> {
    const rental = this.repository.create(payload);
    await this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<RentalEntity> {
    const openByCar = await this.repository.findOne({car_id});
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<RentalEntity> {
    const openByUser = await this.repository.findOne({user_id});
    return openByUser;
  }

}