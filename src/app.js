const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

function calculateTotal(items) {
  // INTENTIONAL DEFECT: students must diagnose this using the tests.
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

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
// Middleware pour parser le JSON
app.use(express.json());

// Stockage temporaire des tâches
const tasks = [];

// Route POST /tasks pour créer une tâche
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // Validation : si le titre est absent ou vide, on renvoie une erreur 400
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  // Création de la tâche avec un ID unique
  const newTask = {
    id: Date.now().toString(),
    title: title.trim()
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// Exemple de code à ajouter pour l'Issue #1
app.get('/tasks', (req, res) => {
    const tasks = [
        { id: 1, title: "Tâche 1", completed: false }
    ];
    res.status(200).json(tasks);
});

const tasks = [];

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

 feature/delete-task
module.exports = { app, calculateTotal, tasks };

module.exports = { app, calculateTotal };

main
