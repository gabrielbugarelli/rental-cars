import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppError } from "../../../../errors/AppError";
import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";
import { RentalEntity } from "../../infra/typeorm/entities/RentalEntity";
import { IRentalsRepository } from "../../repositories/contracts/IRentalsRepository";

dayjs.extend(utc);

export class CreateRentalUseCase {
  private rentalsRepository: IRentalsRepository;

  constructor(rentalsRepository: IRentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute(payload: CreateRentalDTO): Promise<RentalEntity> {
    const minimumHour = 24;

    const {car_id, user_id, expected_return_date } = payload;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if(carUnavailable) {
      throw new AppError("Car is unavailable!");
    };

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if(rentalOpenToUser) {
      throw new AppError("There's a rental in progress to user!");
    }

    const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format();
    const dateNow = dayjs().utc().format();

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, 'hours');
    
    if(compare < minimumHour) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create(payload);

    return rental;
  }
}