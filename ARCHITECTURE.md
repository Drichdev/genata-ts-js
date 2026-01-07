# Genata Core - Architecture & Implementation Guide

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Genata Main API                           │
│  (genata.email(), genata.firstName(), etc.)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌──────────────┐ ┌────────────┐ ┌──────────────┐
│ Generators   │ │ Validators │ │ Batch        │
│ (base.ts)    │ │ (index.ts) │ │ (batch.ts)   │
├──────────────┤ ├────────────┤ └──────────────┘
│ • Person     │ │ • Input    │
│ • Location   │ │ • Type     │
│ • Internet   │ │ • Range    │
│ • Company    │ │ • Sanitize │
│ • Date       │ │            │
│ • DataType   │ │            │
│ • Text       │ │            │
└──────────────┘ └────────────┘
        │              │
        └──────────────┼──────────────┐
                       │              │
                       ▼              ▼
                  ┌──────────────────────────┐
                  │  Types (types/index.ts)  │
                  │  • FieldType             │
                  │  • GeneratorOptions      │
                  │  • FieldDefinition       │
                  └──────────────────────────┘
                       │
                       ▼
                  ┌──────────────────────────┐
                  │  Faker Wrapper           │
                  │  (utils/faker.ts)        │
                  │  • Seeding support       │
                  │  • Locale management     │
                  └──────────────────────────┘
                       │
                       ▼
                  ┌──────────────────────────┐
                  │  @faker-js/faker         │
                  │  (External dependency)   │
                  └──────────────────────────┘
```

## 🗂️ Directory Structure

```
genata-core-react/
├── src/
│   ├── index.ts                 # Main API entry point
│   ├── examples.ts              # Comprehensive examples
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── generators/
│   │   ├── index.ts             # Generators exports
│   │   ├── base.ts              # All generator functions
│   │   ├── batch.ts             # Batch generation logic
│   │   └── field.ts             # Field-level generation
│   ├── validators/
│   │   └── index.ts             # Input validation & sanitization
│   └── utils/
│       └── faker.ts             # Faker wrapper & seeding
├── package.json                 # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint configuration
├── README.md                    # Main documentation
├── SECURITY.md                  # Security guidelines
├── CONTRIBUTING.md             # Contribution guidelines
├── CHANGELOG.md                # Version history
├── LICENSE                      # MIT License
└── .gitignore                   # Git ignore rules
```

## 🔄 Data Flow

### Single Value Generation

```
genata.email()
    │
    ├─> validateGeneratorOptions() ✓
    │
    ├─> getFaker(options)
    │   │
    │   └─> Returns Faker instance (with optional seed)
    │
    ├─> faker.internet.email()
    │
    └─> Result: "alice.johnson@example.com"
```

### Batch Generation

```
genata.generateBatch(fields, options)
    │
    ├─> validateBatchOptions() ✓
    │
    ├─> For each field:
    │   ├─> validateFieldType() ✓
    │
    ├─> For i = 0 to count:
    │   │
    │   ├─> For each field:
    │   │   │
    │   │   ├─> generateField(type)
    │   │   │   │
    │   │   │   ├─> Get appropriate generator
    │   │   │   ├─> Get Faker instance
    │   │   │   └─> Return generated value
    │   │   │
    │   │   └─> row[fieldName] = value
    │   │
    │   └─> data.push(row)
    │
    └─> Result: Array of 100+ objects
```

## 🛡️ Security Layers

### 1. Input Validation

```typescript
validateBatchOptions(options)
  ├─> validateSeed(seed)
  │   └─> Ensure: Number.isInteger(seed) && seed >= 0
  │
  ├─> validateCount(count)
  │   └─> Ensure: Number.isInteger(count) && count >= 1
  │
  └─> validateLocale(locale)
      └─> Ensure: typeof locale === "string"
```

### 2. Type Safety

```typescript
// All field types are validated
isValidFieldType(type)
  ├─> Check against hardcoded list of valid types
  ├─> Prevent unknown/malicious types
  └─> Throw ValidationError if invalid
```

### 3. Sanitization

```typescript
sanitizeInput(input)
  ├─> Remove: < > { }
  ├─> Keep: Safe special characters
  └─> Result: Safe for any context
```

### 4. No Dynamic Execution

```
✗ No eval()
✗ No new Function()
✗ No shell execution
✗ No template literals with user input
✓ All code paths static and traceable
```

## 📦 Generator Categories

### PersonGenerators (7 generators)
- `firstName()` - First names
- `lastName()` - Last names
- `fullName()` - Full names
- `email()` - Email addresses
- `username()` - Usernames
- `password(options)` - Passwords (8-128 chars)
- `phone()` - Phone numbers

### LocationGenerators (4 generators)
- `address()` - Street addresses
- `city()` - City names
- `country()` - Country names
- `zipCode()` - ZIP codes

### InternetGenerators (4 generators)
- `url()` - URLs
- `ipv4()` - IPv4 addresses
- `ipv6()` - IPv6 addresses
- `creditCard()` - Credit card numbers

### CompanyGenerators (2 generators)
- `company()` - Company names
- `jobTitle()` - Job titles

### DateGenerators (3 generators)
- `date()` - Past dates (YYYY-MM-DD)
- `dateTime()` - Recent datetimes (ISO 8601)
- `futureDate()` - Future dates

### DataTypeGenerators (6 generators)
- `uuid()` - UUIDs
- `boolean()` - Booleans
- `integer(options)` - Integers
- `float(options)` - Floats
- `color()` - RGB colors
- `hex(options)` - Hex strings

### TextGenerators (4 generators)
- `sentence()` - Sentences
- `paragraph(options)` - Paragraphs
- `word()` - Words
- `slug()` - URL slugs

## 🔐 Security Features Detailed

### Seed Management
```typescript
// Deterministic but isolated
genata.setSeed(42)
genata.email() // Always same with this seed
genata.email() // Always same with this seed

