# apps/web/Dockerfile
FROM node:22-slim AS deps
WORKDIR /app

COPY apps/web/package.json apps/web/pnpm-lock.yaml* ./
COPY pnpm-lock.yaml* ./
COPY pnpm-workspace.yaml* ./
COPY package.json* ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

FROM node:22-slim AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY apps/web ./apps/web

WORKDIR /app/apps/web
RUN pnpm run build

FROM node:22-slim AS runner
WORKDIR /app/apps/web
ENV NODE_ENV=production
ENV PORT=8080

# Copy the built app
COPY --from=build /app/apps/web ./

EXPOSE 8080
CMD ["pnpm", "start", "-p", "8080"]
