# Git Flow Documentation

## Introduction Git Flow is a branching methodology designed to maintain an organized structure for collaborative development.

## Main Branches Here are the main branches used in Git Flow:

- `main`: Always contains the production-ready code.
- `develop`: Contains the code under active development.
  This serves as the base for new features.

## Branch Types Each branch has a specific prefix:

* **Feature Branches**: `feature/` - For developing new features.
* **Bugfix Branches**: `bugfix/` - For fixing bugs discovered during development.
* **Release Branches**: `release/` - For preparing a production release.
* **Hotfix Branches**: `hotfix/` - For quickly fixing critical issues in production.

## Git Flow Process

1. Create a branch from `develop`:

```bash
git checkout develop git checkout -b feature/feature-name
```

2. Work on the branch and commit changes:

```bash
git add . git commit -m "feat: description of the feature" 
```

3. Merge the branch into `develop` after code review.
4. Create a `release/` branch to prepare a version.
5. After validation, merge the `release/` branch into `main` and `develop`.
6. Tag the production version:

```bash
 git tag -a vX.X.X -m "Version name"
```

## Contribution Rules

- Students **are not allowed to approve Pull Requests**.

They should only comment on them following best practices for code review.

- Comments must be constructive and explanatory.

## Workflow Diagram Here is a visual overview of Git Flow:

![Git Flow Diagram](https://nvie.com/img/git-model@2x.png)

## Best Practices

- Always update your branch before merging it.
- Follow the branch naming conventions.
- Test your code before creating a Pull Request.

**If you have any questions, feel free to ask during the course sessions.**
