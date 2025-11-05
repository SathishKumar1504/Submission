// ========== Basic Types ==========
var first: number = 10;
var second: number = 20;
var third: number = 0o30;  // Octal literal (base 8 → 24)
var sum: number = 0b11001; // Binary literal (base 2 → 25)
var isPresent: boolean = true;

// ========== Arrays ==========
var fruit: string[] = ["Apple", "Banana", "Mango"];
var fruit2: Array<string> = ["Pineapple", "Grapes", "Orange"];
var arr = [1, "Sathish", true];

// ========== Union Types ==========
let ids: Array<number | string> = [1, "Sathish", 2, "Kumar"];
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
console.log(first);
console.log(second);
console.log(third);
console.log(sum);

console.log("===== Boolean Value =====");
console.log(isPresent);

console.log("===== Union Arrays =====");
console.log(ids);
console.log(mixed);

console.log("===== Tuple =====");
console.log(tuple);

// ========== Employee Details ==========
var empId: number = 123;
var empName: string = "Sathish";
var isEmpActive: boolean = true;
var empDept: string[] = ["IT", "HR", "Finance"];

console.log(`\nEmployee Details:
ID: ${empId}
Name: ${empName}
Active: ${isEmpActive}
Departments: ${empDept.join(", ")}
`);

var employee: [number, string, boolean, string[]] = [456, "Kumar", false, ["Marketing", "Sales"]];

console.log(`Employee Details:
ID: ${employee[0]}
Name: ${employee[1]}
Active: ${employee[2]}
Departments: ${employee[3].join(", ")}
`);


// =========== Enum ==========
enum printMedia {
    Newspaper,
    Newsletter,
    Magazine,
    Book
}

function getMediaType(mediaName: string): printMedia | undefined {
    if (mediaName === "Newspaper" || mediaName === "Newsletter" ||  mediaName === "Book") {
        return printMedia.Magazine;
    }
}

let mediaType: printMedia | undefined = getMediaType("Forbes");


console.log("\n===== Enum Example =====");
console.log(`Media Type: ${mediaType}`); // Output: Media Type: 2
console.log(`Media Type Name: ${printMedia[mediaType!]}`); // Output: Media Type Name: Magazine

// ========== Any Type ==========
console.log("\n===== Any Type Example =====");
let randomValue: any = 10;
console.log(`Random Value (number): ${randomValue}`);
randomValue = "Hello World";
console.log(`Random Value (string): ${randomValue}`);
randomValue = true;
console.log(`Random Value (boolean): ${randomValue}`);
let code:(number | string);
code = 123;
console.log(`\nCode as number: ${code}`);
code = "ABC123";
console.log(`Code as string: ${code}`);
// code = true; // This will cause a TypeScript error
// console.log(`Code as boolean: ${code}`);

// ========== Void Type ==========
console.log("\n===== Void Type Example =====");
function logMessage(): void {
    console.log("\nThis is a void function that does not return anything.");
}

let result: void = logMessage();
console.log(`Result of void function: ${result}`); // Output: Result of void function: undefined



// ========== Null and Undefined ==========
console.log("\n===== Null and Undefined Example =====");
let u: undefined = undefined;
let n: null = null;
console.log(`Undefined value: ${u}`); // Output: Undefined value: undefined
console.log(`Null value: ${n}`);       // Output: Null value: null


// ========== Never Type ==========
console.log("\n===== Never Type Example =====");

function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
    console.log("This line will never be executed.");
}

// Uncomment the following line to see the never type in action
function keepProcessing(): never {
    while (true) {
        console.log("Processing...");

        // Infinite loop
    }

}
// keepProcessing();
// throwError("This is a custom error message.");


// ========== Type Assertions ==========
console.log("\n===== Type Assertions Example =====");
let code1: any=1223;
let employeeCode = <number>code1;
console.log(`\nEmployee Code: ${employeeCode}`);
let empCode1 = code1 as number;
console.log(`Employee Code using as: ${empCode1}`);

// ========== Functions with Type Annotations ==========
console.log("\n===== Functions with Type Annotations =====");

// function a(b,c=5,d=10,e){
//     console.log("\nValues are:",b,c,d);
// }
function sum1(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a + b; // both numbers → return number
  } else {
    return a.toString() + b.toString(); // string concatenation
  }
}

console.log(sum1("10", 20));       // "1020"
console.log(sum1("Hello ", "World")); // "Hello World"
console.log(sum1(10, 20));         // 30
console.log(sum1(15, " apples")); // "15 apples"



// ========== Generics ==========
// 🔹 Function overloads
function findCommon(arr1: number[], arr2: number[]): number[];
function findCommon(arr1: string[], arr2: string[]): string[];

// 🔹 Implementation (shared)
function findCommon(arr1: any[], arr2: any[]): any[] {
  const set2 = new Set(arr2);
  const result: any[] = [];

  for (const item of arr1) {
    if (set2.has(item)) {
      result.push(item);
    }
  }

  return result;
}

// 🔹 Test cases
console.log(findCommon([1, 2, 3, 4], [3, 4, 5, 6]));               // [3, 4]
console.log(findCommon(["apple", "banana"], ["banana", "cherry"])); // ["banana"]
console.log(findCommon(["a", "b", "c"], ["c", "d", "a"]));          // ["a", "c"]
