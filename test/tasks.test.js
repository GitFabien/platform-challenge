const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

const { app } = require("../src/app");

test("GET /tasks returns all tasks", async () => {
  const server = http.createServer(app);

  await new Promise((resolve) => {
    server.listen(0, resolve);
  });

  const { port } = server.address();

  try {
    const response = await fetch(`http://localhost:${port}/tasks`);

    assert.equal(response.status, 200);

    const tasks = await response.json();

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