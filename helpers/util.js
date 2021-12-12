import { readFileSync, writeFileSync } from "fs";

/**
 *
 * @param {*} jsonFile Json file where data are saved
 * @returns
 */
export const dataToJson = (jsonFile) => {
  const jsonData = readFileSync(jsonFile);
  return JSON.parse(jsonData);
};

/**
 *
 * @param {*} res Express response
 * @param {*} statusCode Status code
 * @param {*} message Response message
 * @param {*} data Response data
 * @returns Server response
 */
export const serverResponse = (res, statusCode, message, data) => {
  const messageType = statusCode >= 400 ? "error" : "message";
  return res
    .status(statusCode)
    .json({ status: statusCode, [messageType]: message, data });
};

/**
 *
 * @param {String} filename File to edit
 * @param {String} content Content to write
 */
export const writeJSONFile = (filename, content) => {
  writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

/**
 *
 * @param {Object} error Generated error from Joi validation
 */
export const getErrorMessage = (error) => {
  const errors = [];
  const errorDetails = error.details;

  for (let i = 0; i < errorDetails.length; i += 1) {
    errors.push(errorDetails[i].message.split('"').join(""));
  }
  return errors[0];
};
