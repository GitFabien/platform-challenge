# Small official Node.js image (same major version as CI)
FROM node:22-alpine

# tini passes Ctrl+C / docker stop on to Node so the container stops cleanly
RUN apk add --no-cache tini

ENV NODE_ENV=production
WORKDIR /app

# Install production dependencies first so Docker can cache this layer
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy the application code
COPY src ./src

# Run as the unprivileged "node" user instead of root
USER node

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/app.js"]
