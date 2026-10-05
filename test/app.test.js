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


test("tasks returns a list", async () => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const response = await fetch(
    `http://localhost:${server.address().port}/tasks`,
  );

  const tasks = await response.json();
  server.close();

  assert.equal(response.status, 200);
  assert.equal(Array.isArray(tasks), true);
  assert.deepEqual(tasks[0], {
    id: 1,
    title: "Task 1",
    completed: false,
  });
});