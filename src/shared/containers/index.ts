import { container } from 'tsyringe';

import '../containers/providers/';

import { ICategoriesRepository } from '../../modules/cars/repositories/contracts/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/contracts/ISpecificationsRepository';
import { IUsersRepository } from '../../modules/accounts/respositories/contracts/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsRepository } from '../../modules/cars/repositories/contracts/ICarsRepository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsImagesRepository } from '../../modules/cars/repositories/contracts/ICarsImagesRepository';
import { CarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { IRentalsRepository } from '../../modules/rentals/repositories/contracts/IRentalsRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository
);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);