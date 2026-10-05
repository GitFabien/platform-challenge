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
test("GET /tasks returns a JSON array of tasks", async () => {
  const server = app.listen(0, "127.0.0.1");
await new Promise((resolve, reject) => {
  server.once("listening", resolve);
  server.once("error", reject);
});

  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/tasks`);
    const tasks = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(tasks));

    for (const task of tasks) {
      assert.ok("id" in task);
      assert.equal(typeof task.title, "string");
      assert.equal(typeof task.completed, "boolean");
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
