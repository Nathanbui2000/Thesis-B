import Web3 from "web3";
import AntiqueJSON from "../contracts/Antique.json";
import DatabaseControllerJSON from '../contracts/DatabaseController.json';
import DocumentationJSON from '../contracts/Documentation.json';
import VerificationJSON from '../contracts/Verification.json';
import DescriptionJSON from '../contracts/Description.json';
import React from 'react';
function databaseTruffle ()
{
    var databaseControllerContract;
    const loadBlockchainData = async () =>
    {
      // var antiqueContract;
        var antiqueContractAddress;
        // var descriptionContract;
        var descriptionContractAddress;
        // var verificationContract;
        var verificationContractAddress;
        var documentationContractAddress;
        // var documentationContract;
        // var databaseControllerContract;
        var databasecontrollerContractAddress;


        const blockchain = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
        const networkID = await blockchain.eth.net.getId();

        //SET: Antique Contract Address and Contract Information
        // const antiqueContractAbi = AntiqueJSON.abi;
        const antiqueContractNetworkData = AntiqueJSON.networks[networkID];
        if (antiqueContractNetworkData) 
        {
        antiqueContractAddress = AntiqueJSON.networks[networkID].address;
        // antiqueContract = new blockchain.eth.Contract(antiqueContractAbi,antiqueContractAddress);
        }

        //SET: Description Contract Address and Contract Information
        // const descriptionContractAbi = DescriptionJSON.abi;
        const descriptionContracNetworkData = DescriptionJSON.networks[networkID];
        if(descriptionContracNetworkData)
        {
        descriptionContractAddress = DescriptionJSON.networks[networkID].address;
        // descriptionContract = new blockchain.eth.Contract(descriptionContractAbi,descriptionContractAddress);

        }
        
      //SET: Verification Contract Address and Contract Information
      // const verificationContractAbi = VerificationJSON.abi;
        const verificationContractNetworkData = VerificationJSON.networks[networkID];
        if (verificationContractNetworkData)
        {
        verificationContractAddress = VerificationJSON.networks[networkID].address;
        // verificationContract = new blockchain.eth.Contract(verificationContractAbi, verificationContractAddress);
        }

        //SET: Documentation Contract Address and Contract Information 
        // const documentationContractAbi = DocumentationJSON.abi;
        const documentationContractNetworkData = DocumentationJSON.networks[networkID];
        if(documentationContractNetworkData)
        {
        documentationContractAddress = DocumentationJSON.networks[networkID].address;
        // documentationContract = new blockchain.eth.Contract(documentationContractAbi,documentationContractAddress);
        }

        //SET: DatabaseController Contract
        const databaseControllerContractAbi = DatabaseControllerJSON.abi;;
        const databaseControllerContractNetworkData = DatabaseControllerJSON.networks[networkID];
        if(databaseControllerContractNetworkData) 
        {
        databasecontrollerContractAddress = DatabaseControllerJSON.networks[networkID].address;
        databaseControllerContract = new blockchain.eth.Contract(databaseControllerContractAbi,databasecontrollerContractAddress);
        }
        // const testAddress = "0x9E81BF84bf7e23FB03D7Ac1f00eC88cE0f8f1644";
        const newAccount = "0x9E81BF84bf7e23FB03D7Ac1f00eC88cE0f8f1644";

        //Set Address For DatabaseControoler Contract
        await databaseControllerContract.methods.setAntiqueContractAddress(antiqueContractAddress).send({from: newAccount, gas:672197 });
        await databaseControllerContract.methods.setDocumentationContractAddress(documentationContractAddress).send({from: newAccount, gas:672197 });
        await databaseControllerContract.methods.setVerificationContractAddress(verificationContractAddress).send({from: newAccount, gas:672197 });
        await databaseControllerContract.methods.setDescriptionContractAddress(descriptionContractAddress).send({from: newAccount, gas:672197 });

        //!Create New Account 

        // let newAccount = await blockchain.eth.personal.newAccount("Password");
        // blockchain.eth.personal.unlockAccount(newAccount,"Password",20000);
        // var sendID = await blockchain.eth.sendTransaction({
        //   from: testAddress,
        //   to: newAccount , 
        //   value : blockchain.utils.toWei('3','Ether')});

      // console.log("Account After Send: "+ await blockchain.eth.getBalance(newAccount) )

        const descriptionID1 = await databaseControllerContract.methods.AddDescription(0,"Materials Test",newAccount).call();
        console.log( "Description ID After 1st Call Before Send = " + descriptionID1);

        const descriptionID = await databaseControllerContract.methods.AddDescription(0,"Materials Test",newAccount)
        .send
        (
        {
            from: newAccount,
            gas:672197
        }
        );
        
        const descriptionID2 = await databaseControllerContract.methods.AddDescription(100000,"HAHAH",newAccount).call();
        console.log( "Description ID After 2nd Call After 1st Send =  " + descriptionID2);
        const descriptionID3 = await databaseControllerContract.methods.AddDescription(1,"Test 2",newAccount).call();
        console.log( "Description ID After 3rd Call After 1st Send = " + descriptionID3);

        const descriptionID4 = await databaseControllerContract.methods.AddDescription(0,"Materials Test 2",newAccount)
        .send
        (
        {
            from: newAccount,
            gas:672197
        }
        )

        console.log( "Description ID Before 4rd Call After 2nd Send = " + descriptionID4);

        const descriptionID5 = await databaseControllerContract.methods.AddDescription(0,"Test",newAccount).call();
        console.log( "Description ID After 4rd Call After 2nd Send = " + descriptionID5);
        console.log( "------------------------Retrieved description----------------------");
        const currentAccount = await blockchain.eth.getAccounts();

        console.log( "Current User Account:");
        console.log(currentAccount);

        var description = await databaseControllerContract.methods.GetDescriptionByID(descriptionID3).call();
        console.log( "Description Object");
        console.log(description);
    }
    const getDatabaseControllerContract = () => 
    {
        return this.databaseControllerContract;
    }
}
export default databaseTruffle;
