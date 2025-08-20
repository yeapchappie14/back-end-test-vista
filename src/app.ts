import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { requestLogger } from "./middleware/logger";
import companyRoutes from "./routes/companies";
import serviceRoutes from "./routes/services";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/companies", companyRoutes);
app.use("/services", serviceRoutes);

export default app;
