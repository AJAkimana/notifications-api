import { serverResponse } from "../helpers";

export const handleErrors = (err, req, res, next) => {
  return res.status(500).json({
    status: 500,
    error: err.message,
  });
};

export const monitorDevActions = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`
      Route: ${req.path}, method: ${req.method}, 
      body: ${JSON.stringify(req.body)}, 
      session: ${JSON.stringify(req.session)}, `);
  }
  return next();
};

export const appThrottle = (req, res, next) => {
  const { method, url } = req;
  const key = `${method}-${url}`;
  const now = Date.now();
  const lastRequest = req.session[key] || 0;
  const diff = now - lastRequest;
  const limit = 1000;
  const remaining = limit - diff;
  if (remaining > 0) {
    req.session[key] = now;
    const errorMessage = `You have exceeded your request limit. Please try again in ${remaining}ms`;
    return serverResponse(res, 429, errorMessage);
  }
  req.session[key] = now;
  return next();
};
