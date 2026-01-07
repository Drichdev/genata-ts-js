# Genata - Guide de Démarrage Rapide 🚀

## Installation

```bash
# Clone et naviguez dans le dossier
cd genata-core-react

# Installez les dépendances
npm install

# Compilez le package
npm run build

# Testez
npm test
```

## Utilisation Simple

### 1️⃣ Valeurs Uniques

```typescript
import genata from "genata";

// Email aléatoire
const email = genata.email();
// "alice.johnson@example.com"

// Prénom aléatoire
const firstName = genata.firstName();
// "Jean"

// Téléphone aléatoire
const phone = genata.phone();
// "+33 6 12 34 56 78"
```

### 2️⃣ Boucles pour Générer Plusieurs Valeurs

```typescript
// Générer 10 emails
const emails = Array.from({ length: 10 }, () => genata.email());
console.log(emails);
// ["alice@example.com", "bob@example.com", ...]

// Générer 5 noms complets
for (let i = 0; i < 5; i++) {
  console.log(genata.fullName());
}
// "Marie Dupont"
// "Pierre Martin"
// ...
```

### 3️⃣ Génération par Lot (Batch)

```typescript
// Définir les colonnes
const fields = [
  { name: "id", type: "id_increment" },
  { name: "email", type: "email" },
  { name: "firstName", type: "first_name" },
  { name: "lastName", type: "last_name" },
  { name: "phone", type: "phone" },
  { name: "createdAt", type: "datetime" },
];

// Générer 100 utilisateurs
const users = genata.generateBatch(fields);
console.table(users);

// Générer 1000 utilisateurs
const manyUsers = genata.generateBatch(fields, { count: 1000 });
```

### 4️⃣ Données Reproductibles pour les Tests

```typescript
// Définir une graine (seed)
genata.setSeed(42);

const email1 = genata.email();
// "example@test.com"

// Redéfinir la même graine
genata.setSeed(42);

const email2 = genata.email();
// "example@test.com" - EXACTEMENT LA MÊME!

// C'est parfait pour les tests unitaires
test("utilisateur", () => {
  genata.setSeed(12345);
  const user = { email: genata.email() };
  expect(user.email).toBe("predictable@test.com");
});
```

## 📋 Types Disponibles

### Personne
```typescript
genata.firstName()        // "Marie"
genata.lastName()         // "Dupont"
genata.fullName()         // "Marie Dupont"
genata.email()            // "marie.dupont@example.com"
genata.username()         // "mdupont42"
genata.password()         // "Hd9@kL2x9Qm1"
genata.phone()            // "+33 6 12 34 56 78"
```

### Localisation
```typescript
genata.location.address()  // "123 Rue de la Paix"
genata.location.city()     // "Paris"
genata.location.country()  // "France"
genata.location.zipCode()  // "75001"
```

### Internet
```typescript
genata.internet.url()      // "https://example.com"
genata.internet.ipv4()     // "192.168.1.1"
genata.internet.ipv6()     // "2001:0db8:85a3:0000"
genata.internet.creditCard() // "4532-1234-5678-9010"
```

### Entreprise
```typescript
genata.company.company()   // "Acme Corp"
genata.company.jobTitle()  // "Développeur Senior"
```

### Date/Heure
```typescript
genata.date.date()         // "2025-12-15"
genata.date.dateTime()     // "2025-12-15T14:30:00Z"
genata.date.futureDate()   // "2026-06-20"
```

### Types de Données
```typescript
genata.datatype.uuid()     // "550e8400-e29b-41d4-a716-446655440000"
genata.datatype.boolean()  // true
genata.datatype.integer({ min: 1, max: 100 }) // 42
genata.datatype.float({ min: 0, max: 100, decimals: 2 }) // 42.57
genata.datatype.color()    // "rgb(120, 200, 80)"
genata.datatype.hex({ length: 16 }) // "a1b2c3d4e5f6g7h8"
```

### Texte
```typescript
genata.text.sentence()     // "Lorem ipsum dolor sit amet."
genata.text.paragraph({ sentences: 3 }) // Paragraphe de 3 phrases
genata.text.word()         // "ejemplo"
genata.text.slug()         // "lorem-ipsum-dolor"
```

## 💡 Cas d'Usage Réels

### Générer des Utilisateurs pour une BD Test

