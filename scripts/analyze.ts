import { ethers } from "hardhat";

async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();

  // Use the deployed contract address
  const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const Token = await ethers.getContractFactory("DidLabToken");
  const token = Token.attach(tokenAddress);

  console.log("Analyzing interactions with DidLabToken at:", tokenAddress);

  // --- Transfer 1: owner -> addr1 ---
  let tx = await token.transfer(addr1.address, ethers.parseUnits("100", 18));
  let receipt = await tx.wait();
  console.log("\n[Transfer 1]");
  console.log("Tx Hash:", receipt.hash);
  console.log("Gas Used:", receipt.gasUsed.toString());
  console.log("Logs:", receipt.logs);

  // --- Transfer 2: addr1 -> addr2 ---
  tx = await token.connect(addr1).transfer(addr2.address, ethers.parseUnits("50", 18));
  receipt = await tx.wait();
  console.log("\n[Transfer 2]");
  console.log("Tx Hash:", receipt.hash);
  console.log("Gas Used:", receipt.gasUsed.toString());
  console.log("Logs:", receipt.logs);

  // --- Approval: owner -> addr1 ---
  tx = await token.approve(addr1.address, ethers.parseUnits("200", 18));
  receipt = await tx.wait();
  console.log("\n[Approval]");
  console.log("Tx Hash:", receipt.hash);
  console.log("Gas Used:", receipt.gasUsed.toString());
  console.log("Logs:", receipt.logs);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
