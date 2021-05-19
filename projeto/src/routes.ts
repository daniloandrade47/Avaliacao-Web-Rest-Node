import { Router } from "express";
import { ClientController } from "./controllers/ClientController";
import { ProductController } from "./controllers/ProductController";

const routes = Router();

const clientController = new ClientController();
const productController = new ProductController();

// Routes for Entity Client
routes.post("/clientes", clientController.create);
routes.get("/clientes", clientController.findAll);
routes.get("/clientes/id/:id", clientController.findByID);
routes.get("/clientes/email/:email", clientController.findByEmail);
routes.put("/clientes", clientController.update);


// Routes for Entity Product
routes.post("/produtos", productController.create);
routes.get("/produtos", productController.findAll);
routes.get("/produtos/id/:id", productController.findByID);
routes.put("/produtos", productController.update);

  
export { routes };