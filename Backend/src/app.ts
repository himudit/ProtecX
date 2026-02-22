import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes/index';
import iamRouter from './routes/iamRouter';
import { requestLogger } from './middlewares/requestLogger.middleware';
// import cookieParser from 'cookie-parser';

const app: Express = express();

// Disable ETags globally to prevent 304 responses
app.set('etag', false);

app.set('trust proxy', 1);

// Cache-Control Middleware to prevent browser caching for API routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-project-id",
      "x-api-key"
    ],
  })
);



// app.use((req, res, next) => {
//   const start = Date.now();

//   const oldJson = res.json;

//   res.json = function (body) {
//     res.locals.responseBody = body;   // store response body
//     return oldJson.call(this, body);
//   };

//   res.on('finish', () => {
//     const duration = Date.now() - start;

//     console.log({
//       duration,
//       method: req.method,
//       url: req.originalUrl,
//       statusCode: res.statusCode,
//       error: res.statusCode >= 400,
//       message: res.locals.responseBody?.message,
//       createdAt: new Date().toISOString(),
//     });
//   });

//   next();
// });


// app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (env.NODE_ENV === 'development') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

app.use('/api/v1/iam', iamRouter);
app.use('/api', routes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

app.use(errorMiddleware);

export default app;

