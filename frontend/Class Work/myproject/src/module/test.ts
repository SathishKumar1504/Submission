// ==========================================================
// 📘 TypeScript Comprehensive Example
// Author: Sathish Kumar M
// ==========================================================

// ========== Basic Types ==========
let first: number = 10;
let second: number = 20;
let third: number = 0o30;  // Octal literal (24)
let sum: number = 0b11001; // Binary literal (25)
let isPresent: boolean = true;

// ========== Arrays ==========
let fruit: string[] = ["Apple", "Banana", "Mango"];
let fruit2: Array<string> = ["Pineapple", "Grapes", "Orange"];
let arr = [1, "Sathish", true];

// ========== Union Types ==========
let ids: (number | string)[] = [1, "Sathish", 2, "Kumar"];
let mixed: (number | string | boolean)[] = [1, "Hello", true, 2, "World", false];

// ========== Tuple ==========
let tuple: [number, string, boolean] = [1, "Sathish", true];

// ========== Logs ==========
console.log("===== Data Types =====");
console.log(typeof fruit);
console.log(typeof fruit2);
console.log(typeof arr);

console.log("===== Array Values =====");
console.log(fruit);
console.log(fruit2);
console.log(arr);

console.log("===== Basic Numbers =====");
console.log(first, second, third, sum);

console.log("===== Boolean Value =====");
console.log(isPresent);

console.log("===== Union Arrays =====");
console.log(ids);
console.log(mixed);

console.log("===== Tuple =====");
console.log(tuple);

// ========== Employee Details ==========
let empId: number = 123;
let empName: string = "Sathish";
let isEmpActive: boolean = true;
let empDept: string[] = ["IT", "HR", "Finance"];

console.log(`\nEmployee Details:
ID: ${empId}
Name: ${empName}
Active: ${isEmpActive}
Departments: ${empDept.join(", ")}
`);

let employee: [number, string, boolean, string[]] = [456, "Kumar", false, ["Marketing", "Sales"]];
console.log(`Employee Details:
ID: ${employee[0]}
Name: ${employee[1]}
Active: ${employee[2]}
Departments: ${employee[3].join(", ")}
`);

// =========== Enum ==========
enum PrintMedia {
  Newspaper,
  Newsletter,
  Magazine,
  Book
}

function getMediaType(mediaName: string): PrintMedia | undefined {
  if (["Newspaper", "Newsletter", "Book"].includes(mediaName)) {
    return PrintMedia.Magazine;
  }
}

let mediaType = getMediaType("Forbes");

console.log("\n===== Enum Example =====");
console.log(`Media Type: ${mediaType}`);
if (mediaType !== undefined) {
  console.log(`Media Type Name: ${PrintMedia[mediaType]}`);
}

// ========== Any Type ==========
console.log("\n===== Any Type Example =====");
let randomValue: any = 10;
console.log(`Random Value (number): ${randomValue}`);
randomValue = "Hello World";
console.log(`Random Value (string): ${randomValue}`);
randomValue = true;
console.log(`Random Value (boolean): ${randomValue}`);

let code: number | string;
code = 123;
console.log(`\nCode as number: ${code}`);
code = "ABC123";
console.log(`Code as string: ${code}`);

// ========== Void Type ==========
console.log("\n===== Void Type Example =====");
function logMessage(): void {
  console.log("This is a void function that does not return anything.");
}

let result: void = logMessage();
console.log(`Result of void function: ${result}`); // undefined

// ========== Null and Undefined ==========
console.log("\n===== Null and Undefined Example =====");
let u: undefined = undefined;
let n: null = null;
console.log(`Undefined value: ${u}`);
console.log(`Null value: ${n}`);

// ========== Never Type ==========
console.log("\n===== Never Type Example =====");

function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

function keepProcessing(): never {
  while (true) {
    console.log("Processing...");
  }
}

// keepProcessing();
// throwError("This is a custom error message.");

// ========== Type Assertions ==========
console.log("\n===== Type Assertions Example =====");
let code1: any = 1223;
let employeeCode = <number>code1;
console.log(`Employee Code: ${employeeCode}`);
let empCode1 = code1 as number;
console.log(`Employee Code using as: ${empCode1}`);

// ========== Functions with Type Annotations ==========
console.log("\n===== Functions with Type Annotations =====");

function sum1(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else {
    return a.toString() + b.toString();
  }
}

console.log(sum1("10", 20));
console.log(sum1("Hello ", "World"));
console.log(sum1(10, 20));
console.log(sum1(15, " apples"));

// ========== Function Overloads ==========
// console.log("\n===== Function Overloading Example =====");
console.log("\n===== Function Overloading Example (with Nested Array Support) =====");

// 🔹 Overload declarations
function findCommon(arr1: number[], arr2: number[]): number[];
function findCommon(arr1: string[], arr2: string[]): string[];
function findCommon(str1: string, str2: string): string[];
function findCommon(arr1: (number | (number[]) )[], arr2: number[]): number[]; // nested array support

