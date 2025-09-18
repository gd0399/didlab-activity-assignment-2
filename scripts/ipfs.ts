// CommonJS-compatible IPFS client usage
const { create } = require("ipfs-http-client");

async function main() {
  // Connect to Infura’s IPFS gateway
  const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

  // Example data
  const data = "Hello DidLab from Team 12 🚀";

  // Add to IPFS
  const result = await client.add(data);
  console.log("Stored on IPFS with CID:", result.cid.toString());

  // Retrieve back from IPFS
  const stream = client.cat(result.cid);
  let content = "";
  for await (const chunk of stream) {
    content += new TextDecoder().decode(chunk);
  }

  console.log("Retrieved content:", content);
}

main().catch(console.error);
