const test = require("node:test");
const assert = require("node:assert/strict");
const { app, calculateTotal } = require("../src/app");

test("calculates the total for several items", () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];

  assert.equal(calculateTotal(items), 35);
});

test("returns zero for an empty basket", () => {
  assert.equal(calculateTotal([]), 0);
});

test("does not mutate the input items", () => {
  const items = [{ price: 4, quantity: 2 }];
  const copy = JSON.parse(JSON.stringify(items));

  calculateTotal(items);

  assert.deepEqual(items, copy);
});

test("GET /tasks returns a list of tasks", async () => {
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const response = await fetch(`http://localhost:${port}/tasks`);
    const tasks = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(tasks));

    for (const task of tasks) {
      assert.ok("id" in task);
      assert.ok("title" in task);
      assert.ok("completed" in task);
    }
  } finally {
    server.close();
  }
});

test("PATCH /tasks/:id updates an existing task", async () => {
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const response = await fetch(`http://localhost:${port}/tasks/2`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    });
    const task = await response.json();

    assert.equal(response.status, 200);
    assert.equal(task.id, 2);
    assert.equal(task.completed, true);
  } finally {
    server.close();
  }
});

test("PATCH /tasks/:id returns 404 for an unknown task", async () => {
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const response = await fetch(`http://localhost:${port}/tasks/999`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    });

    assert.equal(response.status, 404);
  } finally {
    server.close();
  }
});

test("PATCH /tasks/:id returns 400 for invalid input", async () => {
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const response = await fetch(`http://localhost:${port}/tasks/2`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: "yes" })
    });

    assert.equal(response.status, 400);
  } finally {
    server.close();
  }
});