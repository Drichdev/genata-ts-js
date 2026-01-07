/**
 * Types and interfaces for Genata data generation
 */

export type FieldType =
  | "first_name"
  | "last_name"
  | "full_name"
  | "email"
  | "password"
  | "phone"
  | "address"
  | "city"
  | "country"
  | "zip"
  | "date"
  | "datetime"
  | "int"
  | "float"
  | "uuid"
  | "boolean"
  | "id_increment"
  | "number"
  | "zero_one"
  | "company"
  | "job_title"
  | "username"
  | "url"
  | "credit_card"
  | "ipv4"
  | "ipv6"
  | "color"
  | "hex"
  | "paragraph"
  | "sentence"
  | "word"
  | "slug";

export interface GeneratorOptions {
  seed?: number;
  locale?: string;
}

export interface FieldDefinition {
  name: string;
  type: FieldType;
  options?: Record<string, unknown>;
}

export interface BatchGeneratorOptions extends GeneratorOptions {
  count?: number;
}

export interface GeneratorConfig {
  minLength?: number;
  maxLength?: number;
  format?: string;
  pattern?: string;
  excludeSpecialChars?: boolean;
}
