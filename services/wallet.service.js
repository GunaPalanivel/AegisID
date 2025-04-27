import { promises as fs } from "fs";
import path from "path";
import { randomBytes, createECDH } from "crypto";
import { encrypt, decrypt } from "./crypto-utils.js"; // make sure the extension is .js when using ES modules
import config from "../config.js"; // 📢 Import the new config

import { fileURLToPath } from "url";

// Setup __dirname (because ES modules won't have it by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const walletDir = path.resolve(__dirname, "../../wallet");
const walletPath = path.join(walletDir, "wallet.json");

// Generate ECDSA key pair
function generateKeyPair() {
  const ecdh = createECDH("secp256k1");
  ecdh.generateKeys();
  const publicKey = ecdh.getPublicKey("hex");
  const privateKey = ecdh.getPrivateKey("hex");
  return { publicKey, privateKey };
}

// Save wallet data to a file
async function saveWallet({ did, publicKey, encryptedPrivateKey }) {
  try {
    // Ensure the wallet folder exists
    await fs.mkdir(walletDir, { recursive: true });

    // Prepare wallet data
    const walletData = {
      did,
      publicKey,
      encryptedPrivateKey,
    };

    // Save wallet to JSON file
    await fs.writeFile(walletPath, JSON.stringify(walletData, null, 2));
    console.log(`✅ Wallet successfully saved at: ${walletPath}`);
  } catch (error) {
    console.error("❌ Failed to save wallet:", error);
    throw error;
  }
}

// Load wallet data from file and decrypt the private key
async function loadWallet(password) {
  try {
    const data = await fs.readFile(walletPath, "utf-8");
    const { did, publicKey, encryptedPrivateKey } = JSON.parse(data);

    if (!config.secretSalt) {
      throw new Error("SECRET_SALT is missing from environment variables!");
    }

    // Decrypt the private key using password + secret salt
    const decryptedPrivateKey = decrypt(
      encryptedPrivateKey,
      password,
      config.secretSalt
    );

    return { did, publicKey, privateKey: decryptedPrivateKey };
  } catch (error) {
    console.error("❌ Failed to load wallet:", error);
    throw error;
  }
}

export { generateKeyPair, saveWallet, loadWallet };
