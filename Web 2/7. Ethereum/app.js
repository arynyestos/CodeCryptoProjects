const Web3 = require('Web3')

const web3 = new Web3("http://localhost:8548") // Nos conectamos al nodo 3 (como hacíamos con el proveedor Infura)

async function printUltimoBloque() {
    const bloque = await web3.eth.getBlockNumber()
    console.log(bloque)
    return bloque
}

var tx = { 
    from: "0x90678c73b569fc3c4692de5db7ba0e843bb9fabc", 
    to: "0xB36Fb73bFA836a928dAfA8131095b4e7e598b8a7", 
    value: web3.utils.toWei('5', "ether") 
}

async function enviarEther(){
    const txResultado = await web3.eth.personal.sendTransaction(tx, "123456")
    console.log(txResultado)
}

async function printBloqueInfo(){
    const ultBloque = await web3.eth.getBlockNumber()
    const bloqueInfo = await web3.eth.getBlock(ultBloque)
    console.log(bloqueInfo)
}

async function printTxInfo(){
    const ultBloque = await web3.eth.getBlockNumber()
    const bloqueInfo = await web3.eth.getBlock(ultBloque)
    const TxInfo = await web3.eth.getTransaction(bloqueInfo.transactions[0])
    console.log(TxInfo)
}

async function printSaldo(){
    const ultBloque = await web3.eth.getBlockNumber()
    const bloqueInfo = await web3.eth.getBlock(ultBloque)
    const TxInfo = await web3.eth.getTransaction(bloqueInfo.transactions[0])
    const saldo =  web3.utils.fromWei(await web3.eth.getBalance(TxInfo.from), 'ether');
    const saldo2 =  await web3.eth.getBalance(TxInfo.from) / 1e18
    console.log(saldo)
    console.log(saldo2)
}

enviarEther()
printUltimoBloque()
printBloqueInfo()
printTxInfo()
printSaldo()