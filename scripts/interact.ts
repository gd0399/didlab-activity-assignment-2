import { ethers } from "hardhat";

async function main() {
  // Get accounts
  const [owner, addr1, addr2] = await ethers.getSigners();

  // Use the deployed contract address from your deploy step
  const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Attach to the deployed contract
  const Token = await ethers.getContractFactory("DidLabToken");
  const token = Token.attach(tokenAddress);

  console.log("Interacting with DidLabToken at:", tokenAddress);

  // 1st Transfer: owner -> addr1
  let tx = await token.transfer(addr1.address, ethers.parseUnits("100", 18));
  await tx.wait();
  console.log(`Transferred 100 DLAB from ${owner.address} to ${addr1.address}`);

  // 2nd Transfer: addr1 -> addr2
  tx = await token.connect(addr1).transfer(addr2.address, ethers.parseUnits("50", 18));
  await tx.wait();
  console.log(`Transferred 50 DLAB from ${addr1.address} to ${addr2.address}`);

  // Approval: owner approves addr1 to spend tokens
  tx = await token.approve(addr1.address, ethers.parseUnits("200", 18));
  await tx.wait();
  console.log(`Approved ${addr1.address} to spend 200 DLAB on behalf of ${owner.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
