# Genata - Usage Guide

## Installation

```bash
npm install @drichdev/genata
```

## Quick Start

### CommonJS (Node.js/Express)

```javascript
const genata = require('@drichdev/genata');

console.log(genata.email());        // 'user@example.com'
console.log(genata.firstName());    // 'John'
console.log(genata.phone());        // '(555) 123-4567'
```

### ES Modules (Node.js with "type": "module")

```javascript
import genata from '@drichdev/genata';

console.log(genata.email());        // 'user@example.com'
console.log(genata.firstName());    // 'John'
console.log(genata.phone());        // '(555) 123-4567'
```

### TypeScript / Next.js

```typescript
import genata from '@drichdev/genata';

export default function Home() {
  const email = genata.email();
  const firstName = genata.firstName();
  const phone = genata.phone();

  return (
    <div>
      <p>Email: {email}</p>
      <p>Name: {firstName}</p>
      <p>Phone: {phone}</p>
    </div>
  );
}
```

## Direct Access (Common Generators)

The most frequently used generators are available directly:

```javascript
import genata from '@drichdev/genata';

// Person
genata.email();        // 'alice.johnson@gmail.com'
genata.firstName();    // 'Sarah'
genata.lastName();     // 'Williams'
genata.fullName();     // 'Michael Brown'
genata.username();     // 'john_doe_123'
genata.password();     // 'Xy9$kL2@pQ'
genata.phone();        // '(555) 987-6543'
```

## Grouped Generators

Access generators by category:

```javascript
import genata from '@drichdev/genata';

// Person
genata.person.email();
genata.person.firstName();
genata.person.lastName();
genata.person.fullName();
genata.person.username();
genata.person.password();
genata.person.phone();

// Location
genata.location.address();        // '742 Evergreen Terrace'
genata.location.city();           // 'Springfield'
genata.location.country();        // 'United States'
genata.location.zipCode();        // '12345'

// Internet
genata.internet.url();            // 'https://example.com'
genata.internet.ipv4();           // '192.168.1.1'
genata.internet.ipv6();           // 'fe80::1'
genata.internet.creditCard();     // '4532-1234-5678-9010'

// Company
genata.company.company();         // 'Acme Corp'
genata.company.jobTitle();        // 'Software Engineer'

// Date & Time
genata.date.date();               // '2025-12-25'
genata.date.dateTime();           // '2026-01-07T10:15:30.726Z'

// Data Types
genata.datatype.uuid();           // '550e8400-e29b-41d4-a716-446655440000'
genata.datatype.boolean();        // true
genata.datatype.integer();        // 42
genata.datatype.float();          // 3.14159
genata.datatype.color();          // '#FF5733'
genata.datatype.hex();            // 'a3c2f1'

// Text
genata.text.sentence();           // 'The quick brown fox jumps over the lazy dog.'
genata.text.paragraph();          // 'Lorem ipsum dolor sit amet...'
genata.text.word();               // 'serendipity'
genata.text.slug();               // 'hello-world-example'
```

## Batch Generation

Generate multiple records at once:

```javascript
import genata from '@drichdev/genata';

// Simple batch
const users = genata.generateBatch([
  { name: 'id', type: 'uuid' },
  { name: 'email', type: 'email' },
  { name: 'firstName', type: 'first_name' },
  { name: 'lastName', type: 'last_name' },
  { name: 'phone', type: 'phone' },
  { name: 'isActive', type: 'boolean' }
], { count: 10 });

console.table(users);
```

### Available Field Types

**Person:**
- `first_name`, `last_name`, `full_name`, `email`, `password`, `phone`, `username`

**Location:**
- `address`, `city`, `country`, `zip`

**Internet:**
- `url`, `ipv4`, `ipv6`, `credit_card`

**Company:**
- `company`, `job_title`

**Date & Time:**
- `date`, `datetime`

**Data Types:**
- `uuid`, `boolean`, `int`, `float`, `number`, `zero_one`, `id_increment`

**Colors:**
- `color`, `hex`

**Text:**
- `sentence`, `paragraph`, `word`, `slug`

## Reproducible Data (Seeding)

Generate the same data multiple times using seeds:

```javascript
import genata from '@drichdev/genata';

// Set seed
genata.setSeed(42);
const data1 = genata.generateBatch([
  { name: 'email', type: 'email' },
  { name: 'name', type: 'full_name' }
], { count: 3 });

// Reset seed to same value
genata.setSeed(42);
const data2 = genata.generateBatch([
  { name: 'email', type: 'email' },
  { name: 'name', type: 'full_name' }
], { count: 3 });

// data1 and data2 are identical!
console.log(JSON.stringify(data1) === JSON.stringify(data2)); // true
```

