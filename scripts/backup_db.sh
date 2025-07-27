#!/bin/bash

# Database Backup Script for Food Nutrition App
# Usage: ./backup_db.sh [backup_directory]

set -e

# Default backup directory
DEFAULT_BACKUP_DIR="./DB_BKP"
BACKUP_DIR="${1:-$DEFAULT_BACKUP_DIR}"

# Database configuration from docker-compose
DB_USER="food_nutrition_user"
DB_PASSWORD="food_nutrition_pass"
DB_NAME="food_nutrition_db"
DB_HOST="localhost"
DB_PORT="5433"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Generate timestamp for unique backup filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILENAME="food_nutrition_backup_${TIMESTAMP}.sql"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_FILENAME"

echo "Starting database backup..."
echo "Backup location: $BACKUP_PATH"

# Check if PostgreSQL container is running
CONTAINER_NAME=$(docker ps --format "table {{.Names}}\t{{.Image}}" | grep "postgres" | awk '{print $1}')

if [ -z "$CONTAINER_NAME" ]; then
    echo "Error: PostgreSQL container is not running!"
    echo "Please start the database container first:"
    echo "docker-compose -f docker/docker-compose-prod-deploy.yml up -d db"
    exit 1
fi

echo "✅ Found PostgreSQL container: $CONTAINER_NAME"

# Perform the backup using docker exec
echo "Creating backup..."
docker exec "$CONTAINER_NAME" \
    pg_dump -U "$DB_USER" -d "$DB_NAME" --no-password > "$BACKUP_PATH"

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "✅ Backup completed successfully!"
    echo "📁 Backup saved to: $BACKUP_PATH"
    
    # Get file size
    FILE_SIZE=$(du -h "$BACKUP_PATH" | cut -f1)
    echo "📊 Backup size: $FILE_SIZE"
    
    # List recent backups
    echo ""
    echo "📋 Recent backups in $BACKUP_DIR:"
    ls -la "$BACKUP_DIR"/*.sql | tail -5
else
    echo "❌ Backup failed!"
    exit 1
fi 