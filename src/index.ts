import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import {fromHex} from '@cosmjs/encoding';


(async()=>{

    console.log("=============================Create Wallet With Private Key=============================");

    let privateKey = "66AF3FC220C190BF055886A13A1F7EF986C381ADEF469998D3C554C00EC7A0A2"
    const wallet_priv = await DirectSecp256k1Wallet.fromKey(fromHex(privateKey), 'sei')
    console.log("wallet", wallet_priv)

    let [account_priv] = await wallet_priv.getAccounts()
    console.log(account_priv.address)
    

    console.log("=============================Create Wallet on Autonomy using mnemonic=============================");

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
