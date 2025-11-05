// ========== Basic Types ==========
var first = 10;
var second = 20;
var third = 0o30; // Octal literal (base 8 → 24)
var sum = 0b11001; // Binary literal (base 2 → 25)
var isPresent = true;
// ========== Arrays ==========
var fruit = ["Apple", "Banana", "Mango"];
var fruit2 = ["Pineapple", "Grapes", "Orange"];
var arr = [1, "Sathish", true];
// ========== Union Types ==========
let ids = [1, "Sathish", 2, "Kumar"];
let mixed = [1, "Hello", true, 2, "World", false];
// ========== Tuple ==========
let tuple = [1, "Sathish", true];
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
var empId = 123;
var empName = "Sathish";
var isEmpActive = true;
var empDept = ["IT", "HR", "Finance"];
console.log(`\nEmployee Details:
ID: ${empId}
Name: ${empName}
Active: ${isEmpActive}
Departments: ${empDept.join(", ")}
`);
var employee = [456, "Kumar", false, ["Marketing", "Sales"]];
console.log(`Employee Details:
ID: ${employee[0]}
Name: ${employee[1]}
Active: ${employee[2]}
Departments: ${employee[3].join(", ")}
`);
// =========== Enum ==========
var printMedia;
(function (printMedia) {
    printMedia[printMedia["Newspaper"] = 0] = "Newspaper";
    printMedia[printMedia["Newsletter"] = 1] = "Newsletter";
    printMedia[printMedia["Magazine"] = 2] = "Magazine";
    printMedia[printMedia["Book"] = 3] = "Book";
})(printMedia || (printMedia = {}));
function getMediaType(mediaName) {
    if (mediaName === "Newspaper" || mediaName === "Newsletter" || mediaName === "Book") {
        return printMedia.Magazine;
    }
}
let mediaType = getMediaType("Forbes");
console.log("\n===== Enum Example =====");
console.log(`Media Type: ${mediaType}`); // Output: Media Type: 2
console.log(`Media Type Name: ${printMedia[mediaType]}`); // Output: Media Type Name: Magazine
// ========== Any Type ==========
console.log("\n===== Any Type Example =====");
let randomValue = 10;
console.log(`Random Value (number): ${randomValue}`);
randomValue = "Hello World";
console.log(`Random Value (string): ${randomValue}`);
randomValue = true;
console.log(`Random Value (boolean): ${randomValue}`);
let code;
code = 123;
console.log(`\nCode as number: ${code}`);
code = "ABC123";
console.log(`Code as string: ${code}`);
// code = true; // This will cause a TypeScript error
// console.log(`Code as boolean: ${code}`);
// ========== Void Type ==========
console.log("\n===== Void Type Example =====");
function logMessage() {
    console.log("\nThis is a void function that does not return anything.");
}
let result = logMessage();
console.log(`Result of void function: ${result}`); // Output: Result of void function: undefined
// ========== Null and Undefined ==========
console.log("\n===== Null and Undefined Example =====");
let u = undefined;
let n = null;
console.log(`Undefined value: ${u}`); // Output: Undefined value: undefined
console.log(`Null value: ${n}`); // Output: Null value: null
// ========== Never Type ==========
console.log("\n===== Never Type Example =====");
function throwError(errorMsg) {
    throw new Error(errorMsg);
    console.log("This line will never be executed.");
}
// Uncomment the following line to see the never type in action
function keepProcessing() {
    while (true) {
        console.log("Processing...");
        // Infinite loop
    }
}
// keepProcessing();
// throwError("This is a custom error message.");
// ========== Type Assertions ==========
console.log("\n===== Type Assertions Example =====");
let code1 = 1223;
let employeeCode = code1;
console.log(`\nEmployee Code: ${employeeCode}`);
let empCode1 = code1;
console.log(`Employee Code using as: ${empCode1}`);
export {};
//# sourceMappingURL=test.js.map