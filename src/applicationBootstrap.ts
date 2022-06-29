import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";

const applicationBootstrap = express();

applicationBootstrap.use(express.json());

applicationBootstrap.use(categoriesRoutes);

applicationBootstrap.listen(3333, () => {
  console.log('Aplication started on port: 3333 🚀')
});