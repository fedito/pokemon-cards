# pokemon-cards

For the resolution of the problem, ExpressJs was used as a framework.

## Requirements

* Node.js
* Typescrypt
* MySQL

## Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /auth/                      # Auth configuration
├── /controllers/               # Controller of the routes
├── /db/                        # DB configuration
├── /middlewares/               # Middlewares for validation
├── /models/                    # Models of the application
├── /node_modules/              # 3rd-party libraries and utilities
├── /routes/                    # Routes of the application
├── app.ts                      # Configuration of the server
├── .env.example                # Example ENV configuration
├── db.sql                      # DB for import
├── package.json                # The list of 3rd party libraries and utilities
└── swagger.json                # Swagger configuration
```

## Getting started

#### Start service

```shell
## Install packages
$ npm install

## Create .env file
an .env.example is provided

## Import DB
a db.sql file is provided

## Start
$ npm start
```
