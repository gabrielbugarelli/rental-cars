import express from "express";

const AplicationBootstrap = express();

AplicationBootstrap.listen(3333, () => {
  console.log('Aplication started on port: 3333 🚀')
});