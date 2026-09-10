import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import NotesRoutes from './routes/notesRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(cors({ origin: '*' }));
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);

app.use(NotesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
