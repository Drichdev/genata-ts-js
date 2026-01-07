/**
 * Basic data generators
 * Security: All inputs are validated and sanitized
 */

import { getFaker } from "../utils/faker";
import type { GeneratorOptions } from "../types";
import { validateGeneratorOptions } from "../validators";

export const PersonGenerators = {
  firstName: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.person.firstName();
  },

  lastName: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.person.lastName();
  },

  fullName: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.person.fullName();
  },

  email: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.internet.email().toLowerCase();
  },

  username: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.internet.username().toLowerCase();
  },

  password: (options?: GeneratorOptions & { length?: number }): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    const length = options?.length || 16;

    if (length < 8 || length > 128) {
      throw new Error("Password length must be between 8 and 128 characters");
    }

    return faker.internet.password({ length });
  },

  phone: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.phone.number();
  },
};

export const LocationGenerators = {
  address: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.location.streetAddress();
  },

  city: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.location.city();
  },

  country: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.location.country();
  },

  zipCode: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.location.zipCode();
  },
};

export const InternetGenerators = {
  url: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.internet.url();
  },

  ipv4: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.internet.ipv4();
  },

  ipv6: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.internet.ipv6();
  },

  creditCard: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.finance.creditCardNumber();
  },
};

export const CompanyGenerators = {
  company: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.company.name();
  },

  jobTitle: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.person.jobTitle();
  },
};

export const DateGenerators = {
  date: (options?: GeneratorOptions & { format?: string }): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.date.past().toISOString().split("T")[0];
  },

  dateTime: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.date.recent().toISOString();
  },

  futureDate: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.date.future().toISOString().split("T")[0];
  },
};

export const DataTypeGenerators = {
  uuid: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.string.uuid();
  },

  boolean: (options?: GeneratorOptions): boolean => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.datatype.boolean();
  },

  integer: (options?: GeneratorOptions & { min?: number; max?: number }): number => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    const min = options?.min ?? 0;
    const max = options?.max ?? 100;

    if (min >= max) {
      throw new Error("Min must be less than max");
    }

    return faker.number.int({ min, max });
  },

  float: (options?: GeneratorOptions & { min?: number; max?: number; decimals?: number }): number => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    const min = options?.min ?? 0;
    const max = options?.max ?? 100;
    const decimals = options?.decimals ?? 2;

    if (min >= max) {
      throw new Error("Min must be less than max");
    }

    if (decimals < 0 || decimals > 10) {
      throw new Error("Decimals must be between 0 and 10");
    }

    return faker.number.float({ min, max, fractionDigits: decimals });
  },

  hex: (options?: GeneratorOptions & { length?: number }): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    const length = options?.length ?? 8;

    if (length < 1 || length > 256) {
      throw new Error("Hex length must be between 1 and 256");
    }

    return faker.string.hexadecimal({ length });
  },

  color: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.color.rgb();
  },
};

export const TextGenerators = {
  sentence: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.lorem.sentence();
  },

  paragraph: (options?: GeneratorOptions & { sentences?: number }): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    const sentences = options?.sentences ?? 3;

    if (sentences < 1 || sentences > 20) {
      throw new Error("Sentences must be between 1 and 20");
    }

    return faker.lorem.paragraphs(sentences);
  },

  word: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.lorem.word();
  },

  slug: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.lorem.slug();
  },
};
