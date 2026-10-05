const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateTotal } = require("../src/app");

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

// test des  endpoints
const http = require("node:http");
test("GET /tasks returns 200 and a JSON array", async () => {
  // Ce test vérifie l'endpoint que tu as créé
  // (Assure-toi que ton application s'exporte bien pour les tests)
});