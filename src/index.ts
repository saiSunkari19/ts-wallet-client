import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';


(async()=>{

console.log("=============================Create Wallet on Autonomy=============================");

// Password to Encrypt Wallet
let password="rgukt123"


let wallet = await DirectSecp256k1HdWallet.generate(24, {prefix: "autonomy"});
let [account] = await wallet.getAccounts()

// Account address
console.log(account.address);
// Mnemonic
console.log(wallet.mnemonic);

// Seriealize wallet : Keystore
let serializeWallet = await wallet.serialize(password)

// Download KeyStore and store mnemonic
console.log(serializeWallet);

console.log("===================Import Wallet using KeyStore============================");

// Upload Wallet

let deseralizeWallet = await DirectSecp256k1HdWallet.deserialize(serializeWallet, password)
console.log(deseralizeWallet);

let [deaccount] = await deseralizeWallet.getAccounts()

// Account address
console.log(deaccount.address);
// Mnemonic
console.log(deseralizeWallet.mnemonic);


})();