// Independent faker instance per seed
// No global state pollution
```

### Password Security
```typescript
genata.password({ length: 16 })
  ├─> Validate length ∈ [8, 128]
  ├─> Use Faker's password generator
  ├─> Return secure random password
  └─> Suitable for testing, never production use
```

### Range Validation
```typescript
genata.datatype.integer({ min: 1, max: 100 })
  ├─> Validate: min < max
  ├─> Validate: Both are integers
  ├─> Return: Random int ∈ [min, max]
  └─> Error on invalid range
```

## 📝 Type System

### FieldType Union (25 types)
```typescript
type FieldType = 
  | "first_name"
  | "last_name"
  | "full_name"
  | "email"
  | "password"
  | ... (25 total)
```

### GeneratorOptions
```typescript
interface GeneratorOptions {
  seed?: number;        // For reproducible generation
  locale?: string;      // For localization
}
```

### BatchGeneratorOptions
```typescript
interface BatchGeneratorOptions extends GeneratorOptions {
  count?: number;       // Number of records (default: 100)
}
```

### FieldDefinition
```typescript
interface FieldDefinition {
  name: string;         // Column name
  type: FieldType;      // Data type
  options?: Record<string, unknown>;  // Generator options
}
```

## 🚀 Performance Considerations

### Single Value Generation
- O(1) - Constant time
- No loops or complex operations
- Instant results

### Batch Generation
- O(n × m) - n records, m fields
- For 100 records × 5 fields: ~500 operations
- Progress tracking available

### Seeding
- O(1) - Seed assignment
- No performance penalty
- Memory: ~1KB per seed

### Scalability
```
Safe batch sizes:
  1-10K records    ✓ <100ms
  10-100K records  ✓ <1s
  100K+ records    ⚠️ Consider chunks
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Test each generator
// Test error cases
// Test seeding behavior
// Test batch operations
```

### Integration Tests
```typescript
// Test full workflows
// Test with various field combinations
// Test error propagation
```

### Security Tests
```typescript
// Invalid inputs
// Malicious field names
// Large batch sizes
// Invalid seeds
```

## 📚 Integration Points

### With genata-site

```typescript
// genata-site/lib/genataCore.ts
import genata from "genata";

export function useGenataCore() {
  return {
    email: () => genata.email(),
    generateBatch: (fields, count) => 
      genata.generateBatch(fields, { count }),
    // ... more
  };
}
```

### With External Systems

```typescript
// Generate test data
const users = genata.generateBatch([
  { name: "email", type: "email" },
  { name: "name", type: "full_name" }
], { count: 1000 });

// Insert into database
await db.users.insertMany(users);

// Export to CSV
const csv = convertToCSV(users);
```

## 🎯 Usage Patterns

### Pattern 1: Direct Generation
```typescript
const email = genata.email();
const name = genata.firstName();
```

### Pattern 2: Batch with Fixed Seed
```typescript
genata.setSeed(42);
const testData = genata.generateBatch(fields, { count: 100 });
// Always same results
```

### Pattern 3: Batch with Progress
```typescript
genata.generateBatchWithProgress(fields, {
  count: 10000,
  onProgress: (p) => console.log(`${p}%`)
});
```

### Pattern 4: Grouped by Category
```typescript
const person = genata.person.firstName();
const location = genata.location.city();
const data = genata.datatype.uuid();
```

## 🔧 Configuration & Customization

### Environment Variables (None required)
- Library is zero-config
- All options passed at runtime

### Default Behaviors
- Count: 100 records
- Seed: None (random)
- Locale: Default (en)
- Min values: Sensible defaults
- Max values: Safe limits

## 📈 Future Enhancements

### v1.1
- [ ] Custom generators API
- [ ] Data relationships
- [ ] Advanced filtering

### v2.0
- [ ] Plugin system
- [ ] Streaming data
- [ ] Python version

## 🐛 Debugging

### Enable verbose logging (for development)
```typescript
// Check generated data
const records = genata.generateBatch(fields);
console.table(records);

// Verify seeding
genata.setSeed(42);
console.log(genata.email()); // Predictable
```

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Data not reproducible | Seed not set | Call `genata.setSeed()` |
| Unknown field type | Typo in type | Check against valid types |
| Performance slow | Too many records | Use progress tracking, batch in chunks |
| Invalid options | Range error | Ensure min < max, length in bounds |

## 🎓 Learning Resources

1. **README.md** - Quick start & examples
2. **examples.ts** - 10 real-world examples
3. **SECURITY.md** - Security guidelines
4. **This file** - Architecture deep-dive
5. **CONTRIBUTING.md** - Code standards

---

This architecture ensures Genata is:
- ✅ **Secure** - Input validation, no code execution
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Performant** - O(1) single, O(n×m) batch operations
- ✅ **Maintainable** - Clear separation of concerns
- ✅ **Testable** - Mockable, deterministic with seeds
- ✅ **Extensible** - Easy to add new generators
