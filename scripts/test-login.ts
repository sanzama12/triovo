import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { authService } from "../src/services/auth.service";
import { repositories } from "../src/repositories";

async function testLogin() {
  console.log("MONGODB_URI set:", Boolean(process.env.MONGODB_URI));
  console.log("TROVIO_REPO_DRIVER:", process.env.TROVIO_REPO_DRIVER);

  const user = await repositories.users.findByEmail("admin@trovio.vn");
  console.log("Found user by email in repository:", user ? { id: user.id, email: user.email, admin: user.admin, hasHash: Boolean(user.passwordHash), verified: user.verified, locked: user.locked } : null);

  const res = await authService.login("admin@trovio.vn", "Trovio@2026");
  console.log("Login result for admin@trovio.vn / Trovio@2026:", res);

  const studentRes = await authService.login("an@trovio.vn", "Trovio@2026");
  console.log("Login result for an@trovio.vn / Trovio@2026:", studentRes);
}

testLogin().catch(console.error);
