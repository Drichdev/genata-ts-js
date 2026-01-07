# Genata Security Guidelines

## Overview

Genata is designed with security as a first-class concern. This document outlines the security features and best practices.

## Security Features

### 1. Input Validation

All user inputs are validated before processing:

```typescript
// Example: Validation of count parameter
validateCount(count: number): void
  - Ensures count is a positive integer
  - Rejects negative or floating-point values
  - Throws ValidationError on invalid input
```

### 2. Type Safety

The library uses TypeScript's strict mode:

```typescript
// Strict type checking prevents many security issues
interface FieldDefinition {
  name: string;
  type: FieldType;  // Only specific types allowed
  options?: Record<string, unknown>;
}
```

### 3. Sanitization

User inputs are sanitized to prevent injection attacks:

```typescript
sanitizeInput(input: string): string
  - Removes potentially dangerous characters like < > { }
  - Preserves valid special characters
  - Safe for use in any context
```

### 4. No Dynamic Code Execution

- No `eval()` or `new Function()` anywhere
- No shell command execution
- No template string evaluation
- All code paths are static and traceable

### 5. Immutable Configuration

- Defaults cannot be modified
- Configuration is validated at entry
- No globals are exposed for modification

## Best Practices

### ✅ DO

```typescript
// Good: Use validated options
genata.datatype.integer({ min: 1, max: 100 });

// Good: Use seeding for tests
genata.setSeed(42);
const data = genata.generateBatch(fields);

// Good: Handle errors
try {
  genata.generateBatch(fields);
} catch (error) {
  console.error("Generation failed:", error);
}

// Good: Validate field definitions
const fields: FieldDefinition[] = [
  { name: "email", type: "email" }
];
```

### ❌ DON'T

```typescript
// Bad: Don't modify generator directly
genata.person.firstName = maliciousFunction;

// Bad: Don't trust user-provided field types without validation
const userInput = getUserInput();
genata.generateBatch([{ name: "test", type: userInput }]);

// Bad: Don't ignore validation errors
try {
  genata.generateBatch(fields);
} catch (error) {
  // Silent fail is dangerous
}
```

## Data Safety

### Generated Data is Fake

- All generated data is fake and for testing purposes only
- **Never use generated credit cards or sensitive data in production**
- Generated emails don't correspond to real accounts
- Generated personal info is random and non-identifier

### In Production

```typescript
// Safe: Use for testing
const testData = genata.generateBatch(fields, { count: 1000 });
await db.insert(testData);

// Unsafe: Never use in production systems
const realData = genata.email();
sendEmailToUser(realData); // ❌ WRONG

// Safe: Use seeded data for reproducible tests
genata.setSeed(42);
const testUser = { email: genata.email() };
```

## Dependency Security

### Dependencies

- **@faker-js/faker**: Widely used, well-maintained faker library
  - Regularly updated for security
  - Large community for vulnerability discovery
  - No security vulnerabilities in recent versions

### Keeping Secure

```bash
# Always check for vulnerabilities
npm audit

# Update dependencies regularly
npm update

# Check specific package
npm audit @faker-js/faker
```

## API Security

### Validate Field Types

```typescript
import { isValidFieldType } from "genata";

const fieldType = getUserInput();
if (isValidFieldType(fieldType)) {
  // Safe to use
  genata.generateBatch([{ name: "test", type: fieldType }]);
}
```

### Limit Batch Size

```typescript
// For performance and memory safety, limit batch sizes
const MAX_BATCH_SIZE = 100000;

const batchSize = Math.min(userRequestedSize, MAX_BATCH_SIZE);
genata.generateBatch(fields, { count: batchSize });
```

### Seed Management

```typescript
// Seeds are deterministic
genata.setSeed(knownSeed);
const data1 = genata.email();

genata.setSeed(knownSeed);
const data2 = genata.email();

// data1 === data2 - safe for testing
```

## Database Usage

### Safe Insertion

```typescript
// Generate test data
const testUsers = genata.generateBatch(fields, { count: 100 });

// Insert into test database
await testDb.users.insertMany(testUsers);

// Never insert into production
// if (isProduction) {
//   throw new Error("Cannot use fake data in production");
// }
```

## Error Handling

### Proper Error Handling

```typescript
import { ValidationError } from "genata";

try {
  genata.generateBatch(fields, { count: -1 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Validation failed:", error.message);
    // Handle validation error
  } else {
    console.error("Unexpected error:", error);
  }
}
```

## Common Security Patterns

### Controlled Environment

```typescript
// In test environment only
if (process.env.NODE_ENV === "test") {
  const testData = genata.generateBatch(fields);
  useTestData(testData);
}
```

### Feature Flags

```typescript
// Use feature flags to control fake data
const useFakeData = await featureFlags.isEnabled("USE_FAKE_DATA");

if (useFakeData && isTestEnvironment()) {
  const data = genata.generateBatch(fields);
  // ...
}
```

### Rate Limiting

```typescript
// Limit generation frequency
const generateWithRateLimit = (() => {
  let lastCall = 0;
  const MIN_INTERVAL = 100; // ms

  return () => {
    const now = Date.now();
    if (now - lastCall < MIN_INTERVAL) {
      throw new Error("Rate limit exceeded");
    }
    lastCall = now;
    return genata.email();
  };
})();
```

## Reporting Security Issues

If you discover a security vulnerability, please:

1. **Don't** create a public GitHub issue
2. **Do** email security@genata.dev with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Updates

- Monitor GitHub releases for security updates
- Subscribe to npm security advisories
- Keep @faker-js/faker updated
- Review CHANGELOG for security fixes

## Conclusion

Genata is designed to be safe for:
- ✅ Development environments
- ✅ Testing scenarios
- ✅ Documentation and examples
- ✅ Learning and tutorials

But should NOT be used for:
- ❌ Production data
- ❌ Real user impersonation
- ❌ Actual email/phone generation
- ❌ Real financial data

Stay secure! 🔒
