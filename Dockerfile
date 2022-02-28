FROM node:16.13.2
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org/
EXPOSE 3000

