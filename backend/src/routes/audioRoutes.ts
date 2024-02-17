import express, { Router } from 'express';
import { getAudioFromDirectory, getAudiosFromDefaultDirectory, playAudio } from '../controller/audioController';

const router:Router = express.Router();

router.get('/:os', getAudiosFromDefaultDirectory);
router.post('/', getAudioFromDirectory);
router.get('/', playAudio);

export default router;