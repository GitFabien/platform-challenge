# syntax=docker/dockerfile:1.7

# ---------- Stage 1: production dependencies ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# ---------- Stage 2: build & test (quality gate) ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY src ./src
COPY test ./test
RUN npm test

# ---------- Stage 3: runtime ----------
FROM node:22-alpine AS runtime

ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

COPY --from=deps  /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=build /app/src ./src

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "src/app.js"]
