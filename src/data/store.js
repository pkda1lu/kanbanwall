import crypto from 'crypto';

const boards = [
  {
    id: crypto.randomUUID(),
    name: 'Учёба',
    description: 'Подготовка к экзамену и лабораторные',
    tasks: [
      {
        id: crypto.randomUUID(),
        title: 'Прочитать раздел про Express middleware',
        status: 'todo',
        description: 'Конспектировать ключевые примеры',
      },
      {
        id: crypto.randomUUID(),
        title: 'Сверстать статическую страницу',
        status: 'in-progress',
        description: 'Добавить блок с эндпоинтами',
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: 'Дом',
    description: 'Список бытовых задач',
    tasks: [
      {
        id: crypto.randomUUID(),
        title: 'Купить продукты',
        status: 'todo',
      },
    ],
    createdAt: new Date().toISOString(),
  },
];

export function listBoards({ status } = {}) {
  if (!status) return boards;
  return boards.map((board) => ({
    ...board,
    tasks: board.tasks.filter((task) => task.status === status),
  }));
}

export function findBoard(boardId) {
  return boards.find((board) => board.id === boardId);
}

export function addBoard({ name, description }) {
  const board = {
    id: crypto.randomUUID(),
    name,
    description: description || '',
    tasks: [],
    createdAt: new Date().toISOString(),
  };
  boards.push(board);
  return board;
}

export function addTask(boardId, { title, description, status }) {
  const board = findBoard(boardId);
  if (!board) return null;

  const task = {
    id: crypto.randomUUID(),
    title,
    status: status || 'todo',
    description: description || '',
  };
  board.tasks.push(task);
  return task;
}

export function updateTask(boardId, taskId, updates) {
  const board = findBoard(boardId);
  if (!board) return null;

  const task = board.tasks.find((item) => item.id === taskId);
  if (!task) return null;

  Object.assign(task, updates);
  return task;
}

export function deleteTask(boardId, taskId) {
  const board = findBoard(boardId);
  if (!board) return false;

  const initialLength = board.tasks.length;
  board.tasks = board.tasks.filter((task) => task.id !== taskId);
  return board.tasks.length !== initialLength;
}

