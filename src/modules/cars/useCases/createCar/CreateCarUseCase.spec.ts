import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory); 
  });

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Cadilac',
      brand: 'brand car',
      category_id: '213123123',
      daily_rate: 20,
      description: 'description car',
      fine_amount: 2,
      license_plate: 'license plate car'
    });
  })
})