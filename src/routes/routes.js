import { Router } from 'express';
import { recebeArquivoCsv } from '../controller/recebeArquivoCsvController.js';
import multer from 'multer';

const multerConfig = multer();

const router = Router();

router.post('/upload', multerConfig.single('csvFile'), recebeArquivoCsv);

export default router;
