FROM node:lts-alpine AS base

LABEL maintainer=felipe.barros@gmail.com
LABEL org.opencontainers.image.source https://github.com/fgbs/escuela-turborepo
LABEL org.opencontainers.image.description "Aula"
LABEL org.label-schema.name="aula"
LABEL org.label-schema.description="Aula"
LABEL org.label-schema.vcs-url="https://github.com/fgbs/escuela-turborepo.git"
LABEL org.label-schema.usage="README.md"
LABEL org.label-schema.vendor="fgbs"

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why 
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune escuela --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo build --filter=escuela...

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/escuela/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/escuela/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/escuela/public ./apps/web/public

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD node apps/escuela/server.js