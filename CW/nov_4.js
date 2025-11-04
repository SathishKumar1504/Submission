// nov_4.js
// ===================================================
// 📘 JavaScript Concept Module — Safe with try...catch
// Author: Sathish Kumar M
// Date: Nov 4, 2025
// ===================================================

// 1️⃣ Basic Loop Example
export function basicLoop() {
  try {
    let i = 0;
    console.log("Hello World!");
    console.log("Initialization complete.");
    console.log("Start");
    while (i < 5) {
      console.log("Iteration: " + i);
      i++;
    }
  } catch (e) {
    console.error("basicLoop() Error:", e.message);
  }
}

// 2️⃣ Arithmetic and Sum Example
export function calculateSum() {
  try {
    let i = 0;
    i = i + 300 - 200 * 4;
    let sum = 0;
    let j = 1;
    while (j <= 100) sum += j++;
    console.log("Sum of 1–100 =", sum);
    console.log("Value of i =", i);
  } catch (e) {
    console.error("calculateSum() Error:", e.message);
  }
}

// 3️⃣ Type Handling Example
export function typeExample() {
  try {
    let i = 0;
    i = i + 300 - 200 * 4;
    console.log(i);
    i = "Sathish Kumar M";
    console.log(i);
    i = true;
    console.log(i);
    i = null;
    console.log(i);
    i = 5 * 5;
    console.log(i);
    i = 10 / 2;
    console.log(i);
    i = undefined;
    console.log(typeof i);

    var k = undefined;
    console.log(k);
    k = 7;
    if (k == undefined)
      console.log("k is undefined");
    else
      console.log("k is defined");
  } catch (e) {
    console.error("typeExample() Error:", e.message);
  }
}

// 4️⃣ Array Sum Example
export function arraySumExample() {
  try {
    var a = [1, 3, 5, "Sk", 32, 3];
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      if (!isNaN(a[i])) {
        sum += a[i];
        console.log(a[i] + " is not a number");
        console.log("--------");
      }
      console.log("Sum till index " + i + " is " + sum);
    }
    console.log("Final Sum:", sum);
  } catch (e) {
    console.error("arraySumExample() Error:", e.message);
  }
}

// 5️⃣ try...catch Example
export function tryCatchExample() {
  try {
    callFunctionNotDefined(); // Will throw error
  } catch (e) {
    console.log("Error caught:", e.message);
  }
}

// 6️⃣ Function Example
export function sayhello(name) {
  try {
    if (name != null) {
      name = name + 3;
      console.log("Hello " + name);
    } else {
      console.log("Hello " + name);
    }
  } catch (e) {
    console.error("sayhello() Error:", e.message);
  }
}

// 7️⃣ Default Params Example
export function exendedhello(neme, fridend = "Sk", age = 25) {
  try {
    console.log(`Hello ${neme} your fridend is ${fridend} and age is ${age}`);
  } catch (e) {
    console.error("exendedhello() Error:", e.message);
  }
}

// 8️⃣ Class Example
export class Jedi {
  constructor() {
    this.forceIsDark = false;
  }
  toString() {
    return this.forceIsDark ? "Dark Side" : "Light Side";
  }
}

export class Sith extends Jedi {
  constructor() {
    super();
    this.forceIsDark = true;
  }
  toString() {
    return this.forceIsDark ? "Dark Side Sith" : "Light Side Sith";
  }
}

// 9️⃣ Symbol Example
export function symbolExample() {
  try {
    let s1 = Symbol("sathish");
    let s2 = Symbol("sathish");
    console.log("== :", s1 == s2);
    console.log("=== :", s1 === s2);
    var x;
    console.log(x == null);
    console.log(x === null);
    console.log(typeof x);
  } catch (e) {
    console.error("symbolExample() Error:", e.message);
  }
}

// 🔟 Symbol.toPrimitive Example
export function symbolToPrimitiveExample() {
  try {
    const js_obj = {
      name: "Sathish",
      age: 24,
      [Symbol.toPrimitive](hint) {
        if (hint == "string") return "Hint: guess over 50";
        if (hint == "number") return 58;
        if (hint == "default") return "somewhere between 50 and 60";
      },
    };
    console.log(`${js_obj}`);
    console.log(js_obj + ""); // default
    console.log(+js_obj);
    console.log(js_obj);
  } catch (e) {
    console.error("symbolToPrimitiveExample() Error:", e.message);
  }
}

// 1️⃣1️⃣ Generator Example
export function* flatten(array) {
  for (let item of array) {
    if (item instanceof Array) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}

// 1️⃣2️⃣ Reverse Example
export function reverse(arr) {
  try {
    let [x, ...y] = arr;
    return y.length > 0 ? [...reverse(y), x] : [x];
  } catch (e) {
    console.error("reverse() Error:", e.message);
    return [];
  }
}

// 1️⃣3️⃣ Map Example
export function mapExample() {
  try {
    let m = new Map([..."abcd"].map(x => [x, x + x]));
    console.log("Map entries:", [...m]);
    console.log("JSON Stringify:", JSON.stringify([...m]));
    console.log("Map has 'a':", m.has("a"));
  } catch (e) {
    console.error("mapExample() Error:", e.message);
  }
}

// 1️⃣4️⃣ Set Example
export function setExample() {
  try {
    let s = new Set([1, 2, 2, 3, 4, 4, 5]);
    s.add(6);
    console.log("Set size:", s.size);
    s.delete(2);
    console.log("After delete(2):", s.size);
    console.log("Has 3:", s.has(3));
    console.log("Has 10:", s.has(10));
  } catch (e) {
    console.error("setExample() Error:", e.message);
  }
}

// 1️⃣5️⃣ Iterator Example
export function iteratorExample() {
  try {
    let it = [1, 2, 3][Symbol.iterator]();
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
  } catch (e) {
    console.error("iteratorExample() Error:", e.message);
  }
}

// 1️⃣6️⃣ Async/Await Example
export async function asyncExample() {
  try {
    const ratings = [5, 4, 5];
    let sum = 0;
    const asyncSumFunction = async (a, b) => a + b;
    const syncSumFunction = (a, b) => a + b;

    for (const rating of ratings) {
      sum = await asyncSumFunction(sum, rating);
      console.log("Async Sum till now:", sum);
      sum = syncSumFunction(sum, rating);
      console.log("Sync Sum till now:", sum);
    }
  } catch (e) {
    console.error("asyncExample() Error:", e.message);
  }
}

// 1️⃣7️⃣ Object Freeze & Seal Example
export function objectExample() {
  try {
    const obj = { par: 3 };
    obj.par = 15;
    Object.freeze(obj);
    obj.par = 10; // ignored
    Object.seal(obj);
    obj.newParam = 5; // ignored
    console.log(obj);
  } catch (e) {
    console.error("objectExample() Error:", e.message);
  }
}
