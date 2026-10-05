const express = require("express");
const app = express();
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

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}

module.exports = { app, calculateTotal, tasks };
