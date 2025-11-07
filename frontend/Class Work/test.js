// ========== Basic Types ==========
var first = 10;
var second = 20;
var third = 24; // Octal literal (base 8 → 24)
var sum = 25; // Binary literal (base 2 → 25)
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
console.log("\nEmployee Details:\nID: ".concat(empId, "\nName: ").concat(empName, "\nActive: ").concat(isEmpActive, "\nDepartments: ").concat(empDept.join(", "), "\n"));
var employee = [456, "Kumar", false, ["Marketing", "Sales"]];
console.log("Employee Details:\nID: ".concat(employee[0], "\nName: ").concat(employee[1], "\nActive: ").concat(employee[2], "\nDepartments: ").concat(employee[3].join(", "), "\n"));
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
var mediaType = getMediaType("Forbes");
console.log("\n===== Enum Example =====");
console.log("Media Type: ".concat(mediaType)); // Output: Media Type: 2
console.log("Media Type Name: ".concat(printMedia[mediaType])); // Output: Media Type Name: Magazine
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
// code = true; // This will cause a TypeScript error
// console.log(`Code as boolean: ${code}`);
// ========== Void Type ==========
console.log("\n===== Void Type Example =====");
function logMessage() {
    console.log("\nThis is a void function that does not return anything.");
}
var result = logMessage();
console.log("Result of void function: ".concat(result)); // Output: Result of void function: undefined
// ========== Null and Undefined ==========
console.log("\n===== Null and Undefined Example =====");
var u = undefined;
var n = null;
console.log("Undefined value: ".concat(u)); // Output: Undefined value: undefined
console.log("Null value: ".concat(n)); // Output: Null value: null
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
var code1 = 1223;
var employeeCode = code1;
console.log("\nEmployee Code: ".concat(employeeCode));
var empCode1 = code1;
console.log("Employee Code using as: ".concat(empCode1));
// ========== Functions with Type Annotations ==========
console.log("\n===== Functions with Type Annotations =====");
// function a(b,c=5,d=10,e){
//     console.log("\nValues are:",b,c,d);
// }
function sum1(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b; // both numbers → return number
    }
    else {
        return a.toString() + b.toString(); // string concatenation
    }
}
console.log(sum1("10", 20)); // "1020"
console.log(sum1("Hello ", "World")); // "Hello World"
console.log(sum1(10, 20)); // 30
console.log(sum1(15, " apples")); // "15 apples"
// 🔹 Implementation (shared)
function findCommon(arr1, arr2) {
    var set2 = new Set(arr2);
    var result = [];
    for (var _i = 0, arr1_1 = arr1; _i < arr1_1.length; _i++) {
        var item = arr1_1[_i];
        if (set2.has(item)) {
            result.push(item);
        }
    }
    return result;
}
// 🔹 Test cases
console.log(findCommon([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]
console.log(findCommon(["apple", "banana"], ["banana", "cherry"])); // ["banana"]
console.log(findCommon(["a", "b", "c"], ["c", "d", "a"])); // ["a", "c"]
