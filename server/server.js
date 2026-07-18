import exprees from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { functions, inngest } from "./inngest/index.js";
const app = exprees();
const port = process.env.PORT || 5000;
await connectDB();

// Middleware
app.use(exprees.json());
app.use(cors());
app.use(clerkMiddleware())


app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/api/inngest',  serve({client: inngest, functions,}))


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 