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

test("returns 400 when creating a task with an empty title", async () => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const response = await fetch(
    `http://localhost:${server.address().port}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "" }),
    },
  );

  server.close();

  assert.equal(response.status, 400);
});

test("creates a task", async () => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const response = await fetch(
    `http://localhost:${server.address().port}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "New task" }),
    },
  );

  const task = await response.json();
  server.close();

  assert.equal(response.status, 201);
  assert.equal(task.title, "New task");
  assert.equal(typeof task.id, "number");
});

test("updates a task completed status and returns 200", async () => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const response = await fetch(
    `http://localhost:${server.address().port}/tasks/1`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    },
  );

  const updatedTask = await response.json();
  server.close();

  assert.equal(response.status, 200);
  assert.equal(updatedTask.id, 1);
  assert.equal(updatedTask.completed, true);
});

test("returns 404 when updating a non-existent task", async () => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const response = await fetch(
    `http://localhost:${server.address().port}/tasks/999`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    },
  );

  server.close();

  assert.equal(response.status, 404);
});

test("returns 400 when completing a task with invalid input", async () => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const response1 = await fetch(
    `http://localhost:${server.address().port}/tasks/1`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: "true" }),
    },
  );

  const response2 = await fetch(
    `http://localhost:${server.address().port}/tasks/1`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );

  server.close();

  assert.equal(response1.status, 400);
  assert.equal(response2.status, 400);
});

test("deletes an existing task and returns 204", async () => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const createResponse = await fetch(
    `http://localhost:${server.address().port}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "Task to delete" }),
    },
  );

  const createdTask = await createResponse.json();

  const deleteResponse = await fetch(
    `http://localhost:${server.address().port}/tasks/${createdTask.id}`,
    {
      method: "DELETE",
    },
  );

  server.close();

  assert.equal(deleteResponse.status, 204);
});

test("returns 404 when deleting a non-existent task", async () => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const response = await fetch(
    `http://localhost:${server.address().port}/tasks/999`,
    {
      method: "DELETE",
    },
  );

  server.close();

  assert.equal(response.status, 404);
});