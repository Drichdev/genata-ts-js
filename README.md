# Genata - Generate Realistic Fake Data

A lightweight, secure, and TypeScript-first library for generating realistic fake data for testing, development, and documentation.

## 🚀 Features

- **Simple API**: `genata.email()`, `genata.firstName()`, etc.
- **Batch Generation**: Generate multiple records at once
- **Seeding Support**: Reproducible data with seed values
- **Type-Safe**: Full TypeScript support with strict typing
- **Secure**: Input validation and sanitization built-in
- **No Dependencies**: Only depends on @faker-js/faker
- **25+ Data Types**: From emails to credit cards

## 📦 Installation

```bash
npm install genata
# or
yarn add genata
# or
pnpm add genata
```

## 🎯 Quick Start

### Basic Usage

```javascript
import genata from "genata";

// Generate single values
const email = genata.email();
const firstName = genata.firstName();
const phone = genata.phone();

// Generate with options
const password = genata.password({ length: 20 });
const randomInt = genata.datatype.integer({ min: 1, max: 100 });
```

### Using Generators by Category

```javascript
// Person generators
genata.person.firstName();
genata.person.lastName();
genata.person.fullName();
genata.person.email();
genata.person.username();
genata.person.password();
genata.person.phone();

// Location generators
genata.location.address();
genata.location.city();
genata.location.country();
genata.location.zipCode();

// Internet generators
genata.internet.url();
genata.internet.ipv4();
genata.internet.ipv6();
genata.internet.creditCard();

// Company generators
genata.company.company();
genata.company.jobTitle();

// Date generators
genata.date.date();
genata.date.dateTime();
genata.date.futureDate();

// Data type generators
genata.datatype.uuid();
genata.datatype.boolean();
genata.datatype.integer({ min: 0, max: 100 });
genata.datatype.float({ min: 0, max: 100, decimals: 2 });
genata.datatype.color();
genata.datatype.hex({ length: 16 });

// Text generators
genata.text.sentence();
genata.text.paragraph({ sentences: 5 });
genata.text.word();
genata.text.slug();
```

### Batch Generation

Generate multiple records at once:

```javascript
const fields = [
  { name: "id", type: "id_increment" },
  { name: "email", type: "email" },
  { name: "firstName", type: "first_name" },
  { name: "lastName", type: "last_name" },
  { name: "phone", type: "phone" },
  { name: "createdAt", type: "datetime" },
];

// Generate 100 records (default)
const users = genata.generateBatch(fields);

// Generate 1000 records
const largeDataset = genata.generateBatch(fields, { count: 1000 });

// With progress tracking
const data = genata.generateBatchWithProgress(fields, {
  count: 10000,
  onProgress: (progress) => console.log(`${progress}% complete`),
});
```

### Seeding for Reproducible Data

```javascript
// Set a seed for reproducible results
genata.setSeed(12345);

const email1 = genata.email(); // Always the same value
const email2 = genata.email(); // Always the same value

// Reset to random generation
genata.resetSeed();
```

## 🔒 Security Features

- **Input Validation**: All options are validated before use
- **Sanitization**: User inputs are sanitized to prevent injection
- **Type Safety**: TypeScript strict mode ensures type correctness
- **Error Handling**: Proper error messages for invalid inputs
- **No Shell Execution**: No dynamic code execution
- **Immutable Defaults**: Safe default values that can't be modified

## 📋 Available Field Types

When using batch generation, supported field types are:

```
Person: first_name, last_name, full_name, email, username, password, phone
Location: address, city, country, zip
Internet: url, ipv4, ipv6, credit_card
Company: company, job_title
Date: date, datetime
Data Types: uuid, boolean, int, float, number, zero_one, id_increment, color
Text: sentence, paragraph
```

## 🎛️ API Reference

### Core Methods

#### `genata.email()`

Generate a random email address.

```javascript
const email = genata.email();
// "alice.johnson@example.com"
```

#### `genata.generateBatch(fields, options?)`

Generate multiple records.

**Parameters:**

- `fields` (FieldDefinition[]): Array of field definitions
- `options` (BatchGeneratorOptions?):
  - `count` (number): Number of records to generate (default: 100)
  - `seed` (number): Seed for reproducible data
  - `locale` (string): Locale for faker

**Returns:** Array of objects with generated data

#### `genata.setSeed(seed)`

Set a seed for reproducible data generation.

**Parameters:**

- `seed` (number): Non-negative integer seed value

#### `genata.resetSeed()`

Reset to random generation without a seed.

## 🏗️ Architecture

The library is organized into modules:

- **generators**: Data generation logic (basic, batch, field-level)
- **types**: TypeScript type definitions
- **validators**: Input validation and sanitization
- **utils**: Helper functions (faker initialization)

## 🧪 Testing

```bash
npm test
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please ensure:

- All code is TypeScript
- Security-first approach
- Input validation for all public methods
- Comprehensive error messages

## 📚 Examples

### Generate Test Users

```javascript
import genata from "genata";

const generateTestUsers = (count = 10) => {
  return genata.generateBatch(
    [
      { name: "id", type: "id_increment" },
      { name: "email", type: "email" },
      { name: "firstName", type: "first_name" },
      { name: "lastName", type: "last_name" },
      { name: "phone", type: "phone" },
      { name: "company", type: "company" },
      { name: "jobTitle", type: "job_title" },
      { name: "createdAt", type: "datetime" },
    ],
    { count }
  );
};

const users = generateTestUsers(50);
console.log(users);
```

### Generate E-commerce Products

```javascript
const generateProducts = (count = 20) => {
  return genata.generateBatch(
    [
      { name: "id", type: "uuid" },
      { name: "name", type: "sentence" },
      { name: "description", type: "paragraph", options: { sentences: 3 } },
      { name: "price", type: "float", options: { min: 10, max: 1000, decimals: 2 } },
      { name: "stock", type: "int", options: { min: 0, max: 1000 } },
      { name: "color", type: "color" },
    ],
    { count }
  );
};
```

### Reproducible Data for Tests

```javascript
describe("User Service", () => {
  beforeEach(() => {
    genata.setSeed(42);
  });

  test("should process user data consistently", () => {
    const user1 = { email: genata.email() };
    
    genata.setSeed(42);
    const user2 = { email: genata.email() };

    expect(user1.email).toBe(user2.email);
  });
});
```

## 🐛 Troubleshooting

### "Invalid field type" error

Make sure you're using a valid field type from the supported list.

### Data is not reproducible with seed

Make sure to set the seed before generating data and don't mix generator calls without resetting.

### Performance issues with large batches

For very large batches (>100K records), consider:

- Generating in chunks
- Using `generateBatchWithProgress` to show progress
- Running in a worker thread if in browser

---

Made with ❤️ by Genata Team
