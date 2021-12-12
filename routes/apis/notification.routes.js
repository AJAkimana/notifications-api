import { Router } from "express";
import {
  approveOrRejectRequest,
  requestToken,
  sendNotification,
} from "../../controllers/notification.controller";
import {
  doesRequestExits,
  isNoticationValid,
  isRequestValid,
  isTokenValid,
} from "../../middlewares/notification.middleware";

const notificationRoutes = Router();

notificationRoutes.post("/request", isRequestValid, requestToken);
notificationRoutes.post(
  "/activate/:requestId",
  doesRequestExits,
  approveOrRejectRequest
);
notificationRoutes.post(
  "/send",
  isTokenValid,
  isNoticationValid,
  sendNotification
);

export default notificationRoutes;
