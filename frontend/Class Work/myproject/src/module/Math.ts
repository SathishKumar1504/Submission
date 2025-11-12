// 📘 Math.ts — Example TypeScript Module

// Function with type annotations
export function add(a: number, b: number): number {
  return a + b;
}

// Constant with type annotation
export const PI: number = 3.14159;

// Class with typed static method
export class Calculator {
  static square(x: number): number {
    return x * x;
  }
}
