import { Router, Request, Response } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';
import multer from 'multer';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp'
});

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return listCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single("file"), (request: Request, response: Response) => {
  const { file } = request;
  console.log(file);
  
  return response.send();
});

export { categoriesRoutes };
