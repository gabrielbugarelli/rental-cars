import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let car =  { 
  name: 'cars',
  brand: 'car list',
  category_id: '213123123',
  daily_rate: 20,
  description: 'description car',
  fine_amount: 2,
  license_plate: '2342334234341245235'
}

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able list cars', async () => {
    const resultCar = await carsRepositoryInMemory.create(car);

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toBeInstanceOf(Array);
    expect(cars).toEqual([resultCar]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const resultCar = await carsRepositoryInMemory.create({...car, brand: 'car category', license_plate: '72347230745'});

    const cars = await listAvailableCarsUseCase.execute({ category_id: resultCar.category_id });

    expect(cars).toEqual([resultCar]);
  });

  it('should be able to list all available cars by brand', async () => {
    const resultCar = await carsRepositoryInMemory.create({...car, brand: 'car category', license_plate: '4876237849'});

    const cars = await listAvailableCarsUseCase.execute({ brand: resultCar.brand });

    expect(cars).toEqual([resultCar]);
  });

  it('should be able to list all available cars by name', async () => {
    const resultCar = await carsRepositoryInMemory.create({...car, brand: 'car brand', license_plate: '7234891720348214'});

    const cars = await listAvailableCarsUseCase.execute({ name: resultCar.name });

    expect(cars).toEqual([resultCar]);
  });
})