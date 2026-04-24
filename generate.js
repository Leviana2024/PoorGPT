const fs = require("fs");
const layers = require("./config");

const TOTAL_NFTS = 100;
const outputDir = "./output/metadata";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Weighted random function
function pickTrait(traits) {
  const totalWeight = traits.reduce((sum, t) => sum + t.weight, 0);
  let rand = Math.random() * totalWeight;

  for (let trait of traits) {
    if (rand < trait.weight) return trait.value;
    rand -= trait.weight;
  }
}

// Prevent duplicates
const dnaSet = new Set();

function createDNA(attributes) {
  return attributes.map(a => a.value).join("-");
}

let count = 1;

while (count <= TOTAL_NFTS) {
  let attributes = [];

  for (let layer of layers) {
    const value = pickTrait(layer.traits);
    attributes.push({
      trait_type: layer.name,
      value: value,
    });
  }

  const dna = createDNA(attributes);

  if (dnaSet.has(dna)) continue;

  dnaSet.add(dna);

  const metadata = {
    name: `PoorGPT #${count}`,
    description: "From nothing to genius. A journey powered by AI and grit.",
    image: `https://raw.githubusercontent.com/YOUR_USERNAME/poor-gpt-nft/main/images/${count}.png`,
    attributes: attributes,
  };

  fs.writeFileSync(
    `${outputDir}/${count}.json`,
    JSON.stringify(metadata, null, 2)
  );

  console.log(`Generated NFT #${count}`);
  count++;
}

console.log("✅ Done generating NFTs!");
