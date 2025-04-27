#!/usr/bin/env node

const { program } = require("commander");
const { Client, AccountId, PrivateKey } = require("@hashgraph/sdk");
const dotenv = require("dotenv");

// Import all CLI command handlers
const createDID = require("../commands/create-did");
const issueCredential = require("../commands/issue-credential");
const receiveCredential = require("../commands/receive-credential");
const presentCredential = require("../commands/present-credential");
const verifyPresentation = require("../commands/verify-presentation");
const unlockWallet = require("../commands/unlock-wallet");

// Initialize Hedera Client (Testnet or Mainnet based on environment)
dotenv.config(); // Ensure environment variables are loaded

// Logging environment variables for debugging
console.log("HEDERA_ACCOUNT_ID:", process.env.HEDERA_ACCOUNT_ID);
console.log("HEDERA_PRIVATE_KEY:", process.env.HEDERA_PRIVATE_KEY);

const client = Client.forTestnet(); // Use Testnet or Mainnet depending on your setup
client.setOperator(
  AccountId.fromString(process.env.HEDERA_ACCOUNT_ID),
  PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY)
);

// Function to check MetaMask (Only works in browser environment)
async function checkMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected MetaMask account: ", accounts[0]);
      return accounts[0]; // Returning the connected account
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
    }
  } else {
    console.log("MetaMask is not installed.");
  }
}

// Example Hedera operation to get account balance
async function getHederaAccountBalance() {
  try {
    const balance = await client.getAccountBalance(
      AccountId.fromString(process.env.HEDERA_ACCOUNT_ID)
    );
    console.log("Hedera Account Balance: ", balance.toString());
  } catch (error) {
    console.error("Error fetching Hedera account balance:", error);
  }
}

// Setup combined command with options for both Hedera and DID operations
program
  .command("interact-with-did")
  .description("Interact with Hedera Hashgraph and Decentralized Identity")
  .action(async () => {
    // Check MetaMask connection if running in browser (this will fail in Node.js)
    if (typeof window !== "undefined") {
      const account = await checkMetaMask();
    }

    // Fetch and display Hedera account balance
    await getHederaAccountBalance();

    // Offer options for DID-related actions after checking MetaMask and Hedera
    console.log("What would you like to do next?");
    console.log("1. Create DID");
    console.log("2. Issue Credential");
    console.log("3. Receive Credential");
    console.log("4. Present Credential");
    console.log("5. Verify Presentation");
    console.log("6. Unlock Wallet");

    const userChoice = await promptUserChoice(); // Function to prompt the user for input (implement this as needed)

    switch (userChoice) {
      case "1":
        createDID();
        break;
      case "2":
        issueCredential();
        break;
      case "3":
        receiveCredential();
        break;
      case "4":
        presentCredential();
        break;
      case "5":
        verifyPresentation();
        break;
      case "6":
        unlockWallet();
        break;
      default:
        console.log("Invalid choice");
        break;
    }
  });

// A helper function to prompt for user input (example for CLI)
function promptUserChoice() {
  return new Promise((resolve) => {
    // Simple prompt for user input (you can use readline or other libraries for better input handling)
    console.log("Enter a number to select an option: ");
    const stdin = process.openStdin();
    stdin.addListener("data", function (d) {
      resolve(d.toString().trim());
      stdin.pause();
    });
  });
}

// Parse arguments and run the program
program.parse(process.argv);
