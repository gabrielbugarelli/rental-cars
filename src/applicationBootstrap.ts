import 'reflect-metadata';
import './database';
import './shared/containers';

import express from "express";
import { router } from "./routes";

const applicationBootstrap = express();

applicationBootstrap.use(express.json());
applicationBootstrap.use(router);

applicationBootstrap.listen(3333, () => {
  console.log('Aplication started on port: 3333 🚀')
});