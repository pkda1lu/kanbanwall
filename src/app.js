import express from 'express';
import path from 'path';
import boardRoutes from './routes/boardRoutes.js';
import requestLogger from './middleware/requestLogger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(
  express.static(path.join(process.cwd(), 'public'), {
    extensions: ['html'],
  }),
);

app.use('/api/boards', boardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;

