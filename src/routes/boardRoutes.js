import { Router } from 'express';
import {
  createBoard,
  createTask,
  deleteTaskById,
  getBoardById,
  getBoards,
  updateTaskById,
} from '../controllers/boardController.js';

const router = Router();

router.get('/', getBoards);
router.get('/:boardId', getBoardById);
router.post('/', createBoard);
router.post('/:boardId/tasks', createTask);
router.put('/:boardId/tasks/:taskId', updateTaskById);
router.delete('/:boardId/tasks/:taskId', deleteTaskById);

export default router;

