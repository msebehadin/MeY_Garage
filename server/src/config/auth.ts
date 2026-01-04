import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "12345",
    database: "MeY_garage",
  }),
  session:{
	fields:	{
		user:{
			role:true,//
		},
	},
  },
  emailAndPassword: {
    enabled: true,
  },
});
