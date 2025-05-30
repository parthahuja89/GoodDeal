import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import * as Schema from "../../src/database/Schema";

export type User = InferSelectModel<typeof Schema.users>;
export type NewUser = InferInsertModel<typeof Schema.users>;