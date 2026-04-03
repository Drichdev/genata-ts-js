# Genata - Generate Realistic Fake Data

A lightweight, secure, and TypeScript-first library for generating realistic fake data for testing, development, and documentation.

---

## Features

* Simple and intuitive API
* Batch data generation
* Reproducible data with seed support
* Full TypeScript support
* Built-in validation and sanitization
* No runtime dependencies except `@faker-js/faker`
* 25+ data generators

---

## Why Genata?

* Cleaner and simpler API than typical faker usage
* Built-in batch generation without extra tooling
* Consistent seeding across all generators
* Type-safe by default

---

## Installation

```bash
npm install @drichdev/genata
# or
yarn add @drichdev/genata
# or
pnpm add @drichdev/genata
```

---

## Import

### ES Modules (recommended)

```javascript
import genata from '@drichdev/genata';
```

### CommonJS

```javascript
const genata = require('@drichdev/genata');
```

### TypeScript

```typescript
import genata, { type FieldDefinition } from '@drichdev/genata';
```

---

## Quick Start

```javascript
import genata from '@drichdev/genata';

const email = genata.email();
const firstName = genata.firstName();
const phone = genata.phone();
```

---

## Naming Convention

* Direct API uses camelCase
  `genata.firstName()`

* Batch generation uses snake_case
  `type: "first_name"`

---

## Generators

### Person

```javascript
genata.person.firstName();
genata.person.lastName();
genata.person.fullName();
genata.person.email();
genata.person.username();
genata.person.password();
genata.person.phone();
```

### Location

```javascript
genata.location.address();
genata.location.city();
genata.location.country();
genata.location.zipCode();
```

### Internet

```javascript
genata.internet.url();
genata.internet.ipv4();
genata.internet.ipv6();
genata.internet.creditCard();
```

### Company

```javascript
genata.company.company();
genata.company.jobTitle();
```

### Date

```javascript
genata.date.date();
genata.date.dateTime();
genata.date.futureDate();
```

### Data Types

```javascript
genata.datatype.uuid();
genata.datatype.boolean();
genata.datatype.integer({ min: 0, max: 100 });
genata.datatype.float({ min: 0, max: 100, decimals: 2 });
genata.datatype.color();
genata.datatype.hex({ length: 16 });
```

### Text

```javascript
genata.text.sentence();
genata.text.paragraph({ sentences: 5 });
genata.text.word();
genata.text.slug();
```

---

## Batch Generation

```javascript
const fields = [
  { name: "id", type: "id_increment" },
  { name: "email", type: "email" },
  { name: "firstName", type: "first_name" },
  { name: "lastName", type: "last_name" },
  { name: "phone", type: "phone" },
  { name: "createdAt", type: "datetime" },
];

// Default (100 records)
const users = genata.generateBatch(fields);

// Custom count
const largeDataset = genata.generateBatch(fields, { count: 1000 });

// With progress
const data = genata.generateBatchWithProgress(fields, {
  count: 10000,
  onProgress: (progress) => console.log(`${progress}% complete`),
});
```

---

## Supported Field Types

```
Person: first_name, last_name, full_name, email, username, password, phone
Location: address, city, country, zip
Internet: url, ipv4, ipv6, credit_card
Company: company, job_title
Date: date, datetime
Data Types: uuid, boolean, int, float, number, zero_one, id_increment, color, hex
Text: sentence, paragraph, word, slug
```

---

## Seeding (Reproducible Data)

```javascript
genata.setSeed(12345);

const email1 = genata.email();
const email2 = genata.email();

// Reset randomness
genata.resetSeed();
```

---

## API Reference

### `genata.email()`

Generate a random email.

```javascript
const email = genata.email();
```

---

### `genata.generateBatch(fields, options?)`

Generate multiple records.

**Parameters:**

* `fields`: Array of field definitions
* `options`:

  * `count` (default: 100)
  * `seed`
  * `locale`

**Returns:** Array of objects

---

### `genata.setSeed(seed)`

Set a seed for reproducible results.

---

### `genata.resetSeed()`

Reset random generation.

---

## Examples

### Generate Users

```javascript
const users = genata.generateBatch(
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
  { count: 50 }
);
```

---

### Generate Products

```javascript
const products = genata.generateBatch(
  [
    { name: "id", type: "uuid" },
    { name: "name", type: "sentence" },
    { name: "description", type: "paragraph", options: { sentences: 3 } },
    { name: "price", type: "float", options: { min: 10, max: 1000, decimals: 2 } },
    { name: "stock", type: "int", options: { min: 0, max: 1000 } },
    { name: "color", type: "color" },
  ],
  { count: 20 }
);
```

---

### Reproducible Tests

```javascript
beforeEach(() => {
  genata.setSeed(42);
});

const user1 = { email: genata.email() };

genata.setSeed(42);
const user2 = { email: genata.email() };
```

---

## Security

* Input validation on all public methods
* Sanitization of user-provided options
* No dynamic code execution
* Safe default values

---

## Architecture

* `generators`: data generation logic
* `types`: TypeScript definitions
* `validators`: input validation
* `utils`: internal helpers

---

## Testing

```bash
npm test
```

---

## Troubleshooting

### Invalid field type

Ensure the field type exists in the supported list.

### Seed not working

Set the seed before generating data and avoid mixing seeded and non-seeded calls.

### Performance issues

For very large datasets:

* Generate in chunks
* Use progress tracking
* Consider worker threads in browser environments

---

## Contributing

* TypeScript only
* Validate all inputs
* Maintain strong error handling
* Follow a security-first approach

---

## License

MIT

---

## Documentation

See [USAGE.md](./USAGE.md) for advanced usage.

---

## Author

Created by Drichdev
