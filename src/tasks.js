// In-memory task store shared by the /tasks routes.
const tasks = [];

// Empties the store (used by the tests).
function resetTasks() {
  tasks.length = 0;
}

module.exports = { tasks, resetTasks };