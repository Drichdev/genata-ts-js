/**
 * Genata Core - Usage Examples
 * Comprehensive examples showing how to use the library
 */

import genata from "./index";
import type { FieldDefinition } from "./types";

/**
 * Example 1: Simple single value generation
 */
export function example1_SingleValues() {
  console.log("=== Example 1: Single Values ===");
  console.log("Email:", genata.email());
  console.log("First Name:", genata.firstName());
  console.log("Last Name:", genata.lastName());
  console.log("Full Name:", genata.fullName());
  console.log("Phone:", genata.phone());
  console.log("Username:", genata.username());
  console.log("UUID:", genata.datatype.uuid());
  console.log("Address:", genata.location.address());
  console.log("City:", genata.location.city());
  console.log("URL:", genata.internet.url());
}

/**
 * Example 2: Generate test users for a database
 */
export function example2_GenerateTestUsers() {
  console.log("\n=== Example 2: Generate Test Users ===");

  const users = genata.generateBatch(
    [
      { name: "id", type: "id_increment" },
      { name: "email", type: "email" },
      { name: "firstName", type: "first_name" },
      { name: "lastName", type: "last_name" },
      { name: "phone", type: "phone" },
      { name: "company", type: "company" },
      { name: "jobTitle", type: "job_title" },
      { name: "isActive", type: "boolean" },
      { name: "createdAt", type: "datetime" },
    ],
    { count: 5 }
  );

  console.table(users);
}

/**
 * Example 3: Generate e-commerce products
 */
export function example3_GenerateProducts() {
  console.log("\n=== Example 3: Generate E-commerce Products ===");

  const products = genata.generateBatch(
    [
      { name: "sku", type: "uuid" },
      { name: "name", type: "sentence" },
      { name: "description", type: "paragraph" },
      { name: "price", type: "float" },
      { name: "stock", type: "int" },
      { name: "color", type: "color" },
      { name: "company", type: "company" },
    ],
    { count: 3 }
  );

  console.table(products);
}

/**
 * Example 4: Generate API test data
 */
export function example4_GenerateAPITestData() {
  console.log("\n=== Example 4: API Test Data ===");

  const testData = genata.generateBatch(
    [
      { name: "requestId", type: "uuid" },
      { name: "userAgent", type: "sentence" },
      { name: "ipAddress", type: "ipv4" },
      { name: "timestamp", type: "datetime" },
      { name: "statusCode", type: "int" },
      { name: "responseTime", type: "float" },
    ],
    { count: 5 }
  );

  console.table(testData);
}

/**
 * Example 5: Reproducible data with seed
 */
export function example5_ReproducibleData() {
  console.log("\n=== Example 5: Reproducible Data ===");

  // Generate data with seed
  genata.setSeed(12345);
  const email1 = genata.email();
  const name1 = genata.firstName();

  // Reset seed to get the same values
  genata.setSeed(12345);
  const email2 = genata.email();
  const name2 = genata.firstName();

  console.log("First generation:", { email: email1, name: name1 });
  console.log("Second generation:", { email: email2, name: name2 });
  console.log("Are they equal?", email1 === email2 && name1 === name2);

  // Reset to random
  genata.resetSeed();
}

/**
 * Example 6: Advanced data generation with options
 */
export function example6_AdvancedOptions() {
  console.log("\n=== Example 6: Advanced Options ===");

  const randomInt = genata.datatype.integer({ min: 1, max: 100 });
  const randomFloat = genata.datatype.float({
    min: 0,
    max: 1000,
    decimals: 2,
  });
  const password = genata.password({ length: 20 });
  const paragraph = genata.text.paragraph({ sentences: 5 });
  const hex = genata.datatype.hex({ length: 32 });

  console.log("Random integer (1-100):", randomInt);
  console.log("Random float (0-1000):", randomFloat);
  console.log("Secure password (20 chars):", password);
  console.log("Long paragraph:", paragraph);
  console.log("Hex string (32 chars):", hex);
}

/**
 * Example 7: Looping to generate multiple values
 */
export function example7_LoopGeneration() {
  console.log("\n=== Example 7: Loop Generation ===");

  const emails: string[] = [];
  for (let i = 0; i < 5; i++) {
    emails.push(genata.email());
  }

  console.log("Generated emails:", emails);

  // Alternative with map
  const names = Array.from({ length: 10 }, () => genata.fullName());
  console.log("Generated names:", names);
}

/**
 * Example 8: Progress tracking for large batches
 */
export async function example8_ProgressTracking() {
  console.log("\n=== Example 8: Progress Tracking ===");

  const fields: FieldDefinition[] = [
    { name: "id", type: "id_increment" },
    { name: "email", type: "email" },
    { name: "firstName", type: "first_name" },
    { name: "createdAt", type: "datetime" },
  ];

  const records = genata.generateBatchWithProgress(fields, {
    count: 1000,
    onProgress: (progress: number) => {
      console.log(`Progress: ${progress}%`);
    },
  });

  console.log(`Generated ${records.length} records`);
}

/**
 * Example 9: Real-world scenario - E-commerce database
 */
export function example9_RealWorldEcommerce() {
  console.log("\n=== Example 9: Real-world E-commerce Scenario ===");

  // Users
  const users = genata.generateBatch(
    [
      { name: "userId", type: "uuid" },
      { name: "email", type: "email" },
      { name: "firstName", type: "first_name" },
      { name: "lastName", type: "last_name" },
      { name: "phone", type: "phone" },
    ],
    { count: 3 }
  );

  // Orders
  const orders = genata.generateBatch(
    [
      { name: "orderId", type: "uuid" },
      { name: "userId", type: "id_increment" },
      { name: "total", type: "float" },
      { name: "status", type: "sentence" },
      { name: "createdAt", type: "datetime" },
    ],
    { count: 3 }
  );

  console.log("Users:", users);
  console.log("Orders:", orders);
}

/**
 * Example 10: Error handling
 */
export function example10_ErrorHandling() {
  console.log("\n=== Example 10: Error Handling ===");

  try {
    // This will throw an error - invalid field type
    genata.generateBatch(
      [{ name: "test", type: "invalid_type" as any }],
      { count: 10 }
    );
  } catch (error) {
    console.log("Caught error:", (error as Error).message);
  }

  try {
    // This will throw an error - invalid count
    genata.generateBatch(
      [{ name: "email", type: "email" }],
      { count: -5 }
    );
  } catch (error) {
    console.log("Caught error:", (error as Error).message);
  }

  try {
    // This will throw an error - invalid seed
    genata.setSeed(-10);
  } catch (error) {
    console.log("Caught error:", (error as Error).message);
  }
}

/**
 * Run all examples
 */
export function runAllExamples() {
  example1_SingleValues();
  example2_GenerateTestUsers();
  example3_GenerateProducts();
  example4_GenerateAPITestData();
  example5_ReproducibleData();
  example6_AdvancedOptions();
  example7_LoopGeneration();
  example8_ProgressTracking();
  example9_RealWorldEcommerce();
  example10_ErrorHandling();
}
