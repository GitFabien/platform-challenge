const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const tasks = [
  { id: 1, title: "Setup GitHub repository", completed: true },
  { id: 2, title: "Configure CI pipeline", completed: false }
];

function calculateTotal(items) {
  // INTENTIONAL DEFECT: students must diagnose this using the tests.
  // Le code additionne price et quantity au lieu de multiplier price par quantity
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
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

app.get("/tasks", (_req, res) => {
  res.status(200).json(tasks);
});

app.patch("/tasks/:id", (req, res) => {
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed must be a boolean" });
  }

  const task = tasks.find((task) => task.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = completed;
  return res.status(200).json(task);
});

app.get("/total", (_req, res) => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];

  res.json({ total: calculateTotal(items) });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}

module.exports = { app, calculateTotal };