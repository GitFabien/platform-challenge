const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Enable JSON body parsing so req.body is accessible
app.use(express.json());

const tasks = [
  { id: 1, title: "Set up project", completed: false }
];

function calculateTotal(items) {
  // INTENTIONAL DEFECT: students must diagnose this using the tests.
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

app.get("/tasks", (_req, res) => {
  res.json(tasks);
});

// Issue #2: Create a task
app.post("/tasks", (req, res) => {
  const { title } = req.body || {};

  // Check if title is missing, not a string, or contains only whitespace
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  // Generate an ID (e.g. numeric sequence based on existing IDs or timestamp)
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => Number(t.id))) + 1 : 1;

  const newTask = {
    id: nextId,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

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

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}

module.exports = { app, calculateTotal };