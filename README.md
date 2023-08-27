# xendit-payment-gateway-sandbox

Xendit Payment gateway Sandbox Apps Built with TypeScript. ExpressJS and Prisma included. Using MySQL for the database.

![Express](https://img.shields.io/badge/Express-v4.18.1-green?style=flat)
![Express](https://img.shields.io/badge/PrismaJS-v4.3.0-blue?style=flat)

## How to run it?

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/beeerlian/xendit-payment-gateway-sandbox)

## Manual Configuration

### ENV Configuration

- Copy .env.example to .env
- Add MySQL `DATABASE_URL` key to database url protocol activated database
- Create random string in `APP_SECRET` key (for jwt and some encryption key, more complicated more secure 👍)
- Create `PORT` with port you desired.

### Just Start!

```bash
yarn install
yarn prisma db pull
yarn prisma:seed //seeding database
yarn dev //development
yarn start //to build and run the dist/index.ts file
```
