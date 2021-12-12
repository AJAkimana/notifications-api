import { DbHelper } from "./db.model";

const requestsJsonFile = `${__dirname}/mocks/requests.json`;
const notificationsJsonFile = `${__dirname}/mocks/notifications.json`;

export const Request = new DbHelper(requestsJsonFile);
export const Notification = new DbHelper(notificationsJsonFile);
