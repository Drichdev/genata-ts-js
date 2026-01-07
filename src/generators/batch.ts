/**
 * Batch data generation - Generate multiple records at once
 */

import type { FieldDefinition, BatchGeneratorOptions } from "../types";
import { validateBatchOptions, validateFieldType } from "../validators";
import { generateField } from "./field";

export function generateBatch(
  fields: FieldDefinition[],
  options?: BatchGeneratorOptions
): Record<string, unknown>[] {
  validateBatchOptions(options || {});

  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error("Fields must be a non-empty array");
  }

  // Validate all field types before generating
  fields.forEach((field) => {
    validateFieldType(field.type);
  });

  const count = options?.count ?? 100;
  const data: Record<string, unknown>[] = [];

  for (let i = 0; i < count; i++) {
    const row: Record<string, unknown> = {};

    for (const field of fields) {
      row[field.name] = generateField(field.type, {
        ...options,
        index: i,
      });
    }

    data.push(row);
  }

  return data;
}

/**
 * Generate a single batch with progress tracking
 */
export function generateBatchWithProgress(
  fields: FieldDefinition[],
  options?: BatchGeneratorOptions & { onProgress?: (progress: number) => void }
): Record<string, unknown>[] {
  validateBatchOptions(options || {});

  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error("Fields must be a non-empty array");
  }

  fields.forEach((field) => {
    validateFieldType(field.type);
  });

  const count = options?.count ?? 100;
  const data: Record<string, unknown>[] = [];
  const onProgress = options?.onProgress;

  for (let i = 0; i < count; i++) {
    const row: Record<string, unknown> = {};

    for (const field of fields) {
      row[field.name] = generateField(field.type, {
        ...options,
        index: i,
      });
    }

    data.push(row);

    if (onProgress) {
      onProgress(Math.round(((i + 1) / count) * 100));
    }
  }

  return data;
}
