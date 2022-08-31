const errorHandlerMiddleware = (error, req, res, _next) => {
  if (error.warning) { 
    const { status, warning } = error;
    return res.status(status).json({ message: warning });
  } 
  return res.status(error.status).json({ message: error.message });
};

module.exports = errorHandlerMiddleware;