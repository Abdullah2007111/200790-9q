// Web3 initialization
let web3;
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request wallet connection
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            document.getElementById('connectWallet').innerText = 'محفظتك متصلة';
            updateBalance();
        } catch (error) {
            console.error('Error connecting wallet: ', error);
        }
    } else {
        alert('محفظة Ethereum غير موجودة. يرجى تثبيت MetaMask');
    }
}

// تحديث الرصيد من $FUNNY
async function updateBalance() {
    // استبدل هذا بعنوان عقد $FUNNY الخاص بك
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [
        // ABI الخاص بعقد $FUNNY الخاص بك
        {
            "constant": true,
            "inputs": [{ "name": "account", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
    const contract = new web3.eth.Contract(abi, contractAddress);
    const balance = await contract.methods.balanceOf(userAccount).call();
    
    document.getElementById('walletBalance').innerText = web3.utils.fromWei(balance, 'ether') + ' $FUNNY';
}

// الاتصال بالمحفظة
document.getElementById('connectWallet').addEventListener('click', connectWallet);