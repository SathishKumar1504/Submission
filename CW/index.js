// index.js
import {
  basicLoop,
  calculateSum,
  typeExample,
  arraySumExample,
  tryCatchExample,
  sayhello,
  exendedhello,
  Jedi,
  Sith,
  symbolExample,
  symbolToPrimitiveExample,
  flatten,
  reverse,
  mapExample,
  setExample,
  iteratorExample,
  asyncExample,
  objectExample
} from "./nov_4.js";

try {
  console.log("=== Basic Loop ===");
  basicLoop();

  console.log("\n=== Calculation ===");
  calculateSum();

  console.log("\n=== Type Example ===");
  typeExample();

  console.log("\n=== Array Sum ===");
  arraySumExample();

  console.log("\n=== Try Catch Example ===");
  tryCatchExample();

  console.log("\n=== Say Hello ===");
  sayhello("Sathish");
  sayhello(null);

  console.log("\n=== Extended Hello ===");
  exendedhello("Sathish", "Kumar", 24);
  exendedhello("Sathish");

  console.log("\n=== Class Example ===");
  const jedi1 = new Jedi();
  const sith1 = new Sith();
  console.log(`${jedi1}`);
  console.log(`${sith1}`);

  console.log("\n=== Symbol Example ===");
  symbolExample();

  console.log("\n=== Symbol.toPrimitive ===");
  symbolToPrimitiveExample();

  console.log("\n=== Generator Flatten ===");
  for (let v of flatten([1, [2, [3, 4], 5], 6])) console.log(v);

  console.log("\n=== Reverse Example ===");
  console.log(reverse([1, 2, 3, 4, 5]));
  console.log(reverse("hello"));

  console.log("\n=== Map Example ===");
  mapExample();

  console.log("\n=== Set Example ===");
  setExample();

  console.log("\n=== Iterator Example ===");
  iteratorExample();

  console.log("\n=== Object Example ===");
  objectExample();

  console.log("\n=== Async/Await Example ===");
  await asyncExample();

} catch (err) {
  console.error("❌ Error caught in index.js:", err.message);
}
