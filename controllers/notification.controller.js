import { Notification, Request } from "../db";
import { serverResponse } from "../helpers/util";

export const requestToken = (req, res) => {
  const data = { ...req.body, status: "PENDING", token: "", isActive: false };
  const newRequest = Request.create(data);
  return serverResponse(res, 201, "Success", newRequest);
};

export const approveOrRejectRequest = (req, res) => {
  const updatedRequest = Request.update(
    req.body,
    (item) => item.id === req.params.requestId
  );
  return serverResponse(res, 200, "Success", updatedRequest);
};

export const sendNotification = (req, res) => {
  const request = Request.findOne(
    (item) => item.token === req.query.clientToken
  );
  const data = { ...req.body, from: request.email, request };
  const newNotitication = Notification.create(data);
  return serverResponse(res, 201, "Success", newNotitication);
};
