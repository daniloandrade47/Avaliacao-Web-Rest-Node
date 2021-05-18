import { Router } from "express";
import { ClientController } from "./controllers/ClientController";
import { ProductController } from "./controllers/ProductController";

const routes = Router();

const clientController = new ClientController();
const productController = new ProductController();

routes.post("/clientes", clientController.create);
routes.get("/clientes", clientController.findAll);

routes.post("/produtos", productController.create);
  
export { routes };