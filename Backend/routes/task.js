import express from 'express';
const router = express.Router();

import {auth} from '../middlewares/auth.js';
import { addTask, editTask, deleteTask, getTaskByTaskId, getAllTasksDetails} from '../controllers/task.js';

router.post('/addTask', auth, addTask);
router.get('/getTaskByTaskId/:taskId', auth, getTaskByTaskId);
router.put('/editTask/:taskId', auth, editTask);
router.delete('/deleteTask/:taskId', auth, deleteTask);
router.get('/getAllTasksDetails', auth, getAllTasksDetails);

export default router;