import { prisma } from './prisma';

/**
 * Get a system configuration value by key
 * @param key The configuration key
 * @returns The configuration value or null if not found
 */
export async function getSystemConfig(key: string): Promise<string | null> {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { config_key: key },
      select: { config_value: true }
    });
    
    return config?.config_value || null;
  } catch (error) {
    console.error(`Error fetching system config for key '${key}':`, error);
    return null;
  }
}

/**
 * Set a system configuration value
 * @param key The configuration key
 * @param value The configuration value
 * @param description Optional description
 */
export async function setSystemConfig(key: string, value: string, description?: string): Promise<void> {
  try {
    await prisma.systemConfig.upsert({
      where: { config_key: key },
      update: { 
        config_value: value,
        description: description || undefined
      },
      create: {
        config_key: key,
        config_value: value,
        description: description || null
      }
    });
  } catch (error) {
    console.error(`Error setting system config for key '${key}':`, error);
    throw error;
  }
}

/**
 * Get multiple system configuration values
 * @param keys Array of configuration keys
 * @returns Object with key-value pairs
 */
export async function getMultipleSystemConfigs(keys: string[]): Promise<Record<string, string | null>> {
  try {
    const configs = await prisma.systemConfig.findMany({
      where: { config_key: { in: keys } },
      select: { config_key: true, config_value: true }
    });
    
    const result: Record<string, string | null> = {};
    keys.forEach(key => {
      const config = configs.find(c => c.config_key === key);
      result[key] = config?.config_value || null;
    });
    
    return result;
  } catch (error) {
    console.error('Error fetching multiple system configs:', error);
    return keys.reduce((acc, key) => ({ ...acc, [key]: null }), {});
  }
} 