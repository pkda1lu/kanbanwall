import {
  addBoard,
  addTask,
  deleteTask,
  findBoard,
  listBoards,
  updateTask,
} from '../data/store.js';

export function getBoards(req, res) {
  const { status } = req.query;
  const boards = listBoards({ status });
  res.json({ data: boards, filters: { status: status || null } });
}

export function getBoardById(req, res) {
  const { boardId } = req.params;
  const { withTasks } = req.query;
  const board = findBoard(boardId);

  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }

  const payload =
    withTasks && withTasks !== 'false'
      ? board
      : { id: board.id, name: board.name, description: board.description };

  return res.json({ data: payload });
}

export function createBoard(req, res) {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Field "name" is required' });
  }

  const board = addBoard({ name, description });
  return res.status(201).json({ data: board });
}

export function createTask(req, res) {
  const { boardId } = req.params;
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Field "title" is required' });
  }

  const task = addTask(boardId, { title, description, status });
  if (!task) {
    return res.status(404).json({ message: 'Board not found' });
  }

  return res.status(201).json({ data: task });
}

export function updateTaskById(req, res) {
  const { boardId, taskId } = req.params;
  const { title, description, status } = req.body;

  const updates = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (status) updates.status = status;

  const task = updateTask(boardId, taskId, updates);
  if (!task) {
    return res.status(404).json({ message: 'Board or task not found' });
  }

  return res.json({ data: task });
}

export function deleteTaskById(req, res) {
  const { boardId, taskId } = req.params;
  const removed = deleteTask(boardId, taskId);

  if (!removed) {
    return res.status(404).json({ message: 'Board or task not found' });
  }

  return res.status(204).send();
}

