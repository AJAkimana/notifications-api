import express from "express";
import { serverResponse } from "../helpers";
import apisRoutes from "./apis";

const routes = express.Router();

routes.use("/api", apisRoutes);
routes.all("*", (req, res) => serverResponse(res, 404, "Route does not exist"));

export default routes;
