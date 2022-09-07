import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let car = {
  name: 'Cadilac',
  brand: 'brand car',
  category_id: '213123123',
  daily_rate: 20,
  description: 'description car',
  fine_amount: 2,
  license_plate: 'license plate car',
};

let carTestError = {...car};

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory); 
  });

  it('should be able to create a new car', async () => {
    const response = await createCarUseCase.execute(car);

    expect(response).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    const response = await createCarUseCase.execute(car);

    expect(response.available).toBe(true);
  });

  it('should not be able to create a car with exists license plate', async () => {
    await expect( async () => {
      await createCarUseCase.execute(car);
      await createCarUseCase.execute(carTestError);
    }).rejects.toBeInstanceOf(AppError);
  });
});