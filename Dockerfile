FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# ------------------------------------------
# Host the build files
FROM node:24-alpine AS runtime

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80/tcp

WORKDIR /app

# copy dependencies
COPY --from=prod-deps /app/package.json .
COPY --from=prod-deps /app/node_modules ./node_modules
# copy the built files
COPY --from=build /app/build ./build

ENTRYPOINT ["node", "-r", "dotenv/config", "build"]
