// ===================================================
// 📘 main.ts — Unified Entry Point Example
// Author: Sathish Kumar M
// Date: Nov 5, 2025
// ===================================================

// ---------------------------------------------------
// 🔹 Import Math and String Utility Modules
// ---------------------------------------------------
import * as math from "./module/Math.js";
import { stringLength, toUpperCase } from "./module/String.js";

// ---------------------------------------------------
// 🔹 Import the TypeScript Concept Module (nov_5.ts)
// ---------------------------------------------------
// import * as concept from "../../../CW/nov_5.js"; // ✅ must start with './'

// ===================================================
// 🧮 MATH & STRING MODULE DEMONSTRATION
// ===================================================
console.log("\n==================================================");
console.log("🧮 MATH & STRING MODULE TESTS");
console.log("==================================================");

console.log("▶ String Length Test:");
console.log("  'Hello World' →", stringLength("Hello World"));

console.log("\n▶ Uppercase Test:");
console.log("  'hello world' →", toUpperCase("hello world"));

console.log("\n▶ Math Operations:");
console.log("  Add 5 + 3 =", math.add(5, 3));
console.log("  Value of PI =", math.PI);
console.log("  Square of 4 =", math.Calculator.square(4));

/* 
// ===================================================
// 🧠 TYPESCRIPT CONCEPT MODULE (nov_5.ts)
// ===================================================
console.log("\n==================================================");
console.log("🧠 TYPESCRIPT CONCEPT MODULE TESTS");
console.log("==================================================");

// Each section clearly labeled for output clarity
console.log("\n[1️⃣] Basic Loop Example:");
concept.basicLoop();

console.log("\n[2️⃣] Arithmetic and Sum Example:");
concept.calculateSum();

console.log("\n[3️⃣] Type Handling Example:");
concept.typeExample();

console.log("\n[4️⃣] Array Sum Example:");
concept.arraySumExample();

console.log("\n[5️⃣] try...catch Example:");
concept.tryCatchExample();

console.log("\n[6️⃣] Function Example:");
concept.sayhello("Sathish");

console.log("\n[7️⃣] Default Parameters Example:");
concept.extendedhello("Sathish");

console.log("\n[8️⃣] Symbol Example:");
concept.symbolExample();

console.log("\n[9️⃣] Symbol.toPrimitive Example:");
concept.symbolToPrimitiveExample();

console.log("\n[🔟] Map Example:");
concept.mapExample();

console.log("\n[1️⃣1️⃣] Set Example:");
concept.setExample();

console.log("\n[1️⃣2️⃣] Iterator Example:");
concept.iteratorExample();

console.log("\n[1️⃣3️⃣] Async/Await Example:");
await concept.asyncExample();

console.log("\n[1️⃣4️⃣] Object Freeze & Seal Example:");
concept.objectExample();

console.log("\n[1️⃣5️⃣] Reverse Example:");
console.log("  Input: [1, 2, 3, 4]");
console.log("  Output:", concept.reverse([1, 2, 3, 4]));

console.log("\n==================================================");
console.log("✅ All Concept and Utility Tests Executed Successfully!");
console.log("==================================================\n");


*/