FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat python3 make g++
RUN npm i -g npm 
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY package.json .
COPY package-lock.json .
RUN npm ci
 
# Build the project
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

CMD node/server.js