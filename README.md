<p align="left">
  <img src="./showcase/nest.jpg" width="500" alt="nest-og">
</p>

This project is a Node.js application built with NestJS framework. It implements several features such as authentication with JSON Web Tokens (JWT), role-based authorization, custom exception filters, integration with Sentry.io, AWS SES service, AWS Cloudwatch service, AWS s3 Bucket, custom roles guard for role-based access control (RBAC) and Husky for Git hooks and migrations.
## Out-of-box Solutions

**Built-in Features**

-  **NestJS** — latest version
-  **TypeScript** - Type checking
-  **Dotenv** - Supports environment variables
-  **Authentication** - JWT, RSA256
-  **Authorization** - RBAC, CBAC
-  **TypeORM** - Database ORM
-  **PostgreSQL** - Open-Source Relational Database
-  **Configuration** - Single config for all
-  **Swagger** - API Documentation
-  **Docker Compose** - Container Orchestration
-  **Helmet** - secure HTTP headers
-  **Insomnia** - sInsomnia config for endpoints
-  **ESLint** — Pluggable JavaScript linter
-  **Prettier** - Opinionated Code Formatter
-  **Commitlint** - Lint your conventional commits
- **WinstonLogger** Winston Logger implementation
- **Exceptions Handling** Custom exception filters
- **Sentry** Integration with Sentry.io
- **AWS** Integration with AWS services (SES,S3 Bucket,CLOUDWATCH)
- **Husky** Husky integration for Git hooks
- **Migrations** TypeORM migrations

## Getting Started
Prerequisites
* Node.js v10 or higher
* npm v6 or higher
* A Sentry.io account (optional)
* AWS account (optional)

## Clone the repository
* git clone https://github.com/username/repository.git

## Quick Setup (Production)

```bash
bash ./setup.sh
```

## Installation (Development)

```bash
$ npm install
```
## ENV Configuration
* **JWT_SECRET**: Secret for signing JWT
* **SENTRY_DSN**: Sentry DSN for error tracking
* **AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY**: AWS access key and secret key
* **AWS_REGION**: AWS region
* **S3_BUCKET_NAME**: S3 bucket name

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Running Migrations
```bash
# create migration
$ npx run typeorm migration:create

# run migrations
$ npx run typeorm migration:run

# show all executed migrations
$ npx run typeorm migration:show
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

## Endpoints

1. Install the insomnia app
2. Import the `endpoints.json` file
3. Enjoy

## Generate SSL certificates

1.  Generate an RSA private key, of size 2048, and output it to a file named key.pem:

```bash
openssl genrsa -out private_key.pem 2048
```

```bash
# It needs be copied&pasted from terminal manually
awk 'NF {sub(/\r/, ""); printf"%s\\n",$0;}' private_key.pem
```

2.  Extract the public key from the key pair, which can be used in a certificate:

```bash
openssl rsa -in private_key.pem -outform PEM -pubout -out public_key.pem
```

```bash
# It needs be copied&pasted from terminal manually
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' public_key.pem
```

## 📝 License

This project is licensed under the MIT License

<!-- ## 🌸 Built with template -->

---

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

[//]: # (<table>)

[//]: # ()
[//]: # (  <tr>)

[//]: # ()
[//]: # (    <td align="center"><a href="https://joeygoksu.com"><img src="https://avatars.githubusercontent.com/u/6523823?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Rizwan Zaheer</b></sub></a><br />)

[//]: # (    <a href="https://joeygoksu.com/aboutme" title="About me">📖</a>)

[//]: # ()
[//]: # (    </td>)

[//]: # ()
[//]: # (</table>)

<!-- ALL-CONTRIBUTORS-LIST:END -->

Made with ♥ by <a href="https://github.com/RizwanZaheerGhumman">Rizwan Zaheer</a>
