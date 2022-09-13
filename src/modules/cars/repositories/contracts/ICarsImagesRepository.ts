import { CarImageEntity } from "../../infra/typeorm/entities/UploadCarImageEntity";

export interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImageEntity>;
}