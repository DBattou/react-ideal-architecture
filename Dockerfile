FROM node:18-alpine AS base
 
FROM base AS builder
WORKDIR /app
RUN npm install -g turbo@1.10.16
COPY . .
RUN turbo prune --scope=qonto-js --docker

# remove all empty node_modules folder structure
# https://github.com/vercel/turbo/issues/1997#issuecomment-1271372326
RUN rm -rf /app/out/full/*/*/node_modules

 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN npm install -g pnpm@8.6.11
RUN pnpm install --frozen-lockfile
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN NEXT_TELEMETRY_DISABLED=1 pnpm run build
 
# FROM base AS runner
# WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
#COPY --from=builder /app/apps/qonto-js/next.config.js .
#COPY --from=installer /app/apps/qonto-js/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
#COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
#COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000

ENV PORT 3000

WORKDIR /app/out/json/apps/qonto-js
CMD ["pnpm", "start"]