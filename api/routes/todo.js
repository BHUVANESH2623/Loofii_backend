import express from "express";
import {getTodo,postTodo,postTask} from '../controllers/todo.js'

const router=express.Router();

router.get('/',getTodo);
router.post('/',postTodo);
router.post('/:id',postTask);

export default router;