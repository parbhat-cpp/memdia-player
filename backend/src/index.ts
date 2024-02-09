import express, { Express } from "express";
import cors from 'cors';
import env from 'dotenv';

// ROUTES
import videoRoutes from './routes/videoRoutes';
import audioRoutes from './routes/audioRoutes';

env.config();

const app:Express = express();
const PORT:string = process.env.PORT as string;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/video', videoRoutes);
app.use('/api/audio', audioRoutes);

app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
})