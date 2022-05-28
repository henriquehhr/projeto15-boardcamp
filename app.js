import express, {json} from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());

app.listen(process.env.PORT, () => console.log(`Server live at http://localhost/${process.env.PORT}`));