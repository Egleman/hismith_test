FROM node:22-alpine
WORKDIR /app
# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
