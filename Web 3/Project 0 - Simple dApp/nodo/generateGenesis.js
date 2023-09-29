const fs  = require('fs');

function generateGenesis(NETWORK_CHAINID, ACCOUNT, BALANCE, ALLOC_ACCOUNTS, NETWORK_DIR){
    const timestamp = Math.round(((new Date()).getTime() / 1000)).toString(16);

    //leemos la plantilla del génesis
    let genesis = JSON.parse(fs.readFileSync('genesisbase.json').toString());

    genesis.timestamp = `0x${timestamp}`
    genesis.config.chainId = NETWORK_CHAINID;
    genesis.extraData = `0x${'0'.repeat(64)}${ACCOUNT}${'0'.repeat(130)}`; //32 bytes of zeroes before and 65 after the account

    genesis.alloc = ALLOC_ACCOUNTS.reduce((acc, item) => { //generate an alloc object with the ETH allocations for all the accounts
        acc[item] = {balance: BALANCE}
        return acc
    }, {})

    fs.writeFileSync(`${NETWORK_DIR}/genesis.json`, JSON.stringify(genesis));
}

const BALANCE = "0x200000000000000000000000000000000000000000000000000000000000000"
generateGenesis(3333, 
    "61086886135542ad78a4d026278ab8a310de6b17", BALANCE, 
    ["0x61086886135542ad78a4d026278ab8a310de6b17",
     "0xad6DB617Aa4d05c7041A6507E4531ED09a7956f3",
     "0xe21A9302f668F25E78836d834C6E0906A579Ac40", 
     "0x302851bF25a2b2225B8d661C23AA5C48514da7fB",
     "0x31e0FacEa072EE621f22971DF5bAE3a1317E41A4"], ".")