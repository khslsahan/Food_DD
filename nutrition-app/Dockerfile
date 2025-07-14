# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && \
    pnpm install --no-frozen-lockfile

# Copy source files (excluding node_modules)
COPY . .

# Set build-time environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Use a dummy database URL for build time
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate Prisma Client
RUN pnpm prisma generate

# Build the application
ENV NEXT_SHARP_PATH=/app/node_modules/sharp
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1
# Real database URL for runtime
ENV DATABASE_URL="postgresql://food_nutrition_user:food_nutrition_pass@db:5432/food_nutrition_db?schema=public"

# Install Python 3 and pip
USER root
RUN apk add --no-cache python3 py3-pip

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/lib/generated ./lib/generated

# Copy scripts
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts

# Create and use a Python virtual environment
RUN python3 -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"
RUN /app/venv/bin/pip install --no-cache-dir -r ./scripts/requirements.txt

# Ensure uploads directory exists and is writable
RUN mkdir -p /app/uploads && chown nextjs:nodejs /app/uploads

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Start the application
CMD ["node", "server.js"] 