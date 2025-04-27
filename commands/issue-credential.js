const { loadWallet } = require("../services/wallet.service");
const { createCredential } = require("../services/credential.service");
const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs/promises");

async function issueCredential() {
  const wallet = await loadWallet();

  const { subjectDid, degree } = await inquirer.prompt([
    { name: "subjectDid", message: "Enter recipient DID:", type: "input" },
    { name: "degree", message: "Enter degree or achievement:", type: "input" },
  ]);

  const credential = await createCredential(
    wallet.did,
    subjectDid,
    degree,
    wallet.privateKey
  );

  await fs.writeFile("./credential.json", JSON.stringify(credential, null, 2));

  console.log(
    chalk.green("\n🎓 Credential issued and saved to credential.json\n")
  );
}

module.exports = issueCredential;
