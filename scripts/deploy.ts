import { artifacts } from "hardhat";
import { createWalletClient, createPublicClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const RPC_URL = process.env.RPC_URL!;
const CHAIN_ID = Number(process.env.CHAIN_ID!);
const PRIVATE_KEY_RAW = (process.env.PRIVATE_KEY || "").replace(/^0x/, "");
const TOKEN_SUPPLY = process.env.TOKEN_SUPPLY || "1000000";

async function main() {
  if (!RPC_URL || !CHAIN_ID || !PRIVATE_KEY_RAW) {
    throw new Error("Missing env RPC_URL/CHAIN_ID/PRIVATE_KEY");
  }

  // Load ABI + bytecode compiled by Hardhat
  const { abi, bytecode } = await artifacts.readArtifact("DidLabToken");

  // Define chain
  const chain = {
    id: CHAIN_ID,
    name: `didlab-${CHAIN_ID}`,
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: [RPC_URL] } },
  };

  const account = privateKeyToAccount(`0x${PRIVATE_KEY_RAW}`);
  const wallet = createWalletClient({ account, chain, transport: http(RPC_URL) });
  const publicClient = createPublicClient({ chain, transport: http(RPC_URL) });

  // Initial supply with 18 decimals (FIXED: pass number, not BigInt)
  const initialSupply = parseUnits(TOKEN_SUPPLY, 18);

  // Deploy contract
  const hash = await wallet.deployContract({
    abi,
    bytecode,
    args: [initialSupply],
  });

  console.log("Deploy tx hash:", hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Token deployed at:", receipt.contractAddress);
  console.log("Deployer:", account.address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
