import 'reflect-metadata';
import '../../containers';
import 'express-async-errors';

import createConnection from '../typeorm';
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import { AppError } from '../../../errors/AppError';

createConnection();
const applicationBootstrap = express();

applicationBootstrap.use(express.json());
applicationBootstrap.use(router);

applicationBootstrap.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({message: error.message})
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`
  });
})

export { applicationBootstrap };