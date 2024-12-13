# Staff System API

## **Prerequisites**

Make sure you have the following tools installed on your machine:

- **Node.js**: version >= 16.x
- **npm**: version >= 7.x
- **Git**

## **Installation**

1. Clone the project:

   ```bash
   git clone git@github.com:SPC-development/staff-system-api.git
   cd staff-system-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Git hooks via Husky will be automatically configured after installation. If not, run:

   ```bash
   npx husky install
   ```

## **Available Scripts**

- **Build the project**:

  ```bash
  npm run build
  ```

  This script checks types using TypeScript and bundles the project with `esbuild`.

- **Run Jest tests**:

  ```bash
  npm test
  ```

- **Lint the project**:

  ```bash
  npm run lint
  ```

## **Code Quality**

The project uses **ESLint** to ensure clean and consistent code. These tools are integrated with Husky and lint-staged to run automatically before each commit.

### **Linting with ESLint**

ESLint is configured to analyze TypeScript files and report errors. To manually run ESLint:

```bash
npm run lint
```

## **Tests**

Tests are written using **Jest** and can be run with:

```bash
npm test
```

### **Jest Configuration**

The `jest.config.js` file is included in the project. Tests should be placed in files with the `.spec.ts` or `.test.ts` extensions.

## **Branch Conventions**

Commits and pushes are only allowed on the following branches:

- `feature/`: for new features.
- `bugfix/`: for bug fixes.
- `hotfix/`: for urgent fixes.

### **Git Hooks with Husky**

Husky is configured for:

1. **Pre-commit**:
   - Ensures the branch name follows conventions.
   - Runs ESLint on modified files via lint-staged.
   - Runs Jest tests.

2. **Pre-push**:
   - Ensures the branch name follows conventions before pushing.

### **Example Error Message**

If you try to commit or push on an unauthorized branch like `main`, the following message will appear:

```bash
❌ Commits are only allowed on feature/, bugfix/, or hotfix/ branches.
Your current branch is 'main'.
Please create a branch with a valid name before committing.
```

### **Temporarily Disable Hooks**

To temporarily disable Husky hooks (e.g., for an emergency operation):

```bash
HUSKY=0 git commit -m "Bypass hooks"
HUSKY=0 git push
```

## **Contribution**

To contribute to the project:

1. Create a branch based on `feature/`, `bugfix/`, or `hotfix/`:

   ```bash
   git checkout -b feature/my-feature
   ```

2. Make your changes.
3. Commit and push your changes.
4. Open a Pull Request (PR) to merge your changes into the appropriate branch.

---

### **Happy coding!**

