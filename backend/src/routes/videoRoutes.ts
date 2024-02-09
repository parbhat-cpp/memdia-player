import express, { Router } from 'express';
import { getVideoFromDirectory, getVideosFromDefaultDirectory, playVideo } from '../controller/videoController';

const router: Router = express.Router();

router.get('/:os', getVideosFromDefaultDirectory);
router.post('/', getVideoFromDirectory);
router.get('/', playVideo);

export default router;