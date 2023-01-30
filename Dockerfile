FROM node:16-bullseye
WORKDIR /app
COPY dist .
WORKDIR /app/server
COPY ./server .
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]