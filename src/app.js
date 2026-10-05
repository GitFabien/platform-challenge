const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const tasks = [
  { id: 1, title: "Set up project repository", completed: true },
  { id: 2, title: "Configure CI pipeline", completed: true },
  { id: 3, title: "Implement task management API", completed: false }
];

function calculateTotal(items) {
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

app.get("/tasks", (_req, res) => {
  res.status(200).json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Le titre est obligatoire" });
  }

  const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
  const newId = maxId + 1;

  const newTask = {
    id: newId,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}

module.exports = { app, calculateTotal, tasks };
