import { Idb } from "./prisma";

const datas = [
  {
    email: "xendit-payment-gateway@mail.com",
    password: "password",
    name: "xendit-payment-gateway Front End Web",
  },
];

export default async function users(db: Idb) {
  try {
    await db.client.AppClients.createMany({
      data: datas,
      skipDuplicates: false,
    });
    console.log("\x1b[32m%s\x1b[0m", "[prisma:seed] App Clients >> Success");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[prisma:seed] App Clients >> Failed");
  }
}
