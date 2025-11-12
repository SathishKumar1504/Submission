// ==========================================================
// 📘 TypeScript Comprehensive Example
// Author: Sathish Kumar M
// ==========================================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ========== Basic Types ==========
var first = 10;
var second = 20;
var third = 24; // Octal literal (24)
var sum = 25; // Binary literal (25)
var isPresent = true;
// ========== Arrays ==========
var fruit = ["Apple", "Banana", "Mango"];
var fruit2 = ["Pineapple", "Grapes", "Orange"];
var arr = [1, "Sathish", true];
// ========== Union Types ==========
var ids = [1, "Sathish", 2, "Kumar"];
var mixed = [1, "Hello", true, 2, "World", false];
// ========== Tuple ==========
var tuple = [1, "Sathish", true];
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
var empId = 123;
var empName = "Sathish";
var isEmpActive = true;
var empDept = ["IT", "HR", "Finance"];
console.log("\nEmployee Details:\nID: ".concat(empId, "\nName: ").concat(empName, "\nActive: ").concat(isEmpActive, "\nDepartments: ").concat(empDept.join(", "), "\n"));
var employee = [456, "Kumar", false, ["Marketing", "Sales"]];
console.log("Employee Details:\nID: ".concat(employee[0], "\nName: ").concat(employee[1], "\nActive: ").concat(employee[2], "\nDepartments: ").concat(employee[3].join(", "), "\n"));
// =========== Enum ==========
var PrintMedia;
(function (PrintMedia) {
    PrintMedia[PrintMedia["Newspaper"] = 0] = "Newspaper";
    PrintMedia[PrintMedia["Newsletter"] = 1] = "Newsletter";
    PrintMedia[PrintMedia["Magazine"] = 2] = "Magazine";
    PrintMedia[PrintMedia["Book"] = 3] = "Book";
})(PrintMedia || (PrintMedia = {}));
function getMediaType(mediaName) {
    if (["Newspaper", "Newsletter", "Book"].includes(mediaName)) {
        return PrintMedia.Magazine;
    }
}
var mediaType = getMediaType("Forbes");
console.log("\n===== Enum Example =====");
console.log("Media Type: ".concat(mediaType));
if (mediaType !== undefined) {
    console.log("Media Type Name: ".concat(PrintMedia[mediaType]));
}
// ========== Any Type ==========
console.log("\n===== Any Type Example =====");
var randomValue = 10;
console.log("Random Value (number): ".concat(randomValue));
randomValue = "Hello World";
console.log("Random Value (string): ".concat(randomValue));
randomValue = true;
console.log("Random Value (boolean): ".concat(randomValue));
var code;
code = 123;
console.log("\nCode as number: ".concat(code));
code = "ABC123";
console.log("Code as string: ".concat(code));
// ========== Void Type ==========
console.log("\n===== Void Type Example =====");
function logMessage() {
    console.log("This is a void function that does not return anything.");
}
var result = logMessage();
console.log("Result of void function: ".concat(result)); // undefined
// ========== Null and Undefined ==========
console.log("\n===== Null and Undefined Example =====");
var u = undefined;
var n = null;
console.log("Undefined value: ".concat(u));
console.log("Null value: ".concat(n));
// ========== Never Type ==========
console.log("\n===== Never Type Example =====");
function throwError(errorMsg) {
    throw new Error(errorMsg);
}
function keepProcessing() {
    while (true) {
        console.log("Processing...");
    }
}
// keepProcessing();
// throwError("This is a custom error message.");
// ========== Type Assertions ==========
console.log("\n===== Type Assertions Example =====");
var code1 = 1223;
var employeeCode = code1;
console.log("Employee Code: ".concat(employeeCode));
var empCode1 = code1;
console.log("Employee Code using as: ".concat(empCode1));
// ========== Functions with Type Annotations ==========
console.log("\n===== Functions with Type Annotations =====");
function sum1(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    else {
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
// 🔹 Shared implementation
function findCommon(a, b) {
    // Helper: Flatten nested arrays
    function flattenArray(arr) {
        var result = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            if (Array.isArray(item)) {
                result.push.apply(result, flattenArray(item)); // recursive flatten
            }
            else {
                result.push(item);
            }
        }
        return result;
    }
    // Case 1: Both are strings → find common characters
    if (typeof a === "string" && typeof b === "string") {
        var chars1 = a.split("");
        var chars2 = b.split("");
        var result_1 = [];
        for (var _i = 0, chars1_1 = chars1; _i < chars1_1.length; _i++) {
            var ch = chars1_1[_i];
            if (chars2.includes(ch) && !result_1.includes(ch)) {
                result_1.push(ch);
            }
        }
        return result_1;
    }
    // Case 2: Both are arrays (numbers or strings, nested allowed)
    if (Array.isArray(a) && Array.isArray(b)) {
        var flatA = flattenArray(a);
        var flatB = flattenArray(b);
        var result_2 = [];
        for (var _a = 0, flatA_1 = flatA; _a < flatA_1.length; _a++) {
            var item = flatA_1[_a];
            if (flatB.includes(item) && !result_2.includes(item)) {
                result_2.push(item);
            }
        }
        return result_2;
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
function findCommon1(arr1, arr2) {
    var v1;
    var v2;
    // --- Handle string input ---
    if (typeof arr1 === "string" && typeof arr2 === "string") {
        v1 = arr1.toLowerCase().split(""); // safer than [...string]
        v2 = arr2.toLowerCase().split("");
    }
    // --- Handle array input ---
    else {
        // Helper: Flatten nested arrays
        function flattenArray(arr) {
            return arr.reduce(function (acc, val) { return acc.concat(Array.isArray(val) ? flattenArray(val) : val); }, []);
        }
        v1 = flattenArray(arr1);
        v2 = flattenArray(arr2);
    }
    // --- Store unique results ---
    var result = new Set();
    for (var i = 0; i < v1.length; i++) {
        for (var j = 0; j < v2.length; j++) {
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
function reverse(value) {
    // Convert number → string for uniform processing
    var str = value.toString().split("").reverse().join("");
    // If original was a number, convert back
    if (typeof value === "number") {
        return Number(str);
    }
    // If it was a string, return reversed string
    return str;
}
// 🔹 Test Cases
console.log("Reverse string:", reverse("Sathish")); // "hsithaS"
console.log("Reverse number:", reverse(12345)); // 54321
console.log("Reverse string:", reverse("Hello!")); // "!olleH"
console.log("Reverse float:", reverse(1001.76)); // 1001
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
var a = [1, 2, 3];
console.log(a.join(","));
console.log(Number(a.join("")));
a.reverse();
console.log(a);
// ============================================================
console.log("\n===== Enhanced Reverse Function + Square Example =====");
function reverse1(value) {
    // --- Case 1: String ---
    if (typeof value === "string") {
        try {
            return value.split("").reverse().join("");
        }
        catch (err) {
            console.error("Error reversing string:", err);
            return "Error: Failed to reverse string";
        }
    }
    // --- Case 2: Array ---
    if (Array.isArray(value)) {
        try {
            // Safely reverse array (non-destructive)
            return value.slice().reverse();
        }
        catch (err) {
            console.error("Error reversing array:", err);
            return ["Error: Failed to reverse array"];
        }
    }
    // --- Case 3: Number ---
    if (typeof value === "number") {
        try {
            // Detect float (throws error if float)
            if (!Number.isInteger(value)) {
                throw new Error("Float value detected (".concat(value, ") \u2014 reversal not allowed."));
            }
            // Reverse digits of integer
            var reversedStr = value.toString().split("").reverse().join("");
            return Number(reversedStr);
        }
        catch (err) {
            console.error("Number reversal error:", err.message);
            return NaN; // Explicitly return NaN on error
        }
    }
    throw new Error("Unsupported type passed to reverse1()");
}
// 🔹 Square Function (returns an array of squares)
function square(n) {
    try {
        if (n <= 0)
            throw new Error("Please provide a positive integer greater than zero.");
        var result_3 = [];
        for (var i = 1; i <= n; i++) {
            result_3.push(Math.pow(i, 2));
        }
        return result_3;
    }
    catch (err) {
        console.error("Error in square():", err.message);
        return [];
    }
}
// 🔹 Test Cases
console.log("Reverse string:", reverse1("Sathish")); // "hsithaS"
console.log("Reverse number:", reverse1(12345)); // 54321
console.log("Reverse string:", reverse1("Hello!")); // "!olleH"
console.log("Reverse float:", reverse1(1001.76)); // Error logged + NaN
console.log("Reverse array:", reverse1([10, 20, 30, 40])); // [40, 30, 20, 10]
console.log("Reverse mixed array:", reverse1(["a", 1, true, "z"])); // ["z", true, 1, "a"]
// 🔹 Square Function + Reverse
console.log("\n===== Square Function + Reverse Example =====");
var squared = square(5);
console.log("Squared Values:", squared);
console.log("Reversed Squared Values:", reverse1(squared));
// ==========================================================
console.log("\n===== Abstract Class Example =====");
var person = /** @class */ (function () {
    function person(name) {
        this.name = name;
    }
    person.prototype.display = function () {
        console.log("Person Name: ".concat(this.name));
    };
    return person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, empcode) {
        var _this = _super.call(this, name) || this;
        _this.empcode = empcode;
        return _this;
    }
    Employee.prototype.find = function (name) {
        return new Employee(name, 123);
    };
    return Employee;
}(person));
var emp = new Employee("Sathish", 101);
emp.display();
var emp1 = emp.find("Kumar");
emp1.display();
console.log("Employee Code: ".concat(emp1.empcode));
console.log("==========================================================");
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function () {
        console.log("Roaming the earth...");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeSound = function () {
        console.log("Bark");
    };
    return Dog;
}(Animal));
var dog = new Dog();
dog.makeSound();
dog.move();
console.log("==========================================================");
