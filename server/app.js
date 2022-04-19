import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cluster from "cluster";
import expressSession from "express-session";
import os from "os";
import routes from "../routes";
import { monitorDevActions, handleErrors, appThrottle } from "../middlewares";

dotenv.config();

const numCPUs = os.cpus().length;

const app = express();
app.use(cors({ origin: true, credentials: true }));

const port = process.env.PORT || 3000;
const hours = 3600000;
const weeks = 7 * 24 * hours;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "SESSION_SECRET",
    name: process.env.SESSION_NAME || "SESSION_NAME",
    cookie: { path: "/", httpOnly: true, secure: false, maxAge: weeks },
  })
);
app.use(appThrottle);
app.use(monitorDevActions);
if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${numCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  app.use("/", routes);
  app.use(handleErrors);
  app.listen(port, () => console.log(`listening on port ${port}`));
}

export default app;
