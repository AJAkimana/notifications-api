import { DbHelper } from "./db.model";

const requestsJsonFile = `${__dirname}/../data/requests.json`;
const notificationsJsonFile = `${__dirname}/../data/notifications.json`;

export const Request = new DbHelper(requestsJsonFile);
export const Notification = new DbHelper(notificationsJsonFile);
