# System Configuration Management

This document explains how to manage system configurations in the nutrition app, including the newly added Nutrition API URL configuration.

## Overview

System configurations are stored in the database and can be managed through the `SystemConfig` table. This allows for dynamic configuration without code changes.

## Available Configurations

### 1. Nutrition API URL
- **Key**: `NUTRITION_API_URL`
- **Description**: Nutrition API Service URL
- **Default Value**: `http://localhost:8080/api/nutrition`
- **Usage**: Used by the nutrition-proxy API route to forward requests to the external nutrition service

### 2. OpenAI API Key
- **Key**: `OPENAI_API_KEY`
- **Description**: OpenAI API Key for GPT nutrition analysis
- **Usage**: Used by the gpt-nutrition API route

### 3. Edamam API Credentials
- **Key**: `EDAMAM_APP_ID`
- **Description**: Edamam Nutrition API Application ID
- **Usage**: Used by the edamam-proxy API route

- **Key**: `EDAMAM_APP_KEY`
- **Description**: Edamam Nutrition API Application Key
- **Usage**: Used by the edamam-proxy API route

## How to Seed Configurations

### Option 1: Use the main seed script
```bash
npm run prisma:seed
```
This will seed all configurations including the Nutrition API URL.

### Option 2: Use individual seed scripts
```bash
# Seed Nutrition API URL
npm run seed:nutrition-api

# Seed Edamam API credentials
npm run seed:edamam
```

### Option 3: Manual seeding
You can also manually insert configurations into the database using the Prisma client or directly in the database.

## How It Works

### In the Code
The nutrition-proxy route now retrieves the API URL from system config:

```typescript
// Get Nutrition API URL from system config, fallback to environment variable
let nutritionApiUrl = await getSystemConfig('NUTRITION_API_URL');

if (!nutritionApiUrl) {
  // Fallback to environment variable
  nutritionApiUrl = process.env.NUTRITION_API_URL || 'http://localhost:8080/api/nutrition';
  console.warn('NUTRITION_API_URL not found in system config, using fallback:', nutritionApiUrl);
}
```

### Fallback Mechanism
1. First tries to get the URL from system config
2. If not found, falls back to environment variable `NUTRITION_API_URL`
3. If environment variable is not set, uses the default `http://localhost:8080/api/nutrition`

## Environment Variables

You can also set the Nutrition API URL using environment variables:

```env
NUTRITION_API_URL=http://your-nutrition-api-url.com/api/nutrition
```

## Updating Configurations

### Via Code
Use the `setSystemConfig` function:

```typescript
import { setSystemConfig } from '@/lib/system-config';

await setSystemConfig('NUTRITION_API_URL', 'http://new-url.com/api/nutrition', 'Updated Nutrition API URL');
```

### Via Database
Update the `SystemConfig` table directly:

```sql
UPDATE "SystemConfig" 
SET config_value = 'http://new-url.com/api/nutrition', 
    updated_at = NOW() 
WHERE config_key = 'NUTRITION_API_URL';
```

## Benefits

1. **Dynamic Configuration**: Change API URLs without code deployment
2. **Environment Flexibility**: Different URLs for different environments
3. **Centralized Management**: All configurations in one place
4. **Fallback Support**: Graceful degradation if config is missing
5. **Audit Trail**: Track configuration changes with timestamps

## Security Considerations

- API keys and sensitive data should be stored securely
- Consider encrypting sensitive configuration values
- Use environment variables for local development
- Implement proper access controls for configuration management 