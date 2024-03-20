import express from 'express';
import {getChallenges,getChallenge,postChallenge,addTasks,updateTask} from '../controllers/challenge.js';

const router=express.Router();

router.get('/',getChallenges);
router.get('/:id',getChallenge);
router.post('/',postChallenge);
router.post('/:id',addTasks);
router.post('/:id',updateTask);

export default router;