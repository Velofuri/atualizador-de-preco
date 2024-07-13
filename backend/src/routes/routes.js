import { Router } from 'express';
import { recebeArquivoCsv } from '../controller/recebeArquivoCsvController.js';
import multer from 'multer';
import { updateController } from '../controller/updateController.js';

const multerConfig = multer();

const router = Router();

router.post('/upload', multerConfig.single('csvFile'), recebeArquivoCsv);
router.put('/update', updateController);

export default router;
