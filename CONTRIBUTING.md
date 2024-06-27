### Project Collaboration Guidelines

- [Project Collaboration Guidelines](#project-collaboration-guidelines)
  - [1. Code Style](#1-code-style)
  - [2. Commits](#2-commits)
  - [3. Pull Requests](#3-pull-requests)
  - [4. Documentation](#4-documentation)
  - [5. Tests](#5-tests)
  - [6. Project Structure](#6-project-structure)
  - [7. Dependencies](#7-dependencies)
  - [8. Security Guidelines](#8-security-guidelines)
  - [9. Code Reviews](#9-code-reviews)
  - [10. License](#10-license)

#### 1. Code Style
Much of the code style is defined in the `biome.json` file. Here is a summary of the key settings and naming conventions:

- **Imports**: Automatically organized.
- **Linter**: Enabled with recommended and additional rules:
  - Suspicious: `noEmptyBlockStatements`, `noConfusingVoidType`, `noGlobalIsFinite`, `noGlobalIsNan`, `noExplicitAny`, `noAssignInExpressions`.
  - Style: `noNonNullAssertion`, `noParameterAssign`, `noInferrableTypes`, `useNumberNamespace`, `noDefaultExport`, `useFilenamingConvention`, `noUselessElse`, `noNegationElse`, `noParameterProperties`, `noShoutyConstants`, `useAsConstAssertion`, `useCollapsedElseIf`, `useConst`, `useExportType`.
  - Complexity: `noForEach`.
- **Formatter**: Enabled with error formatting, indentation width of 2, tab indentation style, and line width of 100.

**Naming Conventions**:
- Functions: camelCase
- Variables: snake_case
- Enums, interfaces, types: PascalCase
- Classes: PascalCase
- Templates: Full names in PascalCase

For more details, refer to the `biome.json` file.

#### 2. Commits
Commit messages should follow this structure:
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

#### 3. Pull Requests
**Process for Pull Requests**:
- Fork the repository and create a new branch from `main`.
- Ensure that the changes follow the project's style and naming conventions.
- Perform exhaustive tests of the added or modified functionalities.
- Create the Pull Request (PR) with a clear and detailed description of the changes made.
- Ensure the PR has no conflicts with the `main` branch.
- Reviewers must approve the PR before it is merged.

**Criteria for Approving Pull Requests**:
- Clean and readable code.
- Appropriate comments and documentation.
- Tests pass correctly.
- Compliance with the project's style guidelines.

#### 4. Documentation
Documentation should be clear and specific. Code comments should follow the JSDoc format without types since TypeScript is used. Each function must have a corresponding JSDoc describing it:

```javascript
/**
 * Description of the function.
 *
 * @param paramName Description of the parameter
 * @returns Description of the return value
 */
```

#### 5. Tests
Tests are conducted using `bun:test`. You can test functionalities within the `test/` directory.

#### 6. Project Structure
The project should be organized by categories of files. If many files refer to the same context, it's recommended to create a large file. `index.ts` files should only contain exports. The file naming convention is:

- `file.ts`
- `type.file.ts`
- `subtype.type.file.ts`

Do not use `-` or `_`, always in lowercase.

#### 7. Dependencies
Avoid unnecessary dependencies. If a dependency is necessary, it must be stable and well-documented. Dependencies are managed using `pnpm` or `bun`.

#### 8. Security Guidelines
Used dependencies must be secure. Ensure to review the documentation and stability of dependencies before use.

#### 9. Code Reviews
Code reviews must be meticulous and include testing. Developers at Kodeko Studios are authorized to perform these reviews.

#### 10. License
The project uses a proprietary license (Kodeko Studios Proprietary License) which must not be modified.
