export default function requestLogger(req, res, next) {
  const started = Date.now();

  res.on('finish', () => {
    const elapsed = Date.now() - started;
    // Minimal custom log for visibility in console
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} (${elapsed}ms)`,
    );
  });

  next();
}

