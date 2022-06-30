import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const applicationBootstrap = express();

applicationBootstrap.use(express.json());

applicationBootstrap.use('/categories', categoriesRoutes);
applicationBootstrap.use('/specifications', specificationsRoutes);

applicationBootstrap.listen(3333, () => {
  console.log('Aplication started on port: 3333 🚀')
});