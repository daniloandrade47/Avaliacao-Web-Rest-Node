import { Router } from "express";
import { ClientController } from "./controllers/ClientController";

const routes = Router();

const clientController = new ClientController();

routes.post("/clientes", clientController.create);
  
export { routes };