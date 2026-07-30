# Stage 1: Build stage
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy the monorepo configuration files first to establish installation scope
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY packages/ ./packages/
COPY app/ ./app/

# Install all workspace dependencies cleanly
RUN pnpm install --frozen-lockfile

# Pass the background URI key from compose into the build environment
ARG VITE_APP_BACKEND_URI
ENV VITE_APP_BACKEND_URI=$VITE_APP_BACKEND_URI

# Compile your frontend application directly inside the web workspace filter
RUN pnpm --filter web run build

# Stage 2: Operational runtime layer
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy all the installed code parameters from your builder container stage
COPY --from=builder /app .

EXPOSE 4173

# Run the preview tool globally inside your web package context on port 4173
CMD ["sh", "-c", "pnpm --filter web run preview --host 0.0.0.0 --port 4173"]
