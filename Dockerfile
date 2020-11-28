FROM node:12.1.0 as dev
WORKDIR /app
COPY package*.json ./
RUN npm install
WORKDIR /app
COPY . .
RUN ls -al
ENV NODE_ENV=development
CMD ls -ltr && npm install && npx sequelize db:create && npx sequelize db:migrate && npm run server 
