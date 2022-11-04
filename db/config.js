import { config } from "../config/config.js";


export default {
  development: {
    url: config.dbUrl,
    dialect: "postgres",
  },
  production: {
    url: config.dbUrl,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
