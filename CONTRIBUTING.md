# Contributing to Genata

Thank you for your interest in contributing to Genata! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Report security issues privately
- No harassment or discrimination

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`
5. Make your changes
6. Run tests: `npm test`
7. Push to your fork and create a PR

## Development Setup

```bash
# Install dependencies
npm install

# Watch for changes
npm run dev

# Build
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Code Standards

### TypeScript

- Use strict mode
- Provide explicit return types
- Avoid `any` type
- Document complex logic with comments

### Security

- Validate all inputs
- Sanitize user data
- No dynamic code execution
- No shell command execution

### Testing

- Write tests for all generators
- Test error cases
- Test with various options
- Include integration tests

### Documentation

- Add JSDoc comments to public APIs
- Update README for new features
- Include usage examples
- Document breaking changes

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add credit card generator
fix: Improve email validation
docs: Update security guidelines
test: Add batch generation tests
refactor: Simplify type definitions
```

## Pull Request Process

1. **Title**: Clear description of changes
2. **Description**: 
   - What changed and why
   - Related issues
   - Screenshots if applicable
3. **Testing**: Describe tests added/updated
4. **Documentation**: Update docs if needed
5. **No conflicts**: Rebase if needed

## Adding a New Generator

1. Add type to `src/types/index.ts`
2. Implement in appropriate file in `src/generators/`
3. Add validation if needed
4. Update `src/generators/field.ts` switch statement
5. Write tests
6. Update README with examples
7. Add to CHANGELOG

Example:

```typescript
// In src/generators/base.ts
export const CustomGenerators = {
  myNewType: (options?: GeneratorOptions): string => {
    validateGeneratorOptions(options || {});
    const faker = getFaker(options);
    return faker.custom.method(); // Your implementation
  },
};

// In src/generators/field.ts
case "my_new_type":
  return CustomGenerators.myNewType(options);
```

## Performance Considerations

- Avoid nested loops in generators
- Consider memory usage for large batches
- Use iterators for streaming data
- Profile before optimization

## Error Handling

- Use descriptive error messages
- Create custom error classes when appropriate
- Validate inputs early
- Provide recovery suggestions

## Security Considerations

When adding new features:

1. **Input Validation**: Always validate user inputs
2. **Sanitization**: Sanitize any string inputs
3. **Dependencies**: Check security of new dependencies
4. **Documentation**: Document security implications
5. **Testing**: Test with malicious inputs

## Testing Guidelines

```typescript
describe("PersonGenerators", () => {
  describe("email", () => {
    it("should generate valid email format", () => {
      const email = PersonGenerators.email();
      expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it("should support seed option", () => {
      genata.setSeed(42);
      const email1 = PersonGenerators.email({ seed: 42 });
      
      genata.setSeed(42);
      const email2 = PersonGenerators.email({ seed: 42 });
      
      expect(email1).toBe(email2);
    });

    it("should handle invalid options", () => {
      expect(() => {
        PersonGenerators.email({ seed: -1 });
      }).toThrow();
    });
  });
});
```

## Documentation Standards

```typescript
/**
 * Generate a random email address
 * 
 * @param options - Generation options (optional seed)
 * @returns A randomly generated email address
 * @example
 * const email = genata.email();
 * // "alice@example.com"
 * 
 * @security Email is fake and for testing only
 */
export function email(options?: GeneratorOptions): string {
  // Implementation
}
```

## Reporting Bugs

Include:
- Detailed description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Environment (Node version, OS, etc.)
- Code example

## Suggesting Enhancements

Include:
- Clear use case
- Proposed API/implementation
- Benefits
- Alternative solutions considered

## Release Process

1. Update version in package.json
2. Update CHANGELOG
3. Create git tag
4. Push to main
5. Build and verify
6. Publish to npm

## Questions?

- Create a discussion for questions
- Check existing issues first
- Review documentation thoroughly

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Genata! 🚀
