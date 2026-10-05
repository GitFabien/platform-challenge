# syntax=docker/dockerfile:1

FROM node:20-alpine

ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

# Install production dependencies first to benefit from layer caching.
# Uses the lockfile when present (reproducible), falls back to npm install otherwise.
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi \
    && npm cache clean --force

COPY src ./src

# Run as the unprivileged "node" user shipped with the official image.
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/app.js"]
