import { Idb } from "./prisma";

const datas = [
  {
    email: "admin@mail.com",
    password: "password",
    name: "Administrator",
  },
  {
    email: "user@mail.com",
    password: "password",
    name: "Basic User",
  },
  {
    email: "superadmin@mail.com",
    password: "password",
    name: "Super Administrator",
  },
];

export default async function users(db: Idb) {
  try {
    await db.client.Users.createMany({
      data: datas,
      skipDuplicates: true,
    });
    console.log("\x1b[32m%s\x1b[0m", "[prisma:seed] Users >> Success");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[prisma:seed] Users >> Failed");
  }
}
