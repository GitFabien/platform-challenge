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

test("returns the list of tasks", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(`http://localhost:${server.address().port}/tasks`);

    assert.equal(response.status, 200);

    const tasks = await response.json();

    assert.ok(Array.isArray(tasks));
    assert.ok(tasks.length > 0);

    for (const task of tasks) {
      assert.ok("id" in task);
      assert.ok("title" in task);
      assert.ok("completed" in task);
    }
  } finally {
    server.close();
  }
});

// --- Issue #3: Complete a task (PATCH /tasks/:id) ---

test("PATCH /tasks/:id updates completed status for existing task", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(`http://localhost:${server.address().port}/tasks/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    });

    assert.equal(response.status, 200);

    const task = await response.json();
    assert.equal(task.id, 1);
    assert.equal(task.completed, true);
  } finally {
    server.close();
  }
});

test("PATCH /tasks/:id returns 404 for unknown task", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(`http://localhost:${server.address().port}/tasks/9999`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    });

    assert.equal(response.status, 404);

    const body = await response.json();
    assert.ok("error" in body);
  } finally {
    server.close();
  }
});

test("PATCH /tasks/:id returns 400 for invalid input", async () => {
  const server = app.listen(0);

  try {
    const response = await fetch(`http://localhost:${server.address().port}/tasks/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: "not-a-boolean" })
    });

    assert.equal(response.status, 400);

    const body = await response.json();
    assert.ok("error" in body);
  } finally {
    server.close();
  }
});