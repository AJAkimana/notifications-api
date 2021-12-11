export const handleErrors = (err, req, res, next) => {
  return res.status(500).json({
    status: 500,
    error: err.message,
  });
};

export const monitorDevActions = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    const user = " made req";
    console.log(
      `User===>${user}, 
      Route: ${req.path}, method: ${req.method}, 
      body: ${JSON.stringify(req.body)}, 
      session: ${JSON.stringify(req.session)}, `
    );
  }
  return next();
};
