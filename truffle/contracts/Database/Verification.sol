// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract Verification {
    string public name = 'Verification';

    uint256 public verificationCount = 0;

    //Mapping Verification ID To Verification Object
    mapping (uint256 => VerificateionObject) public VerificateionMap;
    struct VerificateionObject  {
        uint256 verificationID;
        uint256 antiqueID;
        address payable ownerAddress;
        uint256 ownerID;
        uint256 personVerificationID;
        uint256 ioTDeviceID;
        uint256 uploadTime;
        address payable uploader;
        //Need More Information: QR Code..
    }

    constructor() {
        name = "Verification";
    }

    event VerificationAdded 
    (
        uint256 verificationID,
        address payable ownerAddress,
        uint256 ownerID,
        uint256 personVerificationID,
        uint256 ioTDeviceID,
        uint256 uploadTime,
        address payable uploader
    ); 
    event VerificationUpdated 
    (
        uint256 verificationID,
        address payable newOwnerAddress,
        uint256 newOwnerID,
        uint256 newPersonVerificationID,
        uint256 newIoTDeviceID,
        uint256 newUploadTime,
        address payable newUploader
    );

    event SetAntiqueID
    (
        uint256 verificationID,
        uint256 antiqueID,
        uint256 newUploadTime,
        address payable uploader
    );

    //POST:  ADD Verification
    function AddVerification 
    (
        address payable _ownerAddress,
        uint256 _ownerID,
        uint256 _personVerificationID,
        uint256 _ioTDeviceID,
        address payable _uploader
    ) 
    public returns (uint256)
    {
        require(_uploader != address(0));
        require(_ownerID > 0);
        require(_personVerificationID > 0);
        require(_ioTDeviceID  > 0);

        //Make Default ID for Antique ID
        uint256 _antiqueDefaultID = 0;

        // Save Data To List 
        verificationCount ++;
        VerificateionMap[verificationCount] = VerificateionObject 
        (
            verificationCount,
            _antiqueDefaultID,
            _ownerAddress,
            _ownerID,
            _personVerificationID,
            _ioTDeviceID,
            block.timestamp,
            _uploader
        );

        //Save To Blockchain
        emit VerificationAdded 
        (
            verificationCount,
            _ownerAddress,
            _ownerID,
            _personVerificationID,
            _ioTDeviceID,
            block.timestamp,
            _uploader
        );
        return verificationCount;
    }

    //PUT: UPDATE Verification
    function UpdateVerification 
    (
        uint256 _verificationID,
        address payable _newOwnerAddress,
        uint256 _newOwnerID,
        uint256 _newPersonVerificationID,
        uint256 _newIoTDeviceID,
        address payable _uploader    
    )
    public 
    {
        require(_verificationID > 0 && _verificationID <= verificationCount);
        require(_uploader != address(0));
        VerificateionObject memory _verificationData = VerificateionMap[_verificationID];
        address payable _currentOwnerAddress = _verificationData.ownerAddress;

        //Update OwnerShip Information
        if (_currentOwnerAddress != _newOwnerAddress)
        {
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
        
        if(_newIoTDeviceID != _verificationData.ioTDeviceID)
        {
            _verificationData.ioTDeviceID = _newIoTDeviceID;
        }

        _verificationData.uploadTime =  block.timestamp;

        //Update Blockchain Data
        VerificateionMap[_verificationID] = _verificationData;
        emit VerificationUpdated 
        (
            _verificationID,
            _newOwnerAddress,
            _newOwnerID,
            _newPersonVerificationID,
            _newIoTDeviceID,
            block.timestamp,
            _uploader
        );
    }
    
    //GET Verification By ID
    function GetVerificationByID
    (uint256 _verificationID)
    external view returns (VerificateionObject memory)
    {
        require (ValidateVerificationID(_verificationID) == true);
        return VerificateionMap[_verificationID];
    }

    //Validate Verification ID 
    function ValidateVerificationID 
    (uint _verificationID)
    public view returns (bool)
    {
        if(_verificationID < 0 || _verificationID > verificationCount)
            return false;
        VerificateionObject memory _verificationData = VerificateionMap [_verificationID];
        if(_verificationData.ownerAddress == address(0))
            return false;
        if (_verificationData.ownerID < 0)
            return false;
        return true;
    }

    //PUT: SET Antique ID For By Verification ID
    function SetAntiqueIDByVerificationID
    (
        uint256 _verificationID,
        uint256 _antiqueID,
        address payable _uploader
    )
    public
    {
        require(ValidateVerificationID(_verificationID) == true);
        require(_antiqueID > 0);
        VerificateionObject memory _verificationData = VerificateionMap[_verificationID];
        _verificationData.antiqueID = _antiqueID;
        VerificateionMap[_verificationID] = _verificationData;
         
        // Save Data to blockchain
        emit SetAntiqueID 
        (
            _verificationID,
            _antiqueID,
            block.timestamp,
            _uploader
        );
    }
}
