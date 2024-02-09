import express, { Router } from 'express';
import { getAllAudio } from '../controller/audioController';

const router:Router = express.Router();

router.get('/:os', getAllAudio);

export default router;