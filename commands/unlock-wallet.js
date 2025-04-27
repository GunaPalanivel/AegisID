const inquirer = require("inquirer");
const { loadWallet } = require("../services/wallet.service");

async function unlockWallet() {
  try {
    console.log("🔓 Unlocking your wallet...");

    const { password } = await inquirer.prompt([
      {
        type: "password",
        name: "password",
        message: "Enter your wallet password:",
        mask: "*",
        validate: (input) =>
          input.length > 5 || "Password must be at least 6 characters.",
      },
    ]);

    const wallet = await loadWallet(password);

    console.log("✅ Wallet successfully unlocked!");
    console.log("Your DID: ", wallet.did);
    console.log("Your Public Key: ", wallet.publicKey);
  } catch (error) {
    console.error("❌ Failed to unlock wallet:", error.message);
  }
}

// Important: Export like this for CommonJS
module.exports = unlockWallet;
