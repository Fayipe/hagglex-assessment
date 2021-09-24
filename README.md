## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app using docker

```bash
$ docker build -t <image_name> .

$ docker run <image_name>
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Runn with nodemon
$ nodemon

## Try It
* Open you're browser to [http://localhost:3000/graphql](http://localhost:3000/graphql)

## sample Query 
query {
  Webdata(url: "https://www.amazon.com") {
    title
    description
    largestImage
  }
}

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

Nest is [MIT licensed](LICENSE).
