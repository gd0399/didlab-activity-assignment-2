import { ethers } from "hardhat";

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  // Compile and deploy DidLabToken
  const Token = await ethers.getContractFactory("DidLabToken");
  const token = await Token.deploy(1000000); // initial supply

  // Wait for deployment to complete
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("DidLabToken deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
