const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

function calculateTotal(items) {
  // INTENTIONAL DEFECT: students must diagnose this using the tests.
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Middleware pour parser le JSON (doit être placé en haut avant les routes)
app.use(express.json());

// Stockage centralisé des tâches pour toute l'application
const tasks = [
  { id: 1, title: "Tâche 1", completed: false }
];

app.get("/", (_req, res) => {
  res.json({
    service: "devops-platform-challenge",
    status: "ok"
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

app.get("/total", (_req, res) => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];

  res.json({ total: calculateTotal(items) });
});

// GET /tasks - Lister les tâches
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// POST /tasks - Créer une tâche
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => typeof t.id === 'number' ? t.id : 1)) + 1 : 1,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// PATCH /tasks/:id - Issue #3 : Marquer une tâche comme complétée
app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { completed } = req.body;

  // Critère : Invalid input returns HTTP 400
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: "Invalid input: 'completed' must be a boolean" });
  }

  const task = tasks.find((t) => t.id === id);

  // Critère : Unknown task returns HTTP 404
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = completed;
  return res.status(200).json(task);
});

// DELETE /tasks/:id - Supprimer une tâche
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  return res.status(204).end();
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}

module.exports = { app, calculateTotal, tasks };