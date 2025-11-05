"use strict";
// ===================================================
// 📘 TypeScript Concept Module — Safe with try...catch
// Author: Sathish Kumar M
// Date: Nov 5, 2025
// ===================================================
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sith = exports.Jedi = void 0;
exports.basicLoop = basicLoop;
exports.calculateSum = calculateSum;
exports.typeExample = typeExample;
exports.arraySumExample = arraySumExample;
exports.tryCatchExample = tryCatchExample;
exports.sayhello = sayhello;
exports.extendedhello = extendedhello;
exports.symbolExample = symbolExample;
exports.symbolToPrimitiveExample = symbolToPrimitiveExample;
exports.flatten = flatten;
exports.reverse = reverse;
exports.mapExample = mapExample;
exports.setExample = setExample;
exports.iteratorExample = iteratorExample;
exports.asyncExample = asyncExample;
exports.objectExample = objectExample;
// 1️⃣ Basic Loop Example
function basicLoop() {
    try {
        var i = 0;
        console.log("Hello World!");
        console.log("Initialization complete.");
        console.log("Start");
        while (i < 5) {
            console.log("Iteration: " + i);
            i++;
        }
    }
    catch (e) {
        console.error("basicLoop() Error:", e.message);
    }
}
// 2️⃣ Arithmetic and Sum Example
function calculateSum() {
    try {
        var i = 0;
        i = i + 300 - 200 * 4;
        var sum = 0;
        var j = 1;
        while (j <= 100)
            sum += j++;
        console.log("Sum of 1–100 =", sum);
        console.log("Value of i =", i);
    }
    catch (e) {
        console.error("calculateSum() Error:", e.message);
    }
}
// 3️⃣ Type Handling Example
function typeExample() {
    try {
        var i = 0;
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
    }
    catch (e) {
        console.error("typeExample() Error:", e.message);
    }
}
// 4️⃣ Array Sum Example
function arraySumExample() {
    try {
        var a = [1, 3, 5, "Sk", 32, 3];
        var sum = 0;
        for (var i = 0; i < a.length; i++) {
            if (!isNaN(Number(a[i]))) {
                sum += Number(a[i]);
                console.log(a[i] + " is not a number");
                console.log("--------");
            }
            console.log("Sum till index " + i + " is " + sum);
        }
        console.log("Final Sum:", sum);
    }
    catch (e) {
        console.error("arraySumExample() Error:", e.message);
    }
}
// 5️⃣ try...catch Example
function tryCatchExample() {
    try {
        // @ts-ignore — intentional error for demo
        callFunctionNotDefined();
    }
    catch (e) {
        console.log("Error caught:", e.message);
    }
}
// 6️⃣ Function Example
function sayhello(name) {
    try {
        if (name != null) {
            name = name + 3;
            console.log("Hello " + name);
        }
        else {
            console.log("Hello " + name);
        }
    }
    catch (e) {
        console.error("sayhello() Error:", e.message);
    }
}
// 7️⃣ Default Params Example
function extendedhello(name, friend, age) {
    if (friend === void 0) { friend = "Sk"; }
    if (age === void 0) { age = 25; }
    try {
        console.log("Hello ".concat(name, " your friend is ").concat(friend, " and age is ").concat(age));
    }
    catch (e) {
        console.error("extendedhello() Error:", e.message);
    }
}
// 8️⃣ Class Example
var Jedi = /** @class */ (function () {
    function Jedi() {
        this.forceIsDark = false;
    }
    Jedi.prototype.toString = function () {
        return this.forceIsDark ? "Dark Side" : "Light Side";
    };
    return Jedi;
}());
exports.Jedi = Jedi;
var Sith = /** @class */ (function (_super) {
    __extends(Sith, _super);
    function Sith() {
        var _this = _super.call(this) || this;
        _this.forceIsDark = true;
        return _this;
    }
    Sith.prototype.toString = function () {
        return this.forceIsDark ? "Dark Side Sith" : "Light Side Sith";
    };
    return Sith;
}(Jedi));
exports.Sith = Sith;
// 9️⃣ Symbol Example
function symbolExample() {
    try {
        var s1 = Symbol("sathish");
        var s2 = Symbol("sathish");
        // ✅ Safe equality check using Object.is
        console.log("== :", Object.is(s1, s2));
        console.log("=== :", Object.is(s1, s2));
        var x = void 0;
        console.log(x == null);
        console.log(x === null);
        console.log(typeof x);
    }
    catch (e) {
        console.error("symbolExample() Error:", e.message);
    }
}
// 🔟 Symbol.toPrimitive Example
function symbolToPrimitiveExample() {
    var _a;
    try {
        var js_obj = (_a = {
                name: "Sathish",
                age: 24
            },
            _a[Symbol.toPrimitive] = function (hint) {
                if (hint === "string")
                    return "Hint: guess over 50";
                if (hint === "number")
                    return 58;
                return "somewhere between 50 and 60";
            },
            _a);
        console.log("".concat(js_obj));
        console.log(js_obj + "");
        console.log(+js_obj);
        console.log(js_obj);
    }
    catch (e) {
        console.error("symbolToPrimitiveExample() Error:", e.message);
    }
}
// 1️⃣1️⃣ Generator Example
function flatten(array) {
    var _i, array_1, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, array_1 = array;
                _a.label = 1;
            case 1:
                if (!(_i < array_1.length)) return [3 /*break*/, 6];
                item = array_1[_i];
                if (!Array.isArray(item)) return [3 /*break*/, 3];
                return [5 /*yield**/, __values(flatten(item))];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, item];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}
