# Contributing to Precision AI Open Source

We welcome contributions to the Precision AI Open Source platform! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/Precision-AI-Open-Source.git
   ```
3. **Set up the development environment** by following the installation instructions in the README
4. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Formatting**: The project uses consistent formatting - follow existing patterns
- **Components**: Use functional components with hooks
- **Naming**: Use descriptive names for variables, functions, and components

### Database Changes

- **Schema modifications**: Update `shared/schema.ts` for any database changes
- **Migrations**: Use `npm run db:push` to apply schema changes
- **Types**: Always update TypeScript types when modifying schemas

### API Development

- **Routes**: Add new API routes in `server/routes.ts`
- **Validation**: Use Zod schemas for request validation
- **Error handling**: Implement proper error responses
- **Authentication**: Protect sensitive endpoints with authentication

### Frontend Development

- **React Query**: Use TanStack Query for data fetching
- **Forms**: Use react-hook-form with Zod validation
- **Styling**: Use Tailwind CSS and Shadcn/ui components
- **Routing**: Use Wouter for client-side routing

## Contribution Types

### Bug Fixes
- Describe the bug and steps to reproduce
- Include relevant error messages or screenshots
- Write tests to prevent regression

### New Features
- Discuss the feature in an issue before implementation
- Follow the existing architecture patterns
- Include documentation and tests
- Update the README if needed

### Documentation
- Improve existing documentation
- Add missing documentation
- Fix typos and grammar issues

### AI/ML Improvements
- Enhance treatment recommendation algorithms
- Improve data analysis capabilities
- Add new AI-powered features
- Ensure responsible AI practices

## Pull Request Process

1. **Update documentation** if your changes affect the API or user interface
2. **Add tests** for new functionality
3. **Run the test suite** to ensure all tests pass
4. **Update the README** if you add new dependencies or change setup instructions
5. **Write clear commit messages** that describe what and why, not just what

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or marked as such)
```

## Reporting Issues

When reporting issues, please include:

1. **Clear description** of the problem
2. **Steps to reproduce** the issue
3. **Expected behavior** vs actual behavior
4. **Environment details** (OS, Node.js version, etc.)
5. **Screenshots or error messages** if applicable

## Feature Requests

For feature requests:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** and problem you're solving
3. **Propose a solution** if you have ideas
4. **Consider the scope** - is this aligned with project goals?

## Security Issues

If you discover a security vulnerability:

1. **Do not** open a public issue
2. **Email** the maintainers directly
3. **Include** details about the vulnerability
4. **Wait** for a response before disclosing publicly

## Questions and Support

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check the README and wiki first

## Recognition

Contributors will be recognized in:
- The project's contributors list
- Release notes for significant contributions
- Special recognition for major features or improvements

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL
- OpenAI API key

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
npm run db:push

# Start development server
npm run dev
```

### Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm run test:coverage
```

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Precision AI Open Source!