# Database Backup Scripts

This directory contains scripts to backup the PostgreSQL database for the Food Nutrition App.

## Scripts Overview

### 1. `backup_db.sh` - Simple Backup Script
- Basic backup functionality
- Uses hardcoded database configuration
- Accepts optional backup directory as parameter

### 2. `backup_db_env.sh` - Environment Variable Based Script
- Configurable via environment variables
- More flexible and follows best practices
- Better error handling and container detection

### 3. `backup_config.env` - Configuration File
- Environment variables configuration
- Can be sourced before running backup scripts

## Usage Examples

### Basic Usage (Default Backup Directory)
```bash
# Using simple script
./scripts/backup_db.sh

# Using environment-based script
./scripts/backup_db_env.sh
```

### Custom Backup Directory
```bash
# Backup to custom directory
./scripts/backup_db.sh /path/to/backup/directory

# Using environment variable
export BACKUP_DIR=/path/to/backup/directory
./scripts/backup_db_env.sh
```

### Using Configuration File
```bash
# Source the configuration file
source scripts/backup_config.env

# Run backup with loaded configuration
./scripts/backup_db_env.sh
```

### Environment Variables (for backup_db_env.sh)

You can set these environment variables to customize the backup:

```bash
export BACKUP_DIR="/custom/backup/path"
export DB_USER="custom_user"
export DB_PASSWORD="custom_password"
export DB_NAME="custom_db_name"
export DB_HOST="custom_host"
export DB_PORT="5432"
export DOCKER_COMPOSE_FILE="path/to/docker-compose.yml"
```

## Prerequisites

1. **Docker and Docker Compose** must be installed
2. **PostgreSQL container** must be running
3. **Scripts must be executable** (already done)

## Starting the Database Container

If the database container is not running:

```bash
# Start the database container
docker-compose -f docker/docker-compose-prod-deploy.yml up -d db

# Wait for container to be ready
docker-compose -f docker/docker-compose-prod-deploy.yml logs db
```

## Restoring from Backup

To restore a backup file:

```bash
# Find the container name
CONTAINER_NAME=$(docker ps --format "table {{.Names}}\t{{.Image}}" | grep "food-nutrition-postgres" | awk '{print $1}')

# Restore the backup
docker exec -i $CONTAINER_NAME psql -U food_nutrition_user -d food_nutrition_db < /path/to/backup/file.sql
```

## Backup File Naming

Backup files are automatically named with timestamps:
- Format: `food_nutrition_backup_YYYYMMDD_HHMMSS.sql`
- Example: `food_nutrition_backup_20250115_143022.sql`

## Troubleshooting

### Container Not Found
If you get "PostgreSQL container is not running":
1. Check if Docker is running: `docker ps`
2. Start the database: `docker-compose -f docker/docker-compose-prod-deploy.yml up -d db`
3. Wait for container to be healthy

### Permission Denied
If scripts are not executable:
```bash
chmod +x scripts/backup_db.sh scripts/backup_db_env.sh
```

### Backup Directory Issues
If backup directory doesn't exist, the script will create it automatically.

## Output Example

```
🔧 Configuration:
   Backup Directory: ./DB_BKP
   Database User: food_nutrition_user
   Database Name: food_nutrition_db
   Database Host: localhost
   Database Port: 5433
   Docker Compose File: docker/docker-compose-prod-deploy.yml

Starting database backup...
Backup location: ./DB_BKP/food_nutrition_backup_20250115_143022.sql
✅ Found PostgreSQL container: food_app_db_1
Creating backup...
✅ Backup completed successfully!
📁 Backup saved to: ./DB_BKP/food_nutrition_backup_20250115_143022.sql
📊 Backup size: 28K
📋 Recent backups in ./DB_BKP:
-rw-r--r-- 1 user user 28K Jan 15 14:30 food_nutrition_backup_20250115_143022.sql
-rw-r--r-- 1 user user 38K Jan 15 14:25 food_nutrition_backup_20250115_142500.sql
``` 