/**
 * Validation utilities for Genata options and inputs
 */

import type { FieldType, GeneratorOptions, BatchGeneratorOptions } from "../types";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateSeed(seed: number | undefined): void {
  if (seed !== undefined && (!Number.isInteger(seed) || seed < 0)) {
    throw new ValidationError("Seed must be a non-negative integer");
  }
}

export function validateCount(count: number | undefined): void {
  if (count !== undefined && (!Number.isInteger(count) || count < 1)) {
    throw new ValidationError("Count must be a positive integer");
  }
}

export function validateLocale(locale: string | undefined): void {
  if (locale !== undefined && typeof locale !== "string") {
    throw new ValidationError("Locale must be a string");
  }
}

export function validateGeneratorOptions(options: GeneratorOptions): void {
  validateSeed(options.seed);
  validateLocale(options.locale);
}

export function validateBatchOptions(options: BatchGeneratorOptions): void {
  validateGeneratorOptions(options);
  validateCount(options.count);
}

export function isValidFieldType(type: unknown): type is FieldType {
  const validTypes: FieldType[] = [
    "first_name",
    "last_name",
    "full_name",
    "email",
    "password",
    "phone",
    "address",
    "city",
    "country",
    "zip",
    "date",
    "datetime",
    "int",
    "float",
    "uuid",
    "boolean",
    "id_increment",
    "number",
    "zero_one",
    "company",
    "job_title",
    "username",
    "url",
    "credit_card",
    "ipv4",
    "ipv6",
    "color",
    "paragraph",
    "sentence",
  ];

  return typeof type === "string" && validTypes.includes(type as FieldType);
}

export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters but keep reasonable special chars
  return input.replace(/[<>{}]/g, "");
}

export function validateFieldType(type: unknown): asserts type is FieldType {
  if (!isValidFieldType(type)) {
    throw new ValidationError(`Invalid field type: ${type}`);
  }
}