// 1️⃣2️⃣ Reverse Example — ✅ Fixed type error
function reverse(arr) {
    try {
        if (arr.length === 0)
            return [];
        var x = arr[0], y = arr.slice(1);
        return __spreadArray(__spreadArray([], reverse(y), true), [x], false);
    }
    catch (e) {
        console.error("reverse() Error:", e.message);
        return [];
    }
}
// 1️⃣3️⃣ Map Example
function mapExample() {
    try {
        var m = new Map(__spreadArray([], "abcd", true).map(function (x) { return [x, x + x]; }));
        console.log("Map entries:", __spreadArray([], m, true));
        console.log("JSON Stringify:", JSON.stringify(__spreadArray([], m, true)));
        console.log("Map has 'a':", m.has("a"));
    }
    catch (e) {
        console.error("mapExample() Error:", e.message);
    }
}
// 1️⃣4️⃣ Set Example
function setExample() {
    try {
        var s = new Set([1, 2, 2, 3, 4, 4, 5]);
        s.add(6);
        console.log("Set size:", s.size);
        s.delete(2);
        console.log("After delete(2):", s.size);
        console.log("Has 3:", s.has(3));
        console.log("Has 10:", s.has(10));
    }
    catch (e) {
        console.error("setExample() Error:", e.message);
    }
}
// 1️⃣5️⃣ Iterator Example
function iteratorExample() {
    try {
        var it = [1, 2, 3][Symbol.iterator]();
        console.log(it.next());
        console.log(it.next());
        console.log(it.next());
        console.log(it.next());
    }
    catch (e) {
        console.error("iteratorExample() Error:", e.message);
    }
}
// 1️⃣6️⃣ Async/Await Example
function asyncExample() {
    return __awaiter(this, void 0, void 0, function () {
        var ratings, sum, asyncSumFunction, syncSumFunction, _i, ratings_1, rating, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    ratings = [5, 4, 5];
                    sum = 0;
                    asyncSumFunction = function (a, b) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, a + b];
                    }); }); };
                    syncSumFunction = function (a, b) { return a + b; };
                    _i = 0, ratings_1 = ratings;
                    _a.label = 1;
                case 1:
                    if (!(_i < ratings_1.length)) return [3 /*break*/, 4];
                    rating = ratings_1[_i];
                    return [4 /*yield*/, asyncSumFunction(sum, rating)];
                case 2:
                    sum = _a.sent();
                    console.log("Async Sum till now:", sum);
                    sum = syncSumFunction(sum, rating);
                    console.log("Sync Sum till now:", sum);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.error("asyncExample() Error:", e_1.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// 1️⃣7️⃣ Object Freeze & Seal Example
function objectExample() {
    try {
        var obj = { par: 3 };
        obj.par = 15;
        Object.freeze(obj);
        // @ts-ignore — frozen property modification ignored
        obj.par = 10;
        Object.seal(obj);
        // @ts-ignore — new property addition ignored
        obj.newParam = 5;
        console.log(obj);
    }
    catch (e) {
        console.error("objectExample() Error:", e.message);
    }
}
