const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

const { app, tasks } = require("../src/app");

test("GET /tasks returns all tasks", async () => {
  tasks.length = 0;
  tasks.push({ id: 1, title: "Write README", completed: false });

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
    assert.equal(tasks.length, 1);

    for (const task of tasks) {
      assert.ok("id" in task);
      assert.ok("title" in task);
      assert.ok("completed" in task);
    }
  } finally {
    server.close();
  }
});