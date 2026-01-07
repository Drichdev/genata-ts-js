# 📋 Genata Deployment Checklist

## ✅ Pre-Build Checks

- [ ] All TypeScript files have `.ts` extension
- [ ] No `any` types without justification
- [ ] All public functions have JSDoc comments
- [ ] Error messages are descriptive
- [ ] All inputs are validated

## ✅ Build Process

- [ ] Run `npm run build`
- [ ] Check for TypeScript compilation errors
- [ ] Verify `dist/` folder is created
- [ ] Check `dist/index.js` exists
- [ ] Check `dist/index.d.ts` exists
- [ ] Run `npm run lint`
- [ ] Fix any linting issues

## ✅ Testing

- [ ] Test single value generators
  ```bash
  npm test
  ```

- [ ] Verify seeding works
  ```typescript
  genata.setSeed(42);
  const v1 = genata.email();
  genata.setSeed(42);
  const v2 = genata.email();
  console.assert(v1 === v2);
  ```

- [ ] Test batch generation
  ```typescript
  const data = genata.generateBatch([...], { count: 100 });
  console.assert(data.length === 100);
  ```

- [ ] Test error handling
  ```typescript
  try { genata.setSeed(-1); }
  catch(e) { console.assert(e instanceof ValidationError); }
  ```

## ✅ Documentation Review

- [ ] README.md is complete
- [ ] QUICKSTART_FR.md is helpful
- [ ] ARCHITECTURE.md explains the design
- [ ] SECURITY.md covers security
- [ ] CONTRIBUTING.md explains development
- [ ] examples.ts has working code
- [ ] All code examples run without errors

## ✅ NPM Package Configuration

- [ ] `package.json` has correct fields:
  - [ ] `name`: "genata"
  - [ ] `version`: "1.0.0"
  - [ ] `main`: "dist/index.js"
  - [ ] `types`: "dist/index.d.ts"
  - [ ] `files`: includes dist and README
  - [ ] `dependencies`: only @faker-js/faker
  - [ ] `license`: "MIT"

- [ ] `tsconfig.json` has proper settings
  - [ ] `strict: true`
  - [ ] `declaration: true`
  - [ ] `outDir: "dist"`

- [ ] `.gitignore` includes:
  - [ ] node_modules/
  - [ ] dist/
  - [ ] .env files

## ✅ Code Quality

- [ ] No `console.log` in production code
- [ ] No commented-out code
- [ ] No TODOs without context
- [ ] Consistent code style
- [ ] No unused variables
- [ ] No unused imports
- [ ] All functions have return types

## ✅ Security Check

- [ ] No `eval()` or `new Function()`
- [ ] No shell execution
- [ ] No hardcoded secrets
- [ ] All user inputs validated
- [ ] Proper error messages (no info leakage)
- [ ] No dependency vulnerabilities
  ```bash
  npm audit
  ```

## ✅ Integration Test (with genata-site)

- [ ] Copy package to genata-site
  ```bash
  cd genata-core-react
  npm run build
  npm pack
  cd ../genata-site
  npm install ../genata-core-react/genata-1.0.0.tgz
  ```

- [ ] Test import in genata-site
  ```typescript
  import genata from "genata";
  const email = genata.email(); // Should work
  ```

- [ ] Test in React component
  ```typescript
  import { useGenataCore } from "@/lib/genataCore";
  const { email } = useGenataCore();
  ```

## ✅ NPM Publishing (Optional - when ready)

### Configure npm credentials
```bash
npm login
```

### Update version if needed
```bash
npm version patch  # For bug fixes
npm version minor  # For new features
npm version major  # For breaking changes
```

### Publish
```bash
npm publish
```

### Verify on npm
- [ ] Check package on [npmjs.com/package/genata](https://www.npmjs.com/package/genata)
- [ ] Verify README displays correctly
- [ ] Check available versions

## ✅ Post-Publish

- [ ] Add npm badge to README
  ```markdown
  [![npm version](https://img.shields.io/npm/v/genata.svg)](https://www.npmjs.com/package/genata)
  ```

- [ ] Update installation instructions in docs

- [ ] Create GitHub release (if applicable)

- [ ] Announce in documentation

- [ ] Update genata-site to use published version
  ```bash
  npm install genata
  ```

## ✅ Monitoring

- [ ] Monitor npm download stats
- [ ] Check for GitHub issues
- [ ] Monitor security advisories
  ```bash
  npm audit
  ```
- [ ] Keep dependencies updated

## ✅ Future Enhancements

- [ ] Plan v1.1.0 features
- [ ] Prepare Python version
- [ ] Consider CLI tool
- [ ] Plan plugin system

---

## 🚀 Quick Start Commands

### Development
```bash
npm install
npm run dev        # Watch for changes
npm run build      # Build once
npm test           # Run tests
npm run lint       # Check code
```

### Publishing
```bash
npm run build
npm publish
```

### Local Testing
```bash
npm pack
npm install genata-1.0.0.tgz
```

---

## 📊 Pre-Publish Checklist Summary

| Item | Status |
|------|--------|
| TypeScript compiles | ⬜ |
| Tests pass | ⬜ |
| Linting passes | ⬜ |
| Documentation complete | ⬜ |
| Security audit passes | ⬜ |
| package.json correct | ⬜ |
| Examples work | ⬜ |
| Integration test works | ⬜ |

**Once all items are ✅, package is ready to publish!**

---

## 🎯 Success Criteria

Your Genata package is ready when:

1. ✅ All TypeScript files compile without errors
2. ✅ All tests pass (when configured)
3. ✅ All code passes linting
4. ✅ Documentation is clear and complete
5. ✅ Examples run without errors
6. ✅ Security audit passes
7. ✅ npm package.json is correctly configured
8. ✅ Integration with genata-site works
9. ✅ No hardcoded secrets or credentials
10. ✅ Code follows TypeScript best practices

---

## 📞 Troubleshooting

### Build fails
```bash
# Clean and rebuild
rm -rf dist node_modules package-lock.json
npm install
npm run build
```

### Tests fail
```bash
# Check Jest installation and configuration
npm test -- --no-coverage
```

### Linting errors
```bash
# Show all linting issues
npm run lint
```

### npm publish fails
```bash
# Check authentication
npm whoami

# Login if needed
npm login

# Check package.json version is unique
npm view genata versions
```

---

**Good luck with your deployment! 🚀**

For questions, refer to:
- **README.md** - General documentation
- **ARCHITECTURE.md** - Technical details
- **SECURITY.md** - Security guidelines
