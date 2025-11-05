// ===================================================
// 📘 TypeScript Concept Module — Safe with try...catch
// Author: Sathish Kumar M
// Date: Nov 5, 2025
// ===================================================

// 1️⃣ Basic Loop Example
export function basicLoop(): void {
  try {
    let i = 0;
    console.log("Hello World!");
    console.log("Initialization complete.");
    console.log("Start");
    while (i < 5) {
      console.log("Iteration: " + i);
      i++;
    }
  } catch (e: any) {
    console.error("basicLoop() Error:", e.message);
  }
}

// 2️⃣ Arithmetic and Sum Example
export function calculateSum(): void {
  try {
    let i = 0;
    i = i + 300 - 200 * 4;
    let sum = 0;
    let j = 1;
    while (j <= 100) sum += j++;
    console.log("Sum of 1–100 =", sum);
    console.log("Value of i =", i);
  } catch (e: any) {
    console.error("calculateSum() Error:", e.message);
  }
}

// 3️⃣ Type Handling Example
export function typeExample(): void {
  try {
    let i: any = 0;
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

    let k: any = undefined;
    console.log(k);
    k = 7;
    if (k == undefined)
      console.log("k is undefined");
    else
      console.log("k is defined");
  } catch (e: any) {
    console.error("typeExample() Error:", e.message);
  }
}

// 4️⃣ Array Sum Example
export function arraySumExample(): void {
  try {
    const a: (number | string)[] = [1, 3, 5, "Sk", 32, 3];
    let sum = 0;

    for (let i = 0; i < a.length; i++) {
      if (!isNaN(Number(a[i]))) {
        sum += Number(a[i]);
        console.log(a[i] + " is not a number");
        console.log("--------");
      }
      console.log("Sum till index " + i + " is " + sum);
    }
    console.log("Final Sum:", sum);
  } catch (e: any) {
    console.error("arraySumExample() Error:", e.message);
  }
}

// 5️⃣ try...catch Example
export function tryCatchExample(): void {
  try {
    // @ts-ignore — intentional error for demo
    callFunctionNotDefined();
  } catch (e: any) {
    console.log("Error caught:", e.message);
  }
}

// 6️⃣ Function Example
export function sayhello(name: any): void {
  try {
    if (name != null) {
      name = name + 3;
      console.log("Hello " + name);
    } else {
      console.log("Hello " + name);
    }
  } catch (e: any) {
    console.error("sayhello() Error:", e.message);
  }
}

// 7️⃣ Default Params Example
export function extendedhello(name: string, friend: string = "Sk", age: number = 25): void {
  try {
    console.log(`Hello ${name} your friend is ${friend} and age is ${age}`);
  } catch (e: any) {
    console.error("extendedhello() Error:", e.message);
  }
}

// 8️⃣ Class Example
export class Jedi {
  forceIsDark = false;
  toString(): string {
    return this.forceIsDark ? "Dark Side" : "Light Side";
  }
}

export class Sith extends Jedi {
  constructor() {
    super();
    this.forceIsDark = true;
  }
  override toString(): string {
    return this.forceIsDark ? "Dark Side Sith" : "Light Side Sith";
  }
}

// 9️⃣ Symbol Example
export function symbolExample(): void {
  try {
    const s1 = Symbol("sathish");
    const s2 = Symbol("sathish");

    // ✅ Safe equality check using Object.is
    console.log("== :", Object.is(s1, s2));
    console.log("=== :", Object.is(s1, s2));

    let x: any;
    console.log(x == null);
    console.log(x === null);
    console.log(typeof x);
  } catch (e: any) {
    console.error("symbolExample() Error:", e.message);
  }
}

// 🔟 Symbol.toPrimitive Example
export function symbolToPrimitiveExample(): void {
  try {
    const js_obj = {
      name: "Sathish",
      age: 24,
      [Symbol.toPrimitive](hint: string) {
        if (hint === "string") return "Hint: guess over 50";
        if (hint === "number") return 58;
        return "somewhere between 50 and 60";
      },
    };
    console.log(`${js_obj}`);
    console.log(js_obj + "");
    console.log(+js_obj);
    console.log(js_obj);
  } catch (e: any) {
    console.error("symbolToPrimitiveExample() Error:", e.message);
  }
}

// 1️⃣1️⃣ Generator Example
export function* flatten(array: any[]): Generator<any> {
  for (const item of array) {
    if (Array.isArray(item)) yield* flatten(item);
    else yield item;
  }
}

// 1️⃣2️⃣ Reverse Example — ✅ Fixed type error
export function reverse<T>(arr: T[]): T[] {
  try {
    if (arr.length === 0) return [];
    const [x, ...y] = arr;
    return [...reverse(y), x!];
  } catch (e: any) {
    console.error("reverse() Error:", e.message);
    return [];
  }
}

// 1️⃣3️⃣ Map Example
export function mapExample(): void {
  try {
    const m = new Map<string, string>([..."abcd"].map(x => [x, x + x]));
    console.log("Map entries:", [...m]);
    console.log("JSON Stringify:", JSON.stringify([...m]));
    console.log("Map has 'a':", m.has("a"));
  } catch (e: any) {
    console.error("mapExample() Error:", e.message);
  }
}

// 1️⃣4️⃣ Set Example
export function setExample(): void {
  try {
    const s = new Set<number>([1, 2, 2, 3, 4, 4, 5]);
    s.add(6);
    console.log("Set size:", s.size);
    s.delete(2);
    console.log("After delete(2):", s.size);
    console.log("Has 3:", s.has(3));
    console.log("Has 10:", s.has(10));
  } catch (e: any) {
    console.error("setExample() Error:", e.message);
  }
}

// 1️⃣5️⃣ Iterator Example
export function iteratorExample(): void {
  try {
    const it = [1, 2, 3][Symbol.iterator]();
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
  } catch (e: any) {
    console.error("iteratorExample() Error:", e.message);
  }
}

// 1️⃣6️⃣ Async/Await Example
export async function asyncExample(): Promise<void> {
  try {
    const ratings = [5, 4, 5];
    let sum = 0;
    const asyncSumFunction = async (a: number, b: number): Promise<number> => a + b;
    const syncSumFunction = (a: number, b: number): number => a + b;

    for (const rating of ratings) {
      sum = await asyncSumFunction(sum, rating);
      console.log("Async Sum till now:", sum);
      sum = syncSumFunction(sum, rating);
      console.log("Sync Sum till now:", sum);
    }
  } catch (e: any) {
    console.error("asyncExample() Error:", e.message);
  }
}

// 1️⃣7️⃣ Object Freeze & Seal Example
export function objectExample(): void {
  try {
    const obj = { par: 3 };
    obj.par = 15;
    Object.freeze(obj);
    // @ts-ignore — frozen property modification ignored
    obj.par = 10;
    Object.seal(obj);
    // @ts-ignore — new property addition ignored
    obj.newParam = 5;
    console.log(obj);
  } catch (e: any) {
    console.error("objectExample() Error:", e.message);
  }
}
