import Joi from "joi";
import { Request } from "../db";
import { getErrorMessage, serverResponse } from "../helpers";

/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const doesRequestExits = async (req, res, next) => {
  const request = await Request.findOne(
    (item) => item.id === req.params.requestId
  );
  if (request) return next();

  return serverResponse(res, 404, "Sorry, the request does not exit");
};

/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const isRequestValid = async (req, res, next) => {
  const schema = Joi.object({
    usernames: Joi.string().required(),
    email: Joi.string().required(),
    website: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return serverResponse(res, 400, getErrorMessage(error));
  //Check if the email has no pending request
  const request = await Request.findOne(
    (item) => item.email === req.body.email
  );
  if (request) return serverResponse(res, 400, "You have a pending request");
  return next();
};

/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const isTokenValid = async (req, res, next) => {
  const request = await Request.findOne(
    (item) => item.token === req.query.clientToken
  );
  if (request) return next();

  return serverResponse(res, 404, "Invalid token");
};

/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const isNoticationValid = async (req, res, next) => {
  const schema = Joi.object({
    to: Joi.string().required(),
    body: Joi.string().required(),
    type: Joi.string().valid(["SMS", "EMAIL"]).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return serverResponse(res, 400, getErrorMessage(error));

  return next();
};
