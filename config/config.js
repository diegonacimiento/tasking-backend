import dotenv from "dotenv";
dotenv.config();
const config = {
  env: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",
	port: process.env.PORT || 3000,
	dbUser: process.env.POSTGRES_USER,
	dbPassword: process.env.POSTGRES_PASSWORD,
	dbHost: process.env.POSTGRES_HOST,
	dbName: process.env.POSTGRES_NAME,
	dbPort: process.env.POSTGRES_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  ggMail: process.env.GGMAIL,
  ggKey: process.env.GGKEY,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  dbUrl: process.env.POSTGRES_URL,
  frontendUrl: process.env.URL_FRONTEND,
};
export { config };