```typescript
const testUsers = genata.generateBatch(
  [
    { name: "userId", type: "uuid" },
    { name: "email", type: "email" },
    { name: "firstName", type: "first_name" },
    { name: "lastName", type: "last_name" },
    { name: "phone", type: "phone" },
    { name: "company", type: "company" },
    { name: "jobTitle", type: "job_title" },
    { name: "isActive", type: "boolean" },
    { name: "createdAt", type: "datetime" },
  ],
  { count: 100 }
);

// Insérer dans la BD
await db.users.insertMany(testUsers);
```

### Générer des Produits E-commerce

```typescript
const products = genata.generateBatch(
  [
    { name: "id", type: "uuid" },
    { name: "name", type: "sentence" },
    { name: "description", type: "paragraph" },
    { name: "price", type: "float" },
    { name: "stock", type: "int" },
    { name: "category", type: "word" },
    { name: "inStock", type: "boolean" },
  ],
  { count: 50 }
);
```

### Générer des Logs API

```typescript
const logs = genata.generateBatch(
  [
    { name: "requestId", type: "uuid" },
    { name: "timestamp", type: "datetime" },
    { name: "ipAddress", type: "ipv4" },
    { name: "endpoint", type: "url" },
    { name: "statusCode", type: "int" },
    { name: "responseTime", type: "float" },
  ],
  { count: 1000 }
);
```

## 🎯 Suivi de Progression

Pour les gros lots, suivre la progression:

```typescript
const records = genata.generateBatchWithProgress(
  fields,
  {
    count: 100000,
    onProgress: (progress) => {
      console.log(`${progress}% complété`);
      // Mettre à jour une barre de progression UI
      updateProgressBar(progress);
    }
  }
);
```

## 🔒 Sécurité

### ❌ À NE PAS FAIRE

```typescript
// DANGER: Utiliser les données générées comme vraies données
const realEmail = genata.email();
sendEmailReallyTo(realEmail); // ❌ WRONG!

// DANGER: Utiliser les données générées en production
if (isProduction) {
  const fakeUsers = genata.generateBatch(fields);
  await productionDb.insertMany(fakeUsers); // ❌ WRONG!
}
```

### ✅ À FAIRE

```typescript
// SAFE: Utiliser pour les tests
if (isTestEnvironment) {
  const testUsers = genata.generateBatch(fields);
  await testDb.insertMany(testUsers); // ✓ OK
}

// SAFE: Utiliser pour les exemples
const exampleData = genata.generateBatch(fields);
showInDocumentation(exampleData); // ✓ OK

// SAFE: Utiliser pour les mocks
test("utilisateur création", () => {
  const mockUser = { email: genata.email() };
  expect(mockUser).toBeDefined(); // ✓ OK
});
```

## 🐛 Résolution de Problèmes

### Q: Les données ne sont pas reproductibles?
**R:** Appelez `genata.setSeed()` avant de générer:
```typescript
genata.setSeed(42);
const data = genata.email(); // Toujours la même
```

### Q: Type de champ invalide?
**R:** Vérifiez la liste des types valides. Exemple:
```typescript
// ✓ Valide
{ name: "email", type: "email" }

// ✗ Invalide
{ name: "email", type: "invalid" }
```

### Q: Génération lente?
**R:** Pour les gros lots, utilisez:
```typescript
// Avec suivi de progression
genata.generateBatchWithProgress(fields, {
  count: 100000,
  onProgress: (p) => console.log(`${p}%`)
});

// Ou en chunks
for (let i = 0; i < 10; i++) {
  const chunk = genata.generateBatch(fields, { count: 10000 });
  processChunk(chunk);
}
```

## 📚 Pour Plus d'Informations

- **README.md** - Documentaton complète
- **examples.ts** - 10+ exemples réels
- **ARCHITECTURE.md** - Comprendre la conception
- **SECURITY.md** - Directives de sécurité

## 🚀 Prochaines Étapes

1. **Publier sur npm** (quand prêt)
   ```bash
   npm publish
   ```

2. **Intégrer dans genata-site**
   ```bash
   npm install genata
   ```

3. **Créer une version Python**
   Utiliser le TypeScript comme référence

4. **Ajouter un CLI**
   ```bash
   genata generate --count 1000 --fields email,phone
   ```

---

**Vous avez maintenant un outil puissant pour générer des données de test réalistes! 🎉**

Des questions? Consultez les fichiers de documentation ou explorez le code source - il est bien commenté et facile à comprendre.

Bon développement! 💪
