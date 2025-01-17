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