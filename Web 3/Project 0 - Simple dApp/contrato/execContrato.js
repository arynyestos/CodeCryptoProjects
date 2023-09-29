const {ethers, JsonRpcProvider, Contract, Wallet} = require('ethers');
const fs = require('fs');

const httpProvider = new JsonRpcProvider("http://localhost:8546");
const abi = JSON.parse(fs.readFileSync("./out/Contador.abi").toString());
const contractAddress = fs.readFileSync("./contractAddress").toString();
const walletJsonString = fs.readFileSync("../nodo/data/keystore/UTC--2023-09-26T17-25-59.572529800Z--61086886135542ad78a4d026278ab8a310de6b17").toString();

async function main() {
    let wallet = await Wallet.fromEncryptedJson(walletJsonString, "123456");
    wallet = await wallet.connect(httpProvider);
    const contract = new Contract(contractAddress, abi, wallet);

    let valorContador = await contract.contador();
    console.log(valorContador);

    let tx = await contract.inc();
    tx = await contract.inc({nonce:tx.nonce + 1});
    // console.log(tx)

    valorContador = await contract.contador();
    console.log(valorContador);
    
    tx = await contract.dec({nonce:tx.nonce + 1});
    valorContador = await contract.contador();
    console.log(valorContador);
}

main();