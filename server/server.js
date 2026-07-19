import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { functions, inngest } from "./inngest/index.js";
import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';

const app = express();
const port = process.env.PORT || 5000;

await connectDB();

// FIX: 'atripe' ko 'stripe' kar diya hai
// Stripe Webhook Route
app.use('/api/stripe', express.raw({type:'application/json'}), stripeWebhooks)

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/inngest', serve({client: inngest, functions}))
app.use('/api/shows', showRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

// FIX: Vercel serverless environment ke liye setup
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// YEH LINE SAB SE ZAROORI HAI VERCEL KE LIYE!
export default app;