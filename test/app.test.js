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

test("POST /tasks creates a task and returns 201", async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const res = await fetch(`http://localhost:${port}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Write tests" })
    });

    assert.equal(res.status, 201);
    const data = await res.json();
    assert.ok(data.id);
    assert.equal(data.title, "Write tests");
    assert.equal(data.completed, false);
  } finally {
    server.close();
  }
});

test("POST /tasks returns 400 when title is missing or empty", async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const res = await fetch(`http://localhost:${port}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" })
    });

    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});