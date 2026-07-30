# Stage 1: Build stage
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# 1. Copy the core workspace configuration tracking files first
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# 2. Copy the exact monorepo subdirectories matching your layout
COPY packages/ ./packages/
COPY apps/ ./apps/

# 3. Install all workspace dependencies cleanly
RUN pnpm install --frozen-lockfile

# Pass the background URI key from compose into the build environment
ARG VITE_APP_BACKEND_URI
ENV VITE_APP_BACKEND_URI=$VITE_APP_BACKEND_URI

# 4. Compile your main application directly inside the web workspace filter
RUN pnpm --filter web run build

# Stage 2: Operational runtime layer
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy all the compiled assets and node modules from the builder stage
COPY --from=builder /app .

EXPOSE 4173

# Execute the preview tool directly within your web package context on port 4173
CMD ["sh", "-c", "pnpm --filter web run preview --host 0.0.0.0 --port 4173"]
