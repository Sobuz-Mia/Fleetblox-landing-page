# Environment Configuration Guide

This document explains how to configure environment variables for different deployment environments in the FleetBlox application.

## Environment Files

The application uses multiple environment files for different contexts:

- `.env`: Base environment variables used in all environments
- `.env.development`: Development-specific variables
- `.env.production`: Production-specific variables
- `.env.local`: Local overrides (not committed to git)
- `.env.example`: Example template showing available variables

## Available Environment Variables

| Variable                       | Description                        | Default                                  |
| ------------------------------ | ---------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Main website URL                   | https://fleetblox.com                    |
| `NEXT_PUBLIC_API_URL`          | API server URL                     | Environment dependent                    |
| `NEXT_PUBLIC_ENV`              | Current environment name           | Based on NODE_ENV                        |
| `ANALYZE`                      | Enable bundle analyzer             | false                                    |
| `DEBUG`                        | Enable debug mode                  | false in production, true in development |
| `NEXT_PUBLIC_SECURITY_HEADERS` | Enable additional security headers | true in production                       |

## Environment Setup

### For Developers

1. Clone the repository
2. Run `./switch-env.sh` to select your environment
3. The script will create a `.env.local` file with the appropriate settings
4. Make any custom changes to `.env.local`
5. Restart your development server

### For Production Deployment

1. Set up environment variables in your deployment platform (Vercel, AWS, etc.)
2. Make sure to set `NODE_ENV=production`
3. Configure all required variables based on `.env.production`

## Usage in Code

Import the configuration from the utility file:

```typescript
import { config } from "../utils/config";

// Access configuration values
const apiUrl = config.api.baseUrl;
const isProduction = config.isProduction;
```

For API requests, use the API client:

```typescript
import api from "../utils/api";

// Make API requests
const data = await api.get("/endpoint");
await api.post("/endpoint", { someData: "value" });
```

## Adding New Environment Variables

1. Add the variable to the appropriate `.env.*` files
2. Add the variable to `.env.example` with documentation
3. If it needs to be accessed in client-side code, prefix with `NEXT_PUBLIC_`
4. Update the `config.ts` file to include the new variable
5. Update this documentation

## Environment Switching Script

The `switch-env.sh` script helps you quickly switch between environments:

```bash
./switch-env.sh
```

Follow the prompts to select your desired environment.

## Common Issues

### Environment variables not updating

- Make sure to restart your development server after changing environment variables
- Check that variables are properly exposed in next.config.ts
- For client-side variables, ensure they have the `NEXT_PUBLIC_` prefix

### API connection issues

- Check that `NEXT_PUBLIC_API_URL` is set correctly for your environment
- Verify API server is running and accessible
- Check network access rules and CORS configuration
