"use strict";
// ===================================================
// 📘 TypeScript Module Runner
// Author: Sathish Kumar M
// ===================================================
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const Concepts = __importStar(require("./nov_5"));
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
    }
    catch (err) {
        console.error("❌ Error while running concepts:", err.message);
    }
}
runAll();
//# sourceMappingURL=index.js.map