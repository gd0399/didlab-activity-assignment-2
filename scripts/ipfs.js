import { create } from "ipfs-http-client";

async function main() {
  // Connect to local IPFS node (via Desktop)
  const client = create({ url: "http://127.0.0.1:5001" });

  // Data to store
  const data = "Hello DidLab from Team 12 🚀 (local IPFS working!)";

  // Add data to IPFS
  const result = await client.add(data);
  console.log("Stored locally on IPFS with CID:", result.cid.toString());

  // Retrieve data
  const stream = client.cat(result.cid);
  let content = "";
  for await (const chunk of stream) {
    content += new TextDecoder().decode(chunk);
  }
  console.log("Retrieved content from local IPFS:", content);
}

main().catch(console.error);
