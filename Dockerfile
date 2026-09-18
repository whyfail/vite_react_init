# syntax=docker/dockerfile:1.7
# Build the static SPA bundle, then serve it with nginx. The /api location is
# reverse-proxied to the backend; the upstream is set at container start via
# the API_BACKEND_URL environment variable (default targets the host loopback,
# where `docker compose`/local backend usually listens).

FROM node:24-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@11.20.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
# Vite bakes these into the bundle at build time; both are required.
ARG VITE_API_BASE=/api
ARG VITE_API_TARGET=http://localhost:8080
ENV VITE_API_BASE=$VITE_API_BASE \
    VITE_API_TARGET=$VITE_API_TARGET
RUN pnpm build

FROM nginx:alpine AS runner
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.default.conf.template /etc/nginx/templates/default.conf.template
ENV API_BACKEND_URL=http://host.docker.internal:8080
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
