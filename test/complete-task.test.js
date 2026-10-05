const test = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("../src/app");
const { tasks, resetTasks } = require("../src/tasks");

let server;
let baseUrl;

test.before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => {
  server.close();
});

test.beforeEach(() => {
  resetTasks();
  tasks.push({ id: 1, title: "Write README", completed: false });
});

function patchTask(id, body) {
  return fetch(`${baseUrl}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

test("PATCH /tasks/:id marks an existing task as completed", async () => {
  const res = await patchTask(1, { completed: true });

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { id: 1, title: "Write README", completed: true });
  assert.equal(tasks[0].completed, true);
});

test("PATCH /tasks/:id returns 404 for an unknown task", async () => {
  const res = await patchTask(999, { completed: true });
  assert.equal(res.status, 404);
});

test("PATCH /tasks/:id returns 400 for invalid input", async () => {
  for (const body of [{}, { completed: "yes" }, { completed: 1 }]) {
    const res = await patchTask(1, body);
    assert.equal(res.status, 400, `expected 400 for ${JSON.stringify(body)}`);
  }
});