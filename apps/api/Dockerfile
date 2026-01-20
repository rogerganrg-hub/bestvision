# apps/api/Dockerfile
FROM node:22-slim AS deps
WORKDIR /app

# Copy only manifests first for caching
COPY apps/api/package.json apps/api/pnpm-lock.yaml* ./
# If you use pnpm workspace lock at root, copy it too:
COPY pnpm-lock.yaml* ./
COPY pnpm-workspace.yaml* ./
COPY package.json* ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

FROM node:22-slim AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY apps/api ./apps/api

# Build NestJS (assumes build script outputs dist/)
WORKDIR /app/apps/api
RUN pnpm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy built output + production deps
COPY --from=build /app/apps/api/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY apps/api/package.json ./package.json

EXPOSE 8080
CMD ["node", "dist/main.js"]
