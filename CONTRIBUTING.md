### Project Collaboration Guidelines

- [Project Collaboration Guidelines](#project-collaboration-guidelines)
  - [1. Code Style](#1-code-style)
    - [**Imports**](#imports)
    - [**Linter**](#linter)
    - [**Formatter**](#formatter)
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
The code style is largely defined in the `biome.json` file. Below is a point-by-point explanation of the key settings and why they are preferred:  

##### **Imports**  
- **`organizeImports: enabled`**  
  **Automatically** organizes imports to keep the code clean and consistent, reducing manual effort.  

##### **Linter**  
The linter enforces rules to maintain code correctness, readability, and performance:  

1. **Complexity Rules**  
   - **`noMultipleSpacesInRegularExpressionLiterals`**: Avoids excessive spaces in regex, improving readability.  
   - **`useSimplifiedLogicExpression`**: Promotes simpler expressions for clarity.  
   - **`noUselessLoneBlockStatements`**: Prevents redundant code blocks, reducing noise.  
   - **`noExcessiveNestedTestSuites`**: Limits deeply nested tests, improving maintainability.  
   - **`noEmptyTypeParameters`**: Ensures type definitions are meaningful.  
   - **`noUselessTernary`**: Encourages readable conditional expressions.  
   - **`useDateNow`**: Prefers `Date.now()` for consistency and performance.  
   - **`noForEach`**: Avoids `forEach` to favor faster and more flexible iteration patterns.  

2. **Correctness Rules**  
   - **`noUndeclaredDependencies`**: Prevents missing dependency declarations.  
   - **`noUnusedVariables`**: Eliminates unused variables for cleaner code.  
   - **`noConstructorReturn`**: Prevents unintended behavior by disallowing return statements in constructors.  

3. **Nursery Rules**  
   - **`useConsistentMemberAccessibility`**: Enforces explicit member visibility, improving clarity.  
   - **`useExplicitType`**: Encourages specifying types for better type safety.  
   - **`noDuplicateElseIf`**: Reduces redundancy and logical errors.  

4. **Performance Rules**  
   - **`noAccumulatingSpread`**: Avoids inefficient patterns when handling arrays.  

5. **Security Rules**  
   - **`noGlobalEval`**: Prevents potential security vulnerabilities.  

6. **Style Rules**  
   - **`useConsistentArrayType`**: Ensures a consistent syntax for array types.  
   - **`useNamingConvention`**: Enforces conventions like `PascalCase` for types, `CONSTANT_CASE` for constants, etc., to improve readability.  
   - **`noDefaultExport`**: Promotes named exports for clearer API structures.  
   - **`useForOf`**: Prefers `for...of` loops for better readability and maintainability.  

##### **Formatter**  
- **`formatWithErrors: true`**  
  Ensures formatting issues are treated as errors to maintain high standards.  
- **`indentWidth: 2`**  
  A smaller indentation width improves readability, especially for deeply nested code.  
- **`indentStyle: tab`**  
  Tabs provide flexibility for developers to adjust their view preferences.  
- **`lineWidth: 100`**  
  Limits line length to improve readability on various devices and screen sizes.  

These settings together enforce a consistent and high-quality codebase, reducing the likelihood of bugs and making collaboration easier.

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
