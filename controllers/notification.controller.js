import { Notification, Request } from "../db";
import { serverResponse } from "../helpers/util";
import { v4 as uuidV4 } from "uuid";

export const requestToken = (req, res) => {
  const data = { ...req.body, status: "PENDING", token: "", isActive: false };
  const newRequest = Request.create(data);
  return serverResponse(res, 201, "Success", newRequest);
};

export const approveOrRejectRequest = (req, res) => {
  let data = { status: "REJECTED", token: "", isActive: false };
  if (req.body.status === "APPROVED") {
    const formatedToken = `NA.${uuidV4()}.${Date.now()}`;
    data = { status: "APPROVED", token: formatedToken, isActive: true };
  }
  const updatedRequest = Request.update(
    data,
    (item) => item.id === req.params.requestId
  );
  return serverResponse(res, 200, "Updated", updatedRequest);
};

export const sendNotification = (req, res) => {
  const request = Request.findOne(
    (item) => item.token === req.query.clientToken
  );
  const data = { ...req.body, from: request.email, request };
  const newNotitication = Notification.create(data);
  return serverResponse(res, 201, "Successfully sent", newNotitication);
};
