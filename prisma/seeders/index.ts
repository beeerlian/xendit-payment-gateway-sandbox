import { Idb } from "./prisma";

import stores from "./store.seed";
import users from "./users.seed";

const db: Idb = new Idb();

async function main() {
  await users(db);
  await stores(db);
}

main()
  .catch(async (e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.disconnect();
    process.exit(0);
  });
