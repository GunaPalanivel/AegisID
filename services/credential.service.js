const { ethers } = require("ethers");

async function createCredential(
  issuerDid,
  subjectDid,
  achievement,
  privateKey
) {
  const credential = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiableCredential"],
    issuer: issuerDid,
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: subjectDid,
      achievement: achievement,
    },
  };

  const signingKey = new ethers.Wallet(privateKey);
  const proof = await signingKey.signMessage(JSON.stringify(credential));
  credential.proof = { type: "EcdsaSecp256k1Signature2019", proofValue: proof };

  return credential;
}

module.exports = { createCredential };
