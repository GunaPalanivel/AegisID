import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ES modules (because ES modules don't support __dirname directly)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file (explicitly load from the project root)
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Configuration object using environment variables
const config = {
  // Local wallet encryption settings
  secretSalt: process.env.SECRET_SALT || "default_secret_salt", // Used for encryption

  // MetaMask and Hedera Setup
  METAMASK_PRIVATE_KEY: process.env.METAMASK_PRIVATE_KEY,
  METAMASK_ADDRESS: process.env.METAMASK_ADDRESS,

  // Hedera details
  HEDERA_NETWORK: process.env.HEDERA_NETWORK,
  HEDERA_PRIVATE_KEY: process.env.HEDERA_PRIVATE_KEY,
  HEDERA_ACCOUNT_ID: process.env.HEDERA_ACCOUNT_ID,
  HEDERA_MIRROR_NODE_URL: process.env.HEDERA_MIRROR_NODE_URL,

  // Logging level
  LOG_LEVEL: process.env.LOG_LEVEL || "info",

  // Feature Flags
  ENABLE_ZK_PROOFS: process.env.ENABLE_ZK_PROOFS || false,
  DID_METHOD: process.env.DID_METHOD || "hedera",
};

export default config;
