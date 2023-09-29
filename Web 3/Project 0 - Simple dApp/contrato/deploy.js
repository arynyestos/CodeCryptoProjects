const {ethers, JsonRpcProvider, Wallet} = require ('ethers');
const fs = require('fs');

const httpProvider = new JsonRpcProvider("http://localhost:8546");
// const abi = JSON.parse(fs.readFileSync("./out/Contador_sol_Contador.abi").toString()); //solcjs
// const bin = fs.readFileSync("./out/Contador_sol_Contador.bin").toString(); 
const abi = JSON.parse(fs.readFileSync("./out/Contador.abi").toString()); //solc
const bin = fs.readFileSync("./out/Contador.bin").toString();

// console.log(bin,abi)

const walletJsonString = `{
    "address": "61086886135542ad78a4d026278ab8a310de6b17",
    "crypto": {
        "cipher": "aes-128-ctr",
        "ciphertext": "76d3ed93c7543690ed00863294c03f071fb0f23b29081bf463835f0f8915e5b1",
        "cipherparams": {
            "iv": "5d39d2853a939502924835a0b49db458"
        },
        "kdf": "scrypt",
        "kdfparams": {
            "dklen": 32,
            "n": 262144,
            "p": 1,
            "r": 8,
            "salt": "96cb5c37959dca167b4a08023a5c0e1421b957001b352a0b7f66aac08f49ec2a"
        },
        "mac": "96d08c62da9297f2f870f0ce08af6b534b04fae68a2623922fb340d074d6e27c"
    },
    "id": "56843435-dca6-4342-80d0-03518acde81d",
    "version": 3
}`

async function main() {
    let wallet = await Wallet.fromEncryptedJson(walletJsonString, "123456");
    wallet = wallet.connect(httpProvider);
    const factory = new ethers.ContractFactory(abi, bin, wallet);
    const contrato = await factory.deploy();
    await contrato.waitForDeployment();

    fs.writeFileSync("./contractAdress", await contrato.getAddress());

    console.log(await contrato.getAddress())
}

main();