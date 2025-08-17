// Centralized error handler
export function notFound(req, res, next) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const payload = {
    message: err.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };
  res.status(status).json(payload);
}