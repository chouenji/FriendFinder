import express from 'express';
import cors from 'cors';
import router from './routes/index';
import fileUpload from 'express-fileupload';

// Initialize express app
const app = express();
const port = 8080 || process.env.PORT;

// CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// File upload
app.use(fileUpload());

// Routes
app.use('/api', router);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
