FROM node:18

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install
RUN npm install react-router-dom

EXPOSE 3000
CMD ["npm", "start"]

