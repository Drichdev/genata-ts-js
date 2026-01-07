/**
 * Faker wrapper with seeding support
 */

import { Faker, en } from "@faker-js/faker";
import type { GeneratorOptions } from "../types";

let globalFaker: Faker;

/**
 * Initialize the global faker instance with optional seed
 */
export function initializeFaker(options?: GeneratorOptions): Faker {
  if (options?.seed !== undefined) {
    // Always create new instance when seed is provided
    globalFaker = new Faker({ locale: en, seed: options.seed });
  } else if (!globalFaker) {
    // Only create new instance if none exists
    globalFaker = new Faker({ locale: en });
  }

  if (options?.locale) {
    // Faker locale can be set, but for simplicity we'll use the default
    // In production, you'd want to handle locale properly
  }

  return globalFaker;
}

/**
 * Get the current faker instance
 */
export function getFaker(options?: GeneratorOptions): Faker {
  return initializeFaker(options);
}

/**
 * Reset faker to a new random state
 */
export function resetFaker(): void {
  globalFaker = new Faker({ locale: en });
}

// Initialize on module load
initializeFaker();
