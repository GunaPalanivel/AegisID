const { generateKeyPair, saveWallet } = require("../services/wallet.service");
const inquirer = require("inquirer").default;
const chalk = require("chalk").default;

async function createDID() {
  console.log(chalk.blueBright("\n🔐 Creating new DID & secure wallet...\n"));

  const { password } = await inquirer.prompt([
    {
      type: "password",
      name: "password",
      message: "Set a strong wallet password:",
    },
  ]);

  const { publicKey, privateKey } = generateKeyPair();

  const did = `did:hedera:${publicKey.slice(0, 16)}`;

  const encryptedPrivateKey = require("../services/crypto-utils").encrypt(
    privateKey,
    password
  );

  await saveWallet({ did, publicKey, encryptedPrivateKey });

  console.log(
    chalk.green(`✅ DID created and wallet saved! Your DID: ${did}\n`)
  );
}

module.exports = createDID;
