# NeuroForge Backend

## OpenAPI Documentation

The backend API is documented using OpenAPI 3.1.0 specification. The specification file is located at `src/openapi/openapi.yaml`.

### Generated Types

TypeScript types are automatically generated from the OpenAPI specification using `swagger-typescript-api`. The generated types are located in `src/generated/api.ts`.

To regenerate the types after modifying the OpenAPI specification, run:

```bash
npm run generate:api
```

### API Documentation

The OpenAPI specification includes detailed documentation for all API endpoints:

- Projects
  - Create new project
  - Get project details
  - Reset/delete project
  - Update project description

- Chat
  - Send messages to AI assistant

- Project State
  - List project saves
  - Save project state
  - Load project state

### Adding New Endpoints

1. Add the endpoint definition to `src/openapi/openapi.yaml`
2. Run `npm run generate:api` to update TypeScript types
3. Implement the endpoint in the appropriate route file under `src/routes/`
4. Use the generated types for request/response handling

### Best Practices

- Keep the OpenAPI specification up to date with any API changes
- Use the generated types in your code to ensure type safety
- Document all endpoints with clear descriptions and examples
- Follow REST principles when designing new endpoints
