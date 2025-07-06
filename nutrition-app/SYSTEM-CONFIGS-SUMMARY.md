# System Configurations Summary

## 📋 **Available System Configurations**

Based on the code analysis, here are the system configurations that can be stored in the database:

### 1. **NUTRITION_API_URL**
- **Key**: `NUTRITION_API_URL`
- **Description**: Nutrition API Service URL
- **Default Value**: `http://localhost:8080/api/nutrition`
- **Used In**: 
  - `app/api/nutrition-proxy/route.ts` (line 8)
  - `scripts/seed-nutrition-api-config.js`
  - `prisma/seed.ts`

### 2. **OPENAI_API_KEY**
- **Key**: `OPENAI_API_KEY`
- **Description**: OpenAI API Key for GPT nutrition analysis
- **Default Value**: `YOUR_OPENAI_API_KEY_HERE` (placeholder)
- **Used In**:
  - `app/api/gpt-nutrition/route.ts` (line 9)
  - `prisma/seed.ts`

### 3. **EDAMAM_APP_ID**
- **Key**: `EDAMAM_APP_ID`
- **Description**: Edamam Nutrition API Application ID
- **Default Value**: `YOUR_EDAMAM_APP_ID` (placeholder)
- **Used In**:
  - `app/api/edamam-proxy/route.ts` (line 7)
  - `scripts/seed-edamam-config.js`

### 4. **EDAMAM_APP_KEY**
- **Key**: `EDAMAM_APP_KEY`
- **Description**: Edamam Nutrition API Application Key
- **Default Value**: `YOUR_EDAMAM_APP_KEY` (placeholder)
- **Used In**:
  - `app/api/edamam-proxy/route.ts` (line 7)
  - `scripts/seed-edamam-config.js`

## 🔧 **How to Check Current Configurations**

Run this command to see what's currently in your database:
```bash
node scripts/list-all-configs.js
```

## 📍 **Where Each Config is Used**

### **NUTRITION_API_URL**
```typescript
// In nutrition-proxy/route.ts
let nutritionApiUrl = await getSystemConfig('NUTRITION_API_URL');
if (!nutritionApiUrl) {
  nutritionApiUrl = process.env.NUTRITION_API_URL || 'http://localhost:8080/api/nutrition';
}
```

### **OPENAI_API_KEY**
```typescript
// In gpt-nutrition/route.ts
const config = await prisma.systemConfig.findUnique({
  where: { config_key: 'OPENAI_API_KEY' }
});
const openaiApiKey = config?.config_value;
```

### **EDAMAM_APP_ID & EDAMAM_APP_KEY**
```typescript
// In edamam-proxy/route.ts
const configs = await getMultipleSystemConfigs(['EDAMAM_APP_ID', 'EDAMAM_APP_KEY']);
const APP_ID = configs.EDAMAM_APP_ID;
const APP_KEY = configs.EDAMAM_APP_KEY;
```

## 🚀 **How to Seed Configurations**

### **Option 1: Main Seed Script**
```bash
npm run prisma:seed
```
This seeds: OPENAI_API_KEY, NUTRITION_API_URL

### **Option 2: Individual Scripts**
```bash
# Seed Nutrition API URL
npm run seed:nutrition-api

# Seed Edamam API credentials
npm run seed:edamam
```

## 🔄 **Fallback Mechanism**

Each configuration follows this priority:
1. **Database** (SystemConfig table)
2. **Environment Variable**
3. **Default Value**

## 📊 **Database Schema**

```sql
CREATE TABLE "SystemConfig" (
    "id" SERIAL NOT NULL,
    "config_key" TEXT NOT NULL,
    "config_value" TEXT NOT NULL,
    "description" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("id")
);
```

## 🛠️ **Utility Functions**

### **getSystemConfig(key)**
- Gets a single configuration value
- Returns `string | null`

### **getMultipleSystemConfigs(keys[])**
- Gets multiple configuration values
- Returns `Record<string, string | null>`

### **setSystemConfig(key, value, description)**
- Sets or updates a configuration value
- Creates if doesn't exist, updates if exists

## 🔍 **How to Query Configurations**

### **Via Code**
```typescript
import { getSystemConfig, getMultipleSystemConfigs } from '@/lib/system-config';

// Get single config
const apiUrl = await getSystemConfig('NUTRITION_API_URL');

// Get multiple configs
const configs = await getMultipleSystemConfigs(['EDAMAM_APP_ID', 'EDAMAM_APP_KEY']);
```

### **Via Database**
```sql
-- Get all configs
SELECT * FROM "SystemConfig" ORDER BY config_key;

-- Get specific config
SELECT config_value FROM "SystemConfig" WHERE config_key = 'NUTRITION_API_URL';

-- Update config
UPDATE "SystemConfig" 
SET config_value = 'new-value', updated_at = NOW() 
WHERE config_key = 'NUTRITION_API_URL';
``` 