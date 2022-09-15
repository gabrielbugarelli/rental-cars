import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/containers/providers/DateProvider/IDateProvider";
import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";
import { RentalEntity } from "../../infra/typeorm/entities/RentalEntity";
import { IRentalsRepository } from "../../repositories/contracts/IRentalsRepository";

dayjs.extend(utc);

@injectable()
export class CreateRentalUseCase {
  private rentalsRepository: IRentalsRepository;
  private dateProvider: IDateProvider;

  constructor(@inject("RentalsRepository") rentalsRepository: IRentalsRepository, @inject("DayJsDateProvider") dateProvider: IDateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
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

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);
    
    if(compare < minimumHour) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create(payload);

    return rental;
  }
}