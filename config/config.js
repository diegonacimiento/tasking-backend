import dotenv from "dotenv";
dotenv.config();
const config = {
  env: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",
	port: process.env.PORT || 3000,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  ggMail: process.env.GGMAIL,
  ggKey: process.env.GGKEY,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  dbUrl: process.env.DB_URL,
};
export { config };
