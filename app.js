import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoriesRouter from "./src/routers/categoriesRouter.js";
import gamesRouter from "./src/routers/gamesRouter.js";
import customersRouter from "./src/routers/customersRouter.js";
import rentalsRouter from "./src/routers/rentalsRouter.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.listen(process.env.PORT, () => console.log(`Server live at http://localhost/${process.env.PORT}`));