let provider;
let signer;
let contract;

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // after deploy
const abi = [
  "function mint() public payable",
  "function totalSupply() view returns (uint256)"
];

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    contract = new ethers.Contract(contractAddress, abi, signer);

    document.getElementById("status").innerText = "Wallet Connected";
  } else {
    alert("Install MetaMask!");
  }
}

async function mintNFT() {
  try {
    const tx = await contract.mint({
      value: ethers.utils.parseEther("0.01") // mint price
    });

    document.getElementById("status").innerText = "Minting...";
    await tx.wait();

    document.getElementById("status").innerText = "NFT Minted!";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Mint Failed";
  }
}
