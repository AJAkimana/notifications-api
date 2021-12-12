import express from "express";
import notificationRoutes from "./notification.routes";

const routers = express.Router();

routers.use("/notifications", notificationRoutes);

export default routers;