// 🔹 Shared implementation
function findCommon(a: any, b: any): any[] {

  // Helper: Flatten nested arrays
  function flattenArray(arr: any[]): any[] {
    const result: any[] = [];
    for (const item of arr) {
      if (Array.isArray(item)) {
        result.push(...flattenArray(item)); // recursive flatten
      } else {
        result.push(item);
      }
    }
    return result;
  }

  // Case 1: Both are strings → find common characters
  if (typeof a === "string" && typeof b === "string") {
    const chars1 = a.split("");
    const chars2 = b.split("");
    const result: string[] = [];

    for (const ch of chars1) {
      if (chars2.includes(ch) && !result.includes(ch)) {
        result.push(ch);
      }
    }
    return result;
  }

  // Case 2: Both are arrays (numbers or strings, nested allowed)
  if (Array.isArray(a) && Array.isArray(b)) {
    const flatA = flattenArray(a);
    const flatB = flattenArray(b);
    const result: any[] = [];

    for (const item of flatA) {
      if (flatB.includes(item) && !result.includes(item)) {
        result.push(item);
      }
    }
    return result;
  }

  throw new Error("Unsupported input types");
}

// 🔹 Test Cases
console.log("Common in number arrays:", findCommon([1, 2, 3, 4], [3, 4, 5, 6]));
console.log("Common in string arrays:", findCommon(["apple", "banana"], ["banana", "cherry"]));
console.log("Common in strings:", findCommon("hello", "world"));
console.log("Common in nested arrays:", findCommon([1, 2, [3, 4]], [3, 4]));



// ========== Function Overloads (Simpler Version) ==========
console.log("\n===== Function Overloading Example (Simpler + Fixed Version) =====");

function findCommon1(arr1: any, arr2: any): any[] {
  let v1: any[];
  let v2: any[];

  // --- Handle string input ---
  if (typeof arr1 === "string" && typeof arr2 === "string") {
    v1 = arr1.toLowerCase().split(""); // safer than [...string]
    v2 = arr2.toLowerCase().split("");
  } 
  // --- Handle array input ---
  else {
    // Helper: Flatten nested arrays
    function flattenArray(arr: any[]): any[] {
      return arr.reduce(
        (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val),
        []
      );
    }
    v1 = flattenArray(arr1);
    v2 = flattenArray(arr2);
  }

  // --- Store unique results ---
  const result = new Set<any>();

  for (let i = 0; i < v1.length; i++) {
    for (let j = 0; j < v2.length; j++) {
      if (v1[i] === v2[j]) {
        result.add(v1[i]);
        break;
      }
    }
  }

  return Array.from(result);
}

// 🔹 Test cases
console.log("Common in number arrays:", findCommon1([1, 2, 3, 4], [3, 4, 5, 6]));
console.log("Common in string arrays:", findCommon1(["apple", "banana"], ["banana", "cherry"]));
console.log("Common in strings:", findCommon1("hello", "world"));
console.log("Common in nested arrays:", findCommon1([1, 2, [3, 4]], [3, 4]));



// ==========================================================

// function

 
// function findCommon1(arr1, arr2) {
//     let v1;
//     let v2;
//     if (typeof(arr1) ==="string"){
//         v1 =[...arr1.toLowerCase()];
//         v2 =[...arr2.toLowerCase()];
//     }else{
//         v1 = arr1;
//         v2 = arr2;
//     }
//     var result = new set();
//     for (var i = 0; i < v1.length; i++) {
//         for (var j = 0; j < v2.length; j++) {
//             if(v1.findindex(x=>v1[i]==v2[j])>=0){
//                 result.add(v1[i]);
//                 break;
//             }
//         }
//     }
//     return [...result];
// }
 
//  ==========================================================
 
// ========== Reverse Function with Overloads ==========

console.log("\n===== Reverse Function Example =====");

function reverse(value: string): string;
function reverse(value: number): number;
function reverse(value: string | number): string | number {
  // Convert number → string for uniform processing
  const str = value.toString().split("").reverse().join("");

  // If original was a number, convert back
  if (typeof value === "number") {
    return Number(str);
  }

  // If it was a string, return reversed string
  return str;
}

// 🔹 Test Cases
console.log("Reverse string:", reverse("Sathish")); // "hsithaS"
console.log("Reverse number:", reverse(12345));     // 54321
console.log("Reverse string:", reverse("Hello!"));  // "!olleH"
console.log("Reverse float:", reverse(1001.76));     // 1001


// ========== Reverse Function with Overloads (Enhanced) ==========
// console.log("\n===== Reverse Function Example (Enhanced) =====");
// console.log("Note: Float numbers are not reversed.");

