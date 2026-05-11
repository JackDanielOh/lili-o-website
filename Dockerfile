FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build && ls -la /app

FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/.output ./.output

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

CMD ["node", ".output/server/index.mjs"]
