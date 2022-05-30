import { Router } from "express";

import { getRentals, setRentals, returnGame, deleteRental } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", setRentals);
rentalsRouter.post("/rentals/:id/return", returnGame);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;