# The BAD BANK application backend

This project was started as part of the MIT course Professional Certificate in Coding: Full Stack Development with MERN
I decided to keep them separated so each one can evolve without much coupling

## Installation guide

### clone the repository
`git clone https://github.com/oleongomez/bad_bank_backend.git`

### Install dependencies
`npm install`

### Run
`npm start`

### Run in dev mode
`npm run dev`

This will run the application in development mode at localhost:3001. Each change in the
source files will restart the application

## Technology used
This App was developed with express and created with express-generator.
This App also uses MongoDB as storage
The application is being developed following the hexagonal architecture pattern. This allows to abstract the storage implementation from the accounts

## Features
Allows to create user accounts
Allows you to see all the accounts data
Allows you to modify all the accounts

## Planned features
Authentication of requests
Using different storage adapters for different storage solutions like redis or in memory

## License
MIT (See LICENSE.md)
