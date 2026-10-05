const test = require("node:test");
const assert = require("node:assert/strict");
const { app, tasks } = require("../src/app");

function startServer(t) {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      t.after(() => {
        server.close();
        server.closeAllConnections();
      });
      resolve(`http://127.0.0.1:${server.address().port}`);
    });
  });
}

test("DELETE /tasks/:id deletes an existing task and returns 204", async (t) => {
  tasks.length = 0;
  tasks.push({ id: 1, title: "Write README", completed: false });
  const baseUrl = await startServer(t);

  const res = await fetch(`${baseUrl}/tasks/1`, { method: "DELETE" });

  assert.equal(res.status, 204);
  assert.equal(tasks.length, 0);
});

test("DELETE /tasks/:id returns 404 for an unknown task", async (t) => {
  tasks.length = 0;
  const baseUrl = await startServer(t);

  const res = await fetch(`${baseUrl}/tasks/999`, { method: "DELETE" });

  assert.equal(res.status, 404);
});

test("DELETE /tasks/:id only removes the requested task", async (t) => {
  tasks.length = 0;
  tasks.push({ id: 1, title: "First", completed: false });
  tasks.push({ id: 2, title: "Second", completed: true });
  const baseUrl = await startServer(t);

  await fetch(`${baseUrl}/tasks/1`, { method: "DELETE" });

  assert.deepEqual(tasks, [{ id: 2, title: "Second", completed: true }]);
});