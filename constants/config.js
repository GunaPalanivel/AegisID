// config.js

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Simple Config Object
const config = {
  secretSalt: process.env.SECRET_SALT || "default_secret_salt", // Used for encryption
  hederaAccountId: process.env.HEDERA_ACCOUNT_ID || null,
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY || null,
};

export default config;
