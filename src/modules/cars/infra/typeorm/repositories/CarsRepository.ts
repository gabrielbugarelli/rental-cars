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

  async findById(car_id: string): Promise<CarEntity> {
    const car = await this.repository.findOne({id: car_id});
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<CarEntity> {
    const car = await this.repository.findOne({license_plate});
    return car;
  }

  async findAllAvailable(category_id?: string, brand?: string, name?: string): Promise<CarEntity[]> {
    const carsQuery = this.repository.createQueryBuilder("cars")
    .where("available = :available", {available: true});

    if(category_id) {
      carsQuery.andWhere("cars.category_id = :category_id", {category_id});
    }

    if(brand) {
      carsQuery.andWhere("cars.brand = :brand", {brand});
    }

    if(name) {
      carsQuery.andWhere("cars.name = :name", {name});
    }

    const cars = await carsQuery.getMany();

    return cars;
  };
}