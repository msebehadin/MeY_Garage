import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { admin } from "better-auth/plugins";
export const auth = betterAuth({
	database: new Pool({
		host: "localhost",
		port: 5432,
		user: "postgres",
		password: "12345",
		database: "MeY_garage",
	}),
	emailAndPassword: {
		enabled: true
	},
	plugins:[
		admin({
			defaultRole:'MECHANIC',
			adminRole:'ADMIN'
		})
	],
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: false,
				defaultValue: "user",
				input: false,
			},
		},
	},
	session: {
		fields: {
			user: {
				additionalFeilds:['role'],
			},
		},
	},
});