#!/usr/bin/env node

const { program } = require("commander");

// Import all CLI command handlers
const createDID = require("../commands/create-did");
const issueCredential = require("../commands/issue-credential");
const receiveCredential = require("../commands/receive-credential");
const presentCredential = require("../commands/present-credential");
const verifyPresentation = require("../commands/verify-presentation");

// 🔥 Add unlockWallet import (CommonJS style)
const unlockWallet = require("../commands/unlock-wallet");

// Setup commands
program
  .command("create-did")
  .description("Create a new Decentralized Identifier (DID)")
  .action(createDID);

program
  .command("unlock-wallet") // 🔥 New Command
  .description("Unlock and decrypt your local wallet")
  .action(unlockWallet);

program
  .command("issue-credential")
  .description("Issue a Verifiable Credential")
  .action(issueCredential);

program
  .command("receive-credential")
  .description("Receive and store a credential locally")
  .action(receiveCredential);

program
  .command("present-credential")
  .description("Create a Verifiable Presentation")
  .action(presentCredential);

program
  .command("verify-presentation")
  .description("Verify a Verifiable Presentation")
  .action(verifyPresentation);

// Parse arguments
program.parse(process.argv);
