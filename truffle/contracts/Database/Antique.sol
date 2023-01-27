// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Antique {
    string public name = "Antique";
    uint256 public antiqueCount = 0;

    //Antique List
    mapping(uint256 => AntiqueObject) public antiqueMap;

    //Mapping Antique ID ==> Documentation ID
    //Example: Antique ID = 1 => Documentation ID =
    // mapping(uint256 => uint256) public antiqueDocumentationMap;
    // mapping(uint256 => uint256) public antiqueDescriptionsMap;
    // mapping(uint256 => uint256) public antiqueVerificationMap;

    constructor() {
        name = "Antique";
    }

    struct AntiqueObject {
        uint256 antiqueID;
        uint256 documentationID;
        uint256 verificationID;
        uint256 descriptionID;
    }

    event AntiqueAdded(
        uint256 antiqueID,
        uint256 documentationID,
        uint256 verificationID,
        uint256 descriptionID,
        address payable uploader
    );
    event AntiqueUpdate(
        uint256 antiqueID,
        uint256 documentationID,
        uint256 verificationID,
        uint256 descriptionID,
        address payable updater
    );

    //POST: ADD Antique
    function AddAntique(
        uint256 _documentationID,
        uint256 _verificationID,
        uint256 _descriptionID,
        address payable _uploader
    ) public returns (uint256) {
        //Check Parameter
        require(_documentationID > 0);
        require(_verificationID > 0);
        require(_descriptionID > 0);
        require(_uploader != address(0));

        //Update Blockchain Data
        antiqueCount++;
        AntiqueObject memory _antiqueDataCreated = AntiqueObject(
            antiqueCount,
            _documentationID,
            _verificationID,
            _descriptionID
        );
        // // console.log(_antiqueDataCreated);
        antiqueMap[antiqueCount] = _antiqueDataCreated;
        // antiqueDocumentationMap[antiqueCount] = _documentationID;
        // antiqueDescriptionsMap[antiqueCount] = _descriptionID;
        // antiqueVerificationMap[antiqueCount] = _verificationID;

        emit AntiqueAdded(
            antiqueCount,
            _documentationID,
            _verificationID,
            _descriptionID,
            _uploader
        );
        return antiqueCount;
    }

    //PUT: Update Antique Object
    function UpdateAntique(
        uint256 _antiqueID,
        uint256 _documentationID,
        uint256 _verificationID,
        uint256 _descriptionID,
        address payable _uploader
    ) public {
        require(_antiqueID > 0 && _antiqueID <= antiqueCount);
        //Validate Antique ID
        require(ValidateAntiqueID(_antiqueID) == true);
        require(_uploader != address(0));
        AntiqueObject memory _antiqueData = antiqueMap[_antiqueID];
        if (_antiqueData.documentationID != _documentationID) {
            _antiqueData.documentationID = _documentationID;
        }
        if (_antiqueData.verificationID != _verificationID) {
            _antiqueData.verificationID = _verificationID;
        }
        if (_antiqueData.descriptionID != _descriptionID) {
            _antiqueData.descriptionID = _descriptionID;
        }

        //Update To Blockchain
        antiqueMap[_antiqueID] = _antiqueData;
        emit AntiqueUpdate(
            _antiqueID,
            _documentationID,
            _verificationID,
            _descriptionID,
            _uploader
        );
    }

    //GET Antique Object By ID
    function GetAntiqueByID(uint256 _antiqueID)
        external
        view
        returns (AntiqueObject memory)
    {
        require(ValidateAntiqueID(_antiqueID) == true);
        return antiqueMap[_antiqueID];
    }

    //Validate Antique Object
    function ValidateAntiqueID(uint256 _antiqueID) public view returns (bool) {
        if (_antiqueID <= 0 || _antiqueID > antiqueCount) 
            return false;
        // Valdiate Documentation ID, Description ID and Verification ID
        return true;
    }
}
