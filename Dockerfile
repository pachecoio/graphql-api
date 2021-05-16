FROM node as base
WORKDIR /usr/src
COPY package*.json .
RUN npm install --no-optional && npm cache clean --force
ENV PATH /usr/src/node_modules/.bin:$PATH
WORKDIR /usr/src/app
EXPOSE 5000

FROM base as dev
CMD npm run dev:start

FROM base as prod
COPY . .
WORKDIR /usr/src/app
CMD npm start