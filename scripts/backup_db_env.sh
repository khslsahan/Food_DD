#!/bin/bash

# Database Backup Script for Food Nutrition App with Environment Variables
# Usage: ./backup_db_env.sh [backup_directory]
# Environment variables can be set to override defaults

set -e

# Environment variables with defaults
export BACKUP_DIR="${BACKUP_DIR:-./DB_BKP}"
export DB_USER="${DB_USER:-food_nutrition_user}"
export DB_PASSWORD="${DB_PASSWORD:-food_nutrition_pass}"
export DB_NAME="${DB_NAME:-food_nutrition_db}"
export DB_HOST="${DB_HOST:-localhost}"
export DB_PORT="${DB_PORT:-5433}"
export DOCKER_COMPOSE_FILE="${DOCKER_COMPOSE_FILE:-docker/docker-compose-prod-deploy.yml}"

# Override with command line argument if provided
if [ ! -z "$1" ]; then
    BACKUP_DIR="$1"
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Generate timestamp for unique backup filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILENAME="food_nutrition_backup_${TIMESTAMP}.sql"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_FILENAME"

echo "🔧 Configuration:"
echo "   Backup Directory: $BACKUP_DIR"
echo "   Database User: $DB_USER"
echo "   Database Name: $DB_NAME"
echo "   Database Host: $DB_HOST"
echo "   Database Port: $DB_PORT"
echo "   Docker Compose File: $DOCKER_COMPOSE_FILE"
echo ""

echo "Starting database backup..."
echo "Backup location: $BACKUP_PATH"

# Check if PostgreSQL container is running
CONTAINER_NAME=$(docker ps --format "table {{.Names}}\t{{.Image}}" | grep "postgres" | awk '{print $1}')

if [ -z "$CONTAINER_NAME" ]; then
    echo "❌ Error: PostgreSQL container is not running!"
    echo "Please start the database container first:"
    echo "docker-compose -f $DOCKER_COMPOSE_FILE up -d db"
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
    
    echo ""
    echo "💡 To restore this backup, use:"
    echo "docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME < $BACKUP_PATH"
else
    echo "❌ Backup failed!"
    exit 1
fi 