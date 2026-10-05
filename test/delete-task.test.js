const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { app, tasks } = require("../src/app");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
  server.closeAllConnections();
});

beforeEach(() => {
  tasks.length = 0;
  tasks.push(
    { id: 1, title: "Write tests", completed: false },
    { id: 2, title: "Review pull request", completed: true }
  );
});

test("DELETE /tasks/:id removes an existing task and returns 204", async () => {
  const res = await fetch(`${baseUrl}/tasks/1`, { method: "DELETE" });

  assert.equal(res.status, 204);
  assert.equal(await res.text(), "");
  assert.deepEqual(tasks.map((t) => t.id), [2]);
});

test("DELETE /tasks/:id returns 404 for an unknown id", async () => {
  const res = await fetch(`${baseUrl}/tasks/999`, { method: "DELETE" });

  assert.equal(res.status, 404);
  assert.equal(tasks.length, 2);
});

test("DELETE /tasks/:id returns 404 when the task was already deleted", async () => {
  await fetch(`${baseUrl}/tasks/1`, { method: "DELETE" });
  const res = await fetch(`${baseUrl}/tasks/1`, { method: "DELETE" });

  assert.equal(res.status, 404);
});