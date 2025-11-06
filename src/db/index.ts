import { drizzle } from "drizzle-orm/bun-sqlite";
import {} from "drizzle-orm/bun-sql"; // This line makes this file server only and not throw an error. TODO: explore proper fix
import { Database } from "bun:sqlite";

import * as schema from "./schema.ts";

const sqlite = new Database(process.env.DATABASE_URL!);
export const db = drizzle(sqlite, { schema });
