import express from 'express';
import { getSchedule,postSchedule } from '../controllers/schedule.js'; 

const router=express.Router();

router.get('/',getSchedule);
router.post('/',postSchedule);

export default router;