# Graphql API

A minimal implementation of a Graphql API with Apollo Server, Typescript and JWT authentication

## How to run

Create a .env file and include a secret key.
This will be the key used for the JWT generations, you can include whatever key you want.


```
SECRET=<YOUR SECRET KEY>
```

### Run with npm

To run the project locally with npm, you need to have a mongodb instance running locally.
Under your `.env` file, include the mongodb variable as follows:

```
...
MONGODB_URI=mongodb://localhost:27017/<YOUR DB NAME>
```

Now you can simply run the app:

```
npm run dev:start
```

or for a production run:

```
npm start
```

### Run with docker

To run the app with docker it is as simple as running the docker compose file, like so:

```bash
docker compose up -d
```

## App ready, what now?

You can now visit your http://localhost:5000 and check the graphql playground.

You can also download (Insomnia)[https://insomnia.rest/download] and import the `insomnia_collections.json` file and you will have access to an example collection for the current implemented interfaces.