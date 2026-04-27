const contractAddress = "PASTE_YOUR_CONTRACT_ADDRESS";

const abi = [
  "function mint() public payable",
  "function totalSupply() view returns (uint256)"
];

let provider, signer, contract;

async function connectWallet() {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  contract = new ethers.Contract(contractAddress, abi, signer);

  document.getElementById("status").innerText = "✅ Connected";
  loadSupply();
}

async function mintNFT() {
  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  try {
    const tx = await contract.mint({
      value: ethers.utils.parseEther("0.01")
    });

    document.getElementById("status").innerText = "⏳ Minting...";
    await tx.wait();

    document.getElementById("status").innerText = "🎉 Mint Success!";
    loadSupply();

  } catch (err) {
    console.log(err);
    document.getElementById("status").innerText = "❌ Failed";
  }
}

async function loadSupply() {
  if (!contract) return;

  const supply = await contract.totalSupply();
  document.getElementById("supply").innerText = "Minted: " + supply;
}
