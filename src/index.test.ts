/**
 * Example tests for Genata
 * These demonstrate how to test the generators
 */

import genata, { PersonGenerators, ValidationError } from "../index";

describe("PersonGenerators", () => {
  describe("email", () => {
    it("should generate valid email format", () => {
      const email = PersonGenerators.email();
      // Simple email regex
      expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it("should return lowercase email", () => {
      const email = PersonGenerators.email();
      expect(email).toBe(email.toLowerCase());
    });

    it("should support seeding", () => {
      genata.setSeed(12345);
      const email1 = PersonGenerators.email({ seed: 12345 });

      genata.setSeed(12345);
      const email2 = PersonGenerators.email({ seed: 12345 });

      expect(email1).toBe(email2);
    });
  });

  describe("password", () => {
    it("should generate password with default length", () => {
      const password = PersonGenerators.password();
      expect(password.length).toBeGreaterThanOrEqual(8);
    });

    it("should respect custom length", () => {
      const password = PersonGenerators.password({ length: 20 });
      expect(password.length).toBe(20);
    });

    it("should reject invalid length", () => {
      expect(() => {
        PersonGenerators.password({ length: 5 });
      }).toThrow();

      expect(() => {
        PersonGenerators.password({ length: 200 });
      }).toThrow();
    });
  });

  describe("firstName", () => {
    it("should generate non-empty first name", () => {
      const name = PersonGenerators.firstName();
      expect(name).toBeTruthy();
      expect(typeof name).toBe("string");
    });
  });

  describe("lastName", () => {
    it("should generate non-empty last name", () => {
      const name = PersonGenerators.lastName();
      expect(name).toBeTruthy();
      expect(typeof name).toBe("string");
    });
  });
});

describe("DataTypeGenerators", () => {
  describe("integer", () => {
    it("should generate integer within range", () => {
      const int = genata.datatype.integer({ min: 1, max: 100 });
      expect(Number.isInteger(int)).toBe(true);
      expect(int).toBeGreaterThanOrEqual(1);
      expect(int).toBeLessThanOrEqual(100);
    });

    it("should reject invalid range", () => {
      expect(() => {
        genata.datatype.integer({ min: 100, max: 1 });
      }).toThrow();
    });
  });

  describe("float", () => {
    it("should generate float with decimals", () => {
      const float = genata.datatype.float({
        min: 0,
        max: 100,
        decimals: 2,
      });
      expect(typeof float).toBe("number");
      expect(float).toBeGreaterThanOrEqual(0);
      expect(float).toBeLessThanOrEqual(100);
    });

    it("should reject invalid decimals", () => {
      expect(() => {
        genata.datatype.float({ decimals: 20 });
      }).toThrow();
    });
  });

  describe("uuid", () => {
    it("should generate valid UUID", () => {
      const uuid = genata.datatype.uuid();
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });
  });

  describe("boolean", () => {
    it("should generate boolean", () => {
      const bool = genata.datatype.boolean();
      expect(typeof bool).toBe("boolean");
    });
  });
});

describe("Batch Generation", () => {
  describe("generateBatch", () => {
    it("should generate default 100 records", () => {
      const fields = [{ name: "email", type: "email" as const }];
      const data = genata.generateBatch(fields);
      expect(data.length).toBe(100);
    });

    it("should generate custom count", () => {
      const fields = [{ name: "email", type: "email" as const }];
      const data = genata.generateBatch(fields, { count: 50 });
      expect(data.length).toBe(50);
    });

    it("should include all fields", () => {
      const fields = [
        { name: "email", type: "email" as const },
        { name: "firstName", type: "first_name" as const },
        { name: "uuid", type: "uuid" as const },
      ];
      const data = genata.generateBatch(fields, { count: 1 });
      const record = data[0];

      expect(record).toHaveProperty("email");
      expect(record).toHaveProperty("firstName");
      expect(record).toHaveProperty("uuid");
    });

    it("should reject empty fields array", () => {
      expect(() => {
        genata.generateBatch([]);
      }).toThrow();
    });

    it("should reject invalid field type", () => {
      expect(() => {
        genata.generateBatch([
          { name: "test", type: "invalid_type" as any },
        ]);
      }).toThrow();
    });

    it("should support seeding for reproducible data", () => {
      const fields = [{ name: "email", type: "email" as const }];

      genata.setSeed(42);
      const data1 = genata.generateBatch(fields, { count: 5 });

      genata.setSeed(42);
      const data2 = genata.generateBatch(fields, { count: 5 });

      expect(data1).toEqual(data2);
    });
  });

  describe("generateBatchWithProgress", () => {
    it("should call progress callback", () => {
      const progressValues: number[] = [];
      const callback = (progress: number) => progressValues.push(progress);

      const fields = [{ name: "email", type: "email" as const }];
      genata.generateBatchWithProgress(fields, {
        count: 10,
        onProgress: callback,
      });

      // Should be called at least once
      expect(progressValues.length).toBeGreaterThan(0);
      // Last value should be 100
      expect(progressValues[progressValues.length - 1]).toBe(100);
    });
  });
});

describe("Seeding", () => {
  describe("setSeed", () => {
    it("should make generation deterministic", () => {
      genata.setSeed(999);
      const email1 = genata.email();
      const name1 = genata.firstName();

      genata.setSeed(999);
      const email2 = genata.email();
      const name2 = genata.firstName();

      expect(email1).toBe(email2);
      expect(name1).toBe(name2);
    });

    it("should reject negative seed", () => {
      expect(() => {
        genata.setSeed(-1);
      }).toThrow();
    });

    it("should reject non-integer seed", () => {
      expect(() => {
        genata.setSeed(3.14);
      }).toThrow();
    });
  });

  describe("resetSeed", () => {
    it("should reset to random generation", () => {
      genata.setSeed(42);
      const value1 = genata.email();

      genata.resetSeed();
      const value2 = genata.email();
      const value3 = genata.email();

      // After reset, values should be different
      expect(value2).not.toBe(value3);
    });
  });
});

describe("LocationGenerators", () => {
  it("should generate address", () => {
    const address = genata.location.address();
    expect(typeof address).toBe("string");
    expect(address.length).toBeGreaterThan(0);
  });

  it("should generate city", () => {
    const city = genata.location.city();
    expect(typeof city).toBe("string");
    expect(city.length).toBeGreaterThan(0);
  });

  it("should generate country", () => {
    const country = genata.location.country();
    expect(typeof country).toBe("string");
    expect(country.length).toBeGreaterThan(0);
  });

  it("should generate zip code", () => {
    const zip = genata.location.zipCode();
    expect(typeof zip).toBe("string");
  });
});

describe("InternetGenerators", () => {
  it("should generate URL", () => {
    const url = genata.internet.url();
    expect(url).toMatch(/^https?:\/\//);
  });

  it("should generate IPv4", () => {
    const ip = genata.internet.ipv4();
    const parts = ip.split(".");
    expect(parts.length).toBe(4);
    parts.forEach((part) => {
      const num = parseInt(part, 10);
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThanOrEqual(255);
    });
  });

  it("should generate credit card", () => {
    const cc = genata.internet.creditCard();
    expect(typeof cc).toBe("string");
    expect(cc.length).toBeGreaterThan(10);
  });
});

describe("TextGenerators", () => {
  it("should generate sentence", () => {
    const sentence = genata.text.sentence();
    expect(typeof sentence).toBe("string");
    expect(sentence.length).toBeGreaterThan(0);
  });

  it("should generate paragraph", () => {
    const para = genata.text.paragraph({ sentences: 3 });
    expect(typeof para).toBe("string");
    expect(para.length).toBeGreaterThan(0);
  });

  it("should reject invalid sentences count", () => {
    expect(() => {
      genata.text.paragraph({ sentences: 25 });
    }).toThrow();
  });
});

describe("Edge Cases", () => {
  it("should handle empty string field name", () => {
    const fields = [{ name: "", type: "email" as const }];
    const data = genata.generateBatch(fields, { count: 1 });
    expect(data[0]).toHaveProperty("");
  });

  it("should handle special characters in field name", () => {
    const fields = [{ name: "user-email", type: "email" as const }];
    const data = genata.generateBatch(fields, { count: 1 });
    expect(data[0]).toHaveProperty("user-email");
  });

  it("should maintain id_increment uniqueness", () => {
    const fields = [{ name: "id", type: "id_increment" as const }];
    const data = genata.generateBatch(fields, { count: 10 });

    const ids = data.map((r) => r.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(10);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
