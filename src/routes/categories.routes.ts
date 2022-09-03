import { Router, Request, Response } from 'express';
import multer from 'multer';

import { listCategoryController } from '../modules/cars/useCases/listCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp'
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return listCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single("file"), (request: Request, response: Response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
