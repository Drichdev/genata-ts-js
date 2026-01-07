/**
 * Genata Core - Main API
 * Simple and intuitive interface for data generation
 * 
 * Usage examples:
 * - genata.email() - generates a random email
 * - genata.person.firstName() - generates a first name
 * - genata.generateBatch([...]) - generates multiple records
 */

import {
  PersonGenerators,
  LocationGenerators,
  InternetGenerators,
  CompanyGenerators,
  DateGenerators,
  DataTypeGenerators,
  TextGenerators,
  generateBatch,
  generateBatchWithProgress,
} from "./generators";
import type { FieldDefinition, BatchGeneratorOptions } from "./types";
import { resetFaker, initializeFaker } from "./utils/faker";
import { validateGeneratorOptions } from "./validators";

/**
 * Main Genata API
 */
const genata = {
  // Direct access to most common generators
  email: () => PersonGenerators.email(),
  firstName: () => PersonGenerators.firstName(),
  lastName: () => PersonGenerators.lastName(),
  fullName: () => PersonGenerators.fullName(),
  username: () => PersonGenerators.username(),
  password: (options?: { length?: number }) =>
    PersonGenerators.password(options),
  phone: () => PersonGenerators.phone(),

  // Grouped generators by category
  person: PersonGenerators,
  location: LocationGenerators,
  internet: InternetGenerators,
  company: CompanyGenerators,
  date: DateGenerators,
  datatype: DataTypeGenerators,
  text: TextGenerators,

  // Batch generation
  generateBatch: (
    fields: FieldDefinition[],
    options?: BatchGeneratorOptions
  ) => generateBatch(fields, options),

  generateBatchWithProgress: (
    fields: FieldDefinition[],
    options?: BatchGeneratorOptions & { onProgress?: (progress: number) => void }
  ) => generateBatchWithProgress(fields, options),

  // Configuration
  setSeed: (seed: number) => {
    validateGeneratorOptions({ seed });
    initializeFaker({ seed });
  },

  resetSeed: () => {
    resetFaker();
  },

  setLocale: (locale: string) => {
    validateGeneratorOptions({ locale });
    initializeFaker({ locale });
  },
};

export default genata;
export * from "./types";
export * from "./validators";
export {
  PersonGenerators,
  LocationGenerators,
  InternetGenerators,
  CompanyGenerators,
  DateGenerators,
  DataTypeGenerators,
  TextGenerators,
  generateBatch,
  generateBatchWithProgress,
};
