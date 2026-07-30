# Stage 1: Prune the monorepo
FROM node:20-alpine AS pruner
RUN npm install -g pnpm turbo
WORKDIR /app
COPY . .
RUN turbo prune web --docker

# Stage 2: Install and build
FROM node:20-alpine AS builder
# Setting corepack allows us to use the native pnpm binary without path breaking
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
ARG VITE_APP_BACKEND_URI
ENV VITE_APP_BACKEND_URI=$VITE_APP_BACKEND_URI
ENV TURBO_TELEMETRY_DISABLED=1
RUN pnpm run build

# Stage 3: Runner (Optimized and Fixed)
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Only pull over what is needed to run the app
COPY --from=builder /app .

EXPOSE 4173

# Using explicit shell execution prevents Node from trying to parse pnpm as a file
CMD ["sh", "-c", "pnpm --filter web run preview --host 0.0.0.0 --port 4173"]
