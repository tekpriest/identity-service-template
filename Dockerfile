FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g prisma@3.0.2
# RUN prisma migrate reset --force
RUN prisma generate
RUN npm link webpack
RUN npm run build
CMD ["npm", "run", "start:prod"]
