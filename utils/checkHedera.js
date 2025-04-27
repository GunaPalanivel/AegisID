import { Client, PrivateKey } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

// Log the environment variables to make sure they're loaded correctly
console.log("HEDERA_ACCOUNT_ID:", process.env.HEDERA_ACCOUNT_ID);
console.log("HEDERA_PRIVATE_KEY:", process.env.HEDERA_PRIVATE_KEY);

async function checkBoth() {
  // Check for MetaMask
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("MetaMask Account:", accounts[0]);

    // Hedera Client setup using environment variables
    const hederaAccountId = process.env.HEDERA_ACCOUNT_ID; // Ensure this is correctly set
    const hederaPrivateKey = process.env.HEDERA_PRIVATE_KEY; // Ensure this is correctly set

    if (!hederaAccountId || !hederaPrivateKey) {
      console.error("Hedera Account ID or Private Key not found!");
      return;
    }

    const hederaClient = Client.forTestnet(); // Use testnet for development

    // Set operator for Hedera Client
    const privateKey = PrivateKey.fromString(hederaPrivateKey);
    hederaClient.setOperator(hederaAccountId, privateKey);

    try {
      // Fetch Hedera Account Balance
      const balance = await hederaClient.getAccountBalance(hederaAccountId);
      console.log("Hedera Balance:", balance.toString());
    } catch (error) {
      console.error("Error fetching Hedera account balance:", error);
    }
  } else {
    console.error("MetaMask is not installed!");
  }
}

// Call the checkBoth function
checkBoth();