// function reverse1(value: string): string;
// function reverse1(value: number): number | string; // can return same float or reversed int
// function reverse1(value: string | number): string | number {
//   // --- Case 1: String ---
//   if (typeof value === "string") {
//     return value.split("").reverse().join("");
//   }

//   // --- Case 2: Number ---
//   if (typeof value === "number") {
//     // Check if it’s a float (has a decimal)
//     try{
//         if (!Number.isInteger(value)) {

//       console.log(`Skipping float reversal for: ${value}`);
//       return value; // Return as-is for floats
//     }
//     }catch(err){
//         console.log("Error in isInteger check:", err);
//     }
  
//     // Reverse integer numbers only
//     const reversedStr = value.toString().split("").reverse().join("");
//     return Number(reversedStr);
//   }

//   throw new Error("Unsupported type");
// }

// // 🔹 Test Cases
// console.log("Reverse string:", reverse1("Sathish")); // "hsithaS"
// console.log("Reverse number:", reverse1(12345));     // 54321
// console.log("Reverse string:", reverse1("Hello!"));  // "!olleH"
// console.log("Reverse float:", reverse1(1001.76));    // 1001.76 (unchanged)


// ========================================================== va
// ========== Join and Number Conversion Example ==========
console.log("\n===== Join and Number Conversion Example =====");
var a =[1,2,3];
console.log(a.join(","));
console.log(Number(a.join("")));

a.reverse();
console.log(a);


// ============================================================
console.log("\n===== Enhanced Reverse Function + Square Example =====");

// 🔹 Function Overloads
function reverse1(value: string): string;
function reverse1(value: number): number;
function reverse1<T>(value: T[]): T[];
function reverse1(value: string | number | any[]): string | number | any[] {
  // --- Case 1: String ---
  if (typeof value === "string") {
    try {
      return value.split("").reverse().join("");
    } catch (err) {
      console.error("Error reversing string:", err);
      return "Error: Failed to reverse string";
    }
  }

  // --- Case 2: Array ---
  if (Array.isArray(value)) {
    try {
      // Safely reverse array (non-destructive)
      return value.slice().reverse();
    } catch (err) {
      console.error("Error reversing array:", err);
      return ["Error: Failed to reverse array"];
    }
  }

  // --- Case 3: Number ---
  if (typeof value === "number") {
    try {
      // Detect float (throws error if float)
      if (!Number.isInteger(value)) {
        throw new Error(`Float value detected (${value}) — reversal not allowed.`);
      }

      // Reverse digits of integer
      const reversedStr = value.toString().split("").reverse().join("");
      return Number(reversedStr);

    } catch (err: any) {
      console.error("Number reversal error:", err.message);
      return NaN; // Explicitly return NaN on error
    }
  }

  throw new Error("Unsupported type passed to reverse1()");
}

// 🔹 Square Function (returns an array of squares)
function square(n: number): number[] {
  try {
    if (n <= 0) throw new Error("Please provide a positive integer greater than zero.");

    const result: number[] = [];
    for (let i = 1; i <= n; i++) {
      result.push(Math.pow(i, 2));
    }
    return result;

  } catch (err: any) {
    console.error("Error in square():", err.message);
    return [];
  }
}

// 🔹 Test Cases
console.log("Reverse string:", reverse1("Sathish"));      // "hsithaS"
console.log("Reverse number:", reverse1(12345));          // 54321
console.log("Reverse string:", reverse1("Hello!"));       // "!olleH"
console.log("Reverse float:", reverse1(1001.76));         // Error logged + NaN
console.log("Reverse array:", reverse1([10, 20, 30, 40])); // [40, 30, 20, 10]
console.log("Reverse mixed array:", reverse1(["a", 1, true, "z"])); // ["z", true, 1, "a"]

// 🔹 Square Function + Reverse
console.log("\n===== Square Function + Reverse Example =====");

const squared = square(5);
console.log("Squared Values:", squared);
console.log("Reversed Squared Values:", reverse1(squared));


// ==========================================================
console.log("\n===== Abstract Class Example =====");


abstract class person{
  name:string;
  constructor(name:string){
      this.name=name;
  }

  display():void{
      console.log(`Person Name: ${this.name}`);
  }
  abstract find(name:string):person;
  // abstract find(string):Person;
}

class Employee extends person{
  empcode:number;
  constructor(name:string,empcode:number){
      super(name);
      this.empcode=empcode;
  }

  find(name:string):person{
      return new Employee(name,123);
  }
}
let emp:person=new Employee("Sathish",101);
emp.display();
let emp1=emp.find("Kumar");
emp1.display();
console.log(`Employee Code: ${(emp1 as Employee).empcode}`);
console.log("==========================================================");


abstract class Animal {
  abstract makeSound(): void;
  move(): void {
      console.log("Roaming the earth...");
  }
}
class Dog extends Animal {
  makeSound(): void {
      console.log("Bark");
  }
}
let dog = new Dog();
dog.makeSound();
dog.move();

console.log("==========================================================");