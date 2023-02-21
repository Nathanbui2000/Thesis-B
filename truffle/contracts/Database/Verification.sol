// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Verification {
    string public name = "Verification";

    uint256 public verificationCount = 0;

    //Mapping Verification ID To Verification Object
    mapping(uint256 => VerificateionObject) public VerificateionMap;
    struct VerificateionObject {
        //Owner And Appraiser Data
        uint256 verificationID;
        uint256 antiqueID;
        address payable ownerAddress;
        uint256 ownerID;
        // uint256 personVerificationID;
        string appraiserUsername;
        //Antique Object Data
        uint256 ioTDeviceID;
        string estimateManufactureYears;
        string antiqueRareness;
        string antiqueAuthenticity;
        string antiqueRealness;
        //Time And Sender Data
        uint256 uploadTime;
        address payable uploader;
        //Need More Information: QR Code..
    }

    constructor() {
        name = "Verification";
    }

    event VerificationAdded(
        //Owner and Appraiser Data
        uint256 verificationID,
        address payable ownerAddress,
        uint256 ownerID,
        // uint256 personVerificationID,
        string appraiserUsername,
        //Antique Object Data
        uint256 ioTDeviceID,
        string estimateManufactureYears,
        string antiqueRareness,
        string antiqueAuthenticity,
        string antiqueRealness,
        //Time Data
        uint256 uploadTime,
        address payable uploader
    );
    event VerificationUpdated(
        //Owner and Appraiser Dataa
        uint256 verificationID,
        address payable newOwnerAddress,
        uint256 newOwnerID,
        // uint256 newPersonVerificationID,
        string appraiserUsername,
        //Antique Object Data
        uint256 newIoTDeviceID,
        string newEstimateManufactureYears,
        string newAntiqueRareness,
        string newAntiqueAuthenticity,
        string newAntiqueRealness,
        //Time Data
        uint256 newUploadTime,
        address payable newUploader
    );

    event SetAntiqueID(
        uint256 verificationID,
        uint256 antiqueID,
        uint256 newUploadTime,
        address payable uploader
    );

    //POST:  ADD Verification
    function AddVerification(
        //Owner and Appraiser Data
        address payable _ownerAddress,
        uint256 _ownerID,
        // uint256 _personVerificationID,
        string memory _appraiserUsername,
        //Antique Object Data
        uint256 _ioTDeviceID,
        string memory _estimateManufactureYears,
        string memory _antiqueRareness,
        string memory _antiqueAuthenticity,
        string memory _antiqueRealness,
        //Time Data
        address payable _uploader
    ) public returns (uint256) {
        require(_uploader != address(0));
        require(_ownerID > 0);
        require(bytes(_appraiserUsername).length > 0);
        require(_ioTDeviceID > 0);
        require(bytes(_estimateManufactureYears).length > 0);
        require(bytes(_antiqueRareness).length > 0);
        require(bytes(_antiqueAuthenticity).length > 0);
        require(bytes(_antiqueRealness).length > 0);

        //Make Default ID for Antique ID
        uint256 _antiqueDefaultID = 0;

        // Save Data To List
        verificationCount++;
        VerificateionMap[verificationCount] = VerificateionObject(
            //Owner and Appraiser Data
            verificationCount,
            _antiqueDefaultID,
            _ownerAddress,
            _ownerID,
            // _personVerificationID,
            _appraiserUsername,
            //Antique Object Data
            _ioTDeviceID,
            _estimateManufactureYears,
            _antiqueRareness,
            _antiqueAuthenticity,
            _antiqueRealness,
            //Time Data
            block.timestamp,
            _uploader
        );

        //Save To Blockchain
        emit VerificationAdded(
            //Owner And Appraiser Data
            verificationCount,
            _ownerAddress,
            _ownerID,
            // _personVerificationID,
            _appraiserUsername,
            //Antique Object Data
            _ioTDeviceID,
            _estimateManufactureYears,
            _antiqueRareness,
            _antiqueAuthenticity,
            _antiqueRealness,
            block.timestamp,
            _uploader
        );
        return verificationCount;
    }

    //PUT: UPDATE Verification
    function UpdateVerification(
        //Owner and Appraiser Data
        uint256 _verificationID,
        address payable _newOwnerAddress,
        uint256 _newOwnerID,
        // uint256 _newPersonVerificationID,
        string memory _appraiserUsername,
        //Antique Object Data
        uint256 _newIoTDeviceID,
        string memory _newEstimateManufactureYears,
        string memory _newAntiqueRareness,
        string memory _newAntiqueAuthenticity,
        string memory _newAntiqueRealness,
        //Time Data
        address payable _uploader
    ) public {
        require(_verificationID > 0 && _verificationID <= verificationCount);
        require(_uploader != address(0));
        require(bytes(_appraiserUsername).length > 0);
        VerificateionObject memory _verificationData = VerificateionMap[
            _verificationID
        ];
        address payable _currentOwnerAddress = _verificationData.ownerAddress;
        // require(bytes(_newEstimateManufactureYears).length > 0);
        // require(bytes(_newAntiqueRareness).length > 0);
        // require(bytes(_newAntiqueAuthenticity).length > 0);
        // require(bytes(_newAntiqueRealness).length > 0);
        //Update OwnerShip Information
        if (_currentOwnerAddress != _newOwnerAddress) {
            require(_newOwnerID != _verificationData.ownerID);
            _verificationData.ownerAddress = _newOwnerAddress;
            _verificationData.ownerID = _newOwnerID;
        }

        // //Update Uploaders
        // if (_newUploader != _verificationData.uploader)
        // {
        //     _verificationData.uploader = _newUploader;
        //     if (_newPersonVerificationID > 0 && _verificationData.personVerificationID != _newPersonVerificationID)
        //     {
        //         _verificationData.personVerificationID = _newPersonVerificationID;
        //     }
        // }

        // Update Antique Data
        if (_newIoTDeviceID != _verificationData.ioTDeviceID) {
            _verificationData.ioTDeviceID = _newIoTDeviceID;
        }

        if (
            !compare(
                _newEstimateManufactureYears,
                _verificationData.estimateManufactureYears
            )
        ) {
            _verificationData
                .estimateManufactureYears = _newEstimateManufactureYears;
        }

        if (!compare(_newAntiqueRareness, _verificationData.antiqueRareness)) {
            _verificationData.antiqueRareness = _newAntiqueRareness;
        }

        if (
            !compare(
                _newAntiqueAuthenticity,
                _verificationData.antiqueAuthenticity
            )
        ) {
            _verificationData.antiqueAuthenticity = _newAntiqueAuthenticity;
        }

        if (!compare(_newAntiqueRealness, _verificationData.antiqueRealness)) {
            _verificationData.antiqueRealness = _newAntiqueRealness;
        }

        _verificationData.uploadTime = block.timestamp;

        //Update Blockchain Data
        VerificateionMap[_verificationID] = _verificationData;
        emit VerificationUpdated(
            //Owner and Appraiser Data
            _verificationID,
            _newOwnerAddress,
            _newOwnerID,
            // _newPersonVerificationID,
            _appraiserUsername,
            //Antique Data
            _newIoTDeviceID,
            _newEstimateManufactureYears,
            _newAntiqueRareness,
            _newAntiqueAuthenticity,
            _newAntiqueRealness,
            //Data Time
            block.timestamp,
            _uploader
        );
    }

    //GET Verification By ID
    function GetVerificationByID(uint256 _verificationID)
        external
        view
        returns (VerificateionObject memory)
    {
        require(ValidateVerificationID(_verificationID) == true);
        return VerificateionMap[_verificationID];
    }

    //Validate Verification ID
    function ValidateVerificationID(uint256 _verificationID)
        public
        view
        returns (bool)
    {
        if (_verificationID < 0 || _verificationID > verificationCount)
            return false;
        VerificateionObject memory _verificationData = VerificateionMap[
            _verificationID
        ];
        if (_verificationData.ownerAddress == address(0)) return false;
        if (_verificationData.ownerID < 0) return false;
        return true;
    }

    //PUT: SET Antique ID For By Verification ID
    function SetAntiqueIDByVerificationID(
        uint256 _verificationID,
        uint256 _antiqueID,
        address payable _uploader
    ) public {
        require(ValidateVerificationID(_verificationID) == true);
        require(_antiqueID > 0);
        VerificateionObject memory _verificationData = VerificateionMap[
            _verificationID
        ];
        _verificationData.antiqueID = _antiqueID;
        VerificateionMap[_verificationID] = _verificationData;

        // Save Data to blockchain
        emit SetAntiqueID(
            _verificationID,
            _antiqueID,
            block.timestamp,
            _uploader
        );
    }

    function compare(string memory str1, string memory str2)
        public
        pure
        returns (bool)
    {
        if (bytes(str1).length != bytes(str2).length) {
            return false;
        }
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }
}
