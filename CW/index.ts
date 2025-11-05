// ===================================================
// 📘 TypeScript Module Runner
// Author: Sathish Kumar M
// ===================================================

import * as Concepts from "./nov_5";

function runAll() {
  console.log("=========================================");
  console.log("🚀 Running All TypeScript Concept Examples");
  console.log("=========================================\n");

  try {
    console.log("🧩 1️⃣ Basic Examples");
    Concepts.basicLoop();
    Concepts.calculateSum();
    Concepts.typeExample();
    Concepts.arraySumExample();
    Concepts.tryCatchExample();

    console.log("\n👋 2️⃣ Functions & Parameters");
    Concepts.sayhello("Sathish");
    Concepts.extendedhello("Sathish", "Kumar", 26);

    console.log("\n🌌 3️⃣ Classes Example");
    const jedi = new Concepts.Jedi();
    const sith = new Concepts.Sith();
    console.log("Jedi:", jedi.toString());
    console.log("Sith:", sith.toString());

    console.log("\n🔣 4️⃣ Symbol Examples");
    Concepts.symbolExample();
    Concepts.symbolToPrimitiveExample();

    console.log("\n🔁 5️⃣ Generator & Reverse Example");
    const gen = Concepts.flatten([1, [2, [3, 4]], 5]);
    console.log("Flattened:", [...gen]);
    console.log("Reversed:", Concepts.reverse([1, 2, 3, 4, 5]));

    console.log("\n🗺️ 6️⃣ Map, Set, Iterator");
    Concepts.mapExample();
    Concepts.setExample();
    Concepts.iteratorExample();

    console.log("\n⚙️ 7️⃣ Async/Await Example");
    Concepts.asyncExample().then(() => {
      console.log("\n🧊 8️⃣ Object Example");
      Concepts.objectExample();
      console.log("\n✅ All examples executed successfully!");
    });

  } catch (err: any) {
    console.error("❌ Error while running concepts:", err.message);
  }
}

runAll();
