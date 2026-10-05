const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Middleware global pour parser le JSON
app.use(express.json());

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Données partagées en mémoire
const tasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
];

let nextTaskId = 3;

app.get("/", (_req, res) => {
  res.json({
    service: "devops-platform-challenge",
    status: "ok",
  });
});

app.get("/tasks", (_req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    id: nextTaskId++,
    title,
    completed: false,
  };

  tasks.push(task);

  return res.status(201).json(task);
});

// FEATURE: PATCH /tasks/:id (Marquer une tâche comme terminée/incomplète)
app.patch("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { completed } = req.body;

  // Validation 1 : Vérifier si "completed" est bien fourni et de type booléen (HTTP 400)
  if (completed === undefined || typeof completed !== "boolean") {
    return res.status(400).json({
      error: 'Invalid input: "completed" field is required and must be a boolean.',
    });
  }

  // Recherche de la tâche (HTTP 404 si absente)
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Mise à jour et retour de la tâche (HTTP 200)
  task.completed = completed;
  return res.status(200).json(task);
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

app.get("/total", (_req, res) => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 },
  ];

  res.json({ total: calculateTotal(items) });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}

module.exports = { app, calculateTotal };