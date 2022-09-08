import { EntityRepository, getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/contracts/ICarsRepository";
import { CarEntity } from "../entities/CarEntity";

@EntityRepository()
export class CarsRepository implements ICarsRepository{
  private repository: Repository<CarEntity>;

  constructor() {
    this.repository = getRepository(CarEntity);
  }

  async create(payload: ICreateCarDTO): Promise<CarEntity> {
    const car = this.repository.create(payload); 

    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<CarEntity> {
    const car = await this.repository.findOne({license_plate});
    return car;
  }

}