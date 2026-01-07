# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-07

### Added

- **Core Generators**: 25+ data types for realistic fake data generation
  - Person generators (firstName, lastName, fullName, email, username, password, phone)
  - Location generators (address, city, country, zipCode)
  - Internet generators (url, ipv4, ipv6, creditCard)
  - Company generators (company, jobTitle)
  - Date generators (date, dateTime, futureDate)
  - Data type generators (uuid, boolean, integer, float, color, hex)
  - Text generators (sentence, paragraph, word, slug)

- **Batch Generation**: Generate multiple records at once
  - Basic batch generation with `generateBatch()`
  - Progress tracking with `generateBatchWithProgress()`
  - Customizable field definitions
  - Configurable count and seeding

- **Seeding Support**: Reproducible data generation
  - `setSeed()` for deterministic generation
  - `resetSeed()` to return to random generation
  - Useful for testing scenarios

- **Type Safety**: Full TypeScript support
  - Strict type checking
  - Comprehensive type definitions
  - JSDoc documentation

- **Validation**: Input validation and sanitization
  - Validates all options before processing
  - Sanitizes user inputs
  - Detailed error messages
  - Custom `ValidationError` class

- **Security**:
  - No dynamic code execution
  - No shell command execution
  - No global state exposure
  - Immutable configuration

- **Documentation**:
  - Comprehensive README with examples
  - Security guidelines (SECURITY.md)
  - Contributing guidelines (CONTRIBUTING.md)
  - 10+ usage examples
  - JSDoc comments for all public APIs

- **Configuration**:
  - TypeScript configuration (tsconfig.json)
  - ESLint configuration for code quality
  - .gitignore for project files

### Generators Added

#### Person
- firstName()
- lastName()
- fullName()
- email()
- username()
- password(options)
- phone()

#### Location
- address()
- city()
- country()
- zipCode()

#### Internet
- url()
- ipv4()
- ipv6()
- creditCard()

#### Company
- company()
- jobTitle()

#### Date/Time
- date()
- dateTime()
- futureDate()

#### Data Types
- uuid()
- boolean()
- integer(options)
- float(options)
- color()
- hex(options)

#### Text
- sentence()
- paragraph(options)
- word()
- slug()

### API

**Main Functions:**
- `genata.email()` - Generate random email
- `genata.firstName()` - Generate first name
- `genata.lastName()` - Generate last name
- `genata.fullName()` - Generate full name
- `genata.phone()` - Generate phone number
- `genata.password(options)` - Generate secure password
- `genata.generateBatch(fields, options)` - Generate multiple records
- `genata.generateBatchWithProgress(fields, options)` - Generate with progress
- `genata.setSeed(seed)` - Set reproducible seed
- `genata.resetSeed()` - Reset to random generation

**Grouped Generators:**
- `genata.person` - All person-related generators
- `genata.location` - All location generators
- `genata.internet` - All internet generators
- `genata.company` - All company generators
- `genata.date` - All date generators
- `genata.datatype` - All data type generators
- `genata.text` - All text generators

### Types Exported

- `FieldType` - Union of all field types
- `GeneratorOptions` - Options for single generators
- `BatchGeneratorOptions` - Options for batch generation
- `FieldDefinition` - Definition of a field for batch generation
- `GeneratorConfig` - Configuration for advanced generation

### Validators Exported

- `ValidationError` - Custom error class
- `validateSeed()` - Validate seed parameter
- `validateCount()` - Validate count parameter
- `validateLocale()` - Validate locale parameter
- `isValidFieldType()` - Check if field type is valid
- `sanitizeInput()` - Sanitize user input

---

## Future Roadmap

### v1.1.0 (Planned)
- [ ] Advanced generators for more complex data
- [ ] Custom generator registration
- [ ] Streaming/iterator support for large datasets
- [ ] Python version release
- [ ] Performance optimizations

### v2.0.0 (Planned)
- [ ] Plugin system
- [ ] Custom transformations
- [ ] Data relationships
- [ ] Cloud integration

---

## Security Updates

All versions will receive security updates for at least 24 months from release.

## Deprecation Policy

Features will be deprecated for at least 2 minor versions before removal.

---

[1.0.0]: https://github.com/genata/genata-core-react/releases/tag/v1.0.0
