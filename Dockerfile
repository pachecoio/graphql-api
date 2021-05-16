FROM node as base
WORKDIR /usr/src/app
COPY package*.json ./
COPY scripts ./scripts
RUN npm install
EXPOSE 5000

FROM base as dev
WORKDIR /usr/src/app/scripts
CMD ["sh", "devstart.sh"]

FROM base as prod
COPY . .
WORKDIR /usr/src/app/scripts
CMD ["sh", "start.sh"]