## Localization

Generate data in different languages:

```javascript
import genata from '@drichdev/genata';

// Set locale
genata.setLocale('fr_FR');  // French
const frenchName = genata.firstName();

genata.setLocale('de_DE');  // German
const germanName = genata.firstName();
```

**Supported Locales:**
- `en_US`, `en_GB`, `fr_FR`, `de_DE`, `es_ES`, `it_IT`, `pt_BR`, `ja_JP`, `zh_CN`, and [many more](https://github.com/faker-js/faker)

## Progress Tracking

For large batch generations, track progress:

```javascript
import genata from '@drichdev/genata';

const data = genata.generateBatchWithProgress([
  { name: 'id', type: 'uuid' },
  { name: 'email', type: 'email' },
  { name: 'name', type: 'full_name' }
], { 
  count: 1000,
  onProgress: (progress) => {
    console.log(`Generated ${progress} records...`);
  }
});
```

## TypeScript Support

Full TypeScript support with types:

```typescript
import genata, {
  type FieldDefinition,
  type BatchGeneratorOptions,
  type FieldType
} from '@drichdev/genata';

// Type-safe batch generation
const fields: FieldDefinition[] = [
  { name: 'id', type: 'uuid' },
  { name: 'email', type: 'email' },
  { name: 'active', type: 'boolean' }
];

const options: BatchGeneratorOptions = {
  count: 50,
  seed: 123
};

const records = genata.generateBatch(fields, options);
```

## Common Patterns

### Generate User Data

```javascript
import genata from '@drichdev/genata';

const user = {
  id: genata.uuid(),
  email: genata.email(),
  firstName: genata.firstName(),
  lastName: genata.lastName(),
  phone: genata.phone(),
  createdAt: genata.date.dateTime()
};
```

### Generate E-commerce Products

```javascript
import genata from '@drichdev/genata';

const products = genata.generateBatch([
  { name: 'id', type: 'uuid' },
  { name: 'name', type: 'sentence' },
  { name: 'price', type: 'float' },
  { name: 'stock', type: 'int' },
  { name: 'inStock', type: 'boolean' },
  { name: 'color', type: 'color' }
], { count: 20 });
```

### Generate Mock API Data

```javascript
import genata from '@drichdev/genata';

const apiLogs = genata.generateBatch([
  { name: 'timestamp', type: 'datetime' },
  { name: 'method', type: 'word' },
  { name: 'endpoint', type: 'url' },
  { name: 'statusCode', type: 'int', options: { min: 200, max: 500 } },
  { name: 'responseTime', type: 'float' },
  { name: 'ipAddress', type: 'ipv4' }
], { count: 100 });
```

## Configuration

```javascript
import genata from '@drichdev/genata';

// Set seed for reproducible data
genata.setSeed(42);

// Set locale
genata.setLocale('en_US');

// Reset to random mode
genata.resetSeed();
```

## Error Handling

```javascript
import genata from '@drichdev/genata';

try {
  // Invalid field type will throw ValidationError
  genata.generateBatch([
    { name: 'test', type: 'invalid_type' }
  ]);
} catch (error) {
  console.error('Validation error:', error.message);
}
```

## Performance Tips

1. **Reuse instances**: Use the same genata instance for multiple calls
2. **Batch generation**: For large datasets, use `generateBatch()` instead of loops
3. **Seeding**: Set seed once, not before each call
4. **Localization**: Set locale once at startup, not per call

```javascript
import genata from '@drichdev/genata';

// ✅ Good
genata.setSeed(42);
const batch = genata.generateBatch([...], { count: 10000 });

// ❌ Avoid
for (let i = 0; i < 10000; i++) {
  genata.setSeed(42);  // Don't set seed in loop
  const record = { email: genata.email() };
}
```

## Troubleshooting

### Issue: "genata.email is not a function"

**Solution**: Make sure you're importing the default export:

```javascript
// ✅ Correct
import genata from '@drichdev/genata';

// ❌ Wrong
import * as genata from '@drichdev/genata';
import { email } from '@drichdev/genata';
```

### Issue: "Module type is not specified" warning in Node.js

**Solution**: Add to your `package.json`:

```json
{
  "type": "module"
}
```

Or use CommonJS syntax:

```javascript
const genata = require('@drichdev/genata');
```

### Issue: Data is not reproducible with seed

**Solution**: Set seed BEFORE generating data:

```javascript
// ✅ Correct
genata.setSeed(42);
const data1 = genata.generateBatch([...], { count: 10 });

// ❌ Wrong
const data1 = genata.generateBatch([...], { count: 10 });
genata.setSeed(42);  // Too late!
```

## License

MIT
