import { Router } from "express";

import { getCustomers, getCustomerById, setCustomer, updateCustomer } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers", setCustomer);
customersRouter.put("/customers/:id", updateCustomer);

export default customersRouter;