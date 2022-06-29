import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";

const applicationBootstrap = express();

applicationBootstrap.use(express.json());

applicationBootstrap.use('/categories', categoriesRoutes);

applicationBootstrap.listen(3333, () => {
  console.log('Aplication started on port: 3333 🚀')
});