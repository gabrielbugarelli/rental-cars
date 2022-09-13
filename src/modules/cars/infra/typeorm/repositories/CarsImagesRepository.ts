import { getRepository, Repository } from "typeorm";
import { ICarsImagesRepository } from "../../../repositories/contracts/ICarsImagesRepository";
import { CarImageEntity } from "../entities/UploadCarImageEntity";

export class CarsImagesRepository implements ICarsImagesRepository{
  private repository: Repository<CarImageEntity>;

  constructor() {
    this.repository = getRepository(CarImageEntity);
  }

  async create(car_id: string, image_name: string): Promise<CarImageEntity> {
    const carImage = this.repository.create({car_id, image_name});
    await this.repository.save(carImage);

    return carImage;
  }
}