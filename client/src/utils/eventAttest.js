import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import * as ethers from "ethers";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY; 
const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_INFURA_URL
);
const schemaUID =
  "0xe036b4f4346656abc9e7b35eb9d50bd5d1be2dbb9b8c26a2130123e02f4ab1e1";
const wallet = new ethers.Wallet(privateKey, provider);

async function eventAttestation(event_title, createdAt) {
  const eas = new EAS(EASContractAddress);
  eas.connect(wallet);
  const schemaEncoder = new SchemaEncoder(
    "string event_title,string createdAt"
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "event_title", value: event_title, type: "string" },
    { name: "createdAt", value: createdAt, type: "string" },
  ]);
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0x6b7607577C44E3ba9345Bec9b936e1190d88035B",
      expirationTime: 0,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });
  const newAttestationUID = await tx.wait();
  return newAttestationUID;
}

export default eventAttestation;

// recipient: "0x6b7607577C44E3ba9345Bec9b936e1190d88035B",
