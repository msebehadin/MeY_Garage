import { betterAuth } from "better-auth";
import { Pool } from "pg";

export  const auth = betterAuth({
  database: new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "12345",
    database: "MeY_garage",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
		required:false,
		defaultValue:'user',
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
