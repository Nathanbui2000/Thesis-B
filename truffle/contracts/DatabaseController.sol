// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

// A. Documentation Contract
interface IDocumentation {
    struct DocumentationObject {
        uint256 documentationID;
        uint256 antiqueID;
        string filehash;
        uint256 fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint256 uploadTime;
        address payable uploader;
    }

    function AddDocumentation(
        string memory _fileHash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription,
        address payable _uploader
    ) external returns (uint256);

    function UpdateDocumentation(
        uint256 _documentationID,
        string memory _fileHash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription,
        address payable _uploader
    ) external;

    function ValidateDocumentationID(uint256 _documentationID)
        external
        returns (bool);

    function SetAntiqueIDByDocumentationID(
        uint256 _documentationID,
        uint256 _antiqueID,
        address payable _uploader
    ) external;

    function GetDocumentationByID(uint256 _documentationID)
        external
        returns (DocumentationObject memory);
}

//B. Verification Contract
interface IVerification {
    struct VerificateionObject {
        //Owner And Appraiser Data
        uint256 verificationID;
        uint256 antiqueID;
        address payable ownerAddress;
        uint256 ownerID;
        uint256 personVerificationID;

        //Antique Object Data
        uint256 ioTDeviceID;
        string estimateManufactureYears;
        string antiqueRareness;
        string antiqueAuthenticity;
        string antiqueRealness;

        //Time And Sender Data
        uint256 uploadTime;
        address payable uploader;
    }

    function AddVerification 
    (
        //Owner and Appraiser Data
        address payable _ownerAddress,
        uint256 _ownerID,
        uint256 _personVerificationID,
        
        //Antique Object Data
        uint256 _ioTDeviceID,
        string memory _estimateManufactureYears,
        string memory _antiqueRareness,
        string memory _antiqueAuthenticity,
        string memory _antiqueRealness,

        //Time Data    
        address payable _uploader
    )  external returns (uint256);

     function UpdateVerification 
    (
        //Owner and Appraiser Data
        uint256 _verificationID,
        address payable _newOwnerAddress,
        uint256 _newOwnerID,
        uint256 _newPersonVerificationID,
        
        //Antique Object Data
        uint256 _newIoTDeviceID,
        string memory _newEstimateManufactureYears,
        string memory _newAntiqueRareness,
        string memory _newAntiqueAuthenticity,
        string memory _newAntiqueRealness,

        //Time Data
        address payable _uploader    
    ) external;

    function ValidateVerificationID(uint256 _verificationID)
        external
        returns (bool);

    function SetAntiqueIDByVerificationID(
        uint256 _verificationID,
        uint256 _antiqueID,
        address payable _uploader
    ) external;

    function GetVerificationByID(uint256 _verificationID)
        external
        returns (VerificateionObject memory);
}

//C. Description Contract

interface IDescription {
    struct DescriptionObject {
        uint256 descriptionID;
        uint256 antiqueID;
        string materialCreated;
        uint256 antiqueHeight;
        uint256 antiqueLength;
        uint256 anitqueWidth;
        uint256 uploadTime;
        address payable uploader;
    }

     function  AddDescription
    (
        uint256 _antiqueObjectID,
        string memory _materialCreated,
        uint256 _antiqueHeight,
        uint256 _antiqueLength,
        uint256 _anitqueWidth,
        address payable _uploader
    ) external returns (uint256);

    function UpdateDescriptionMaterials 
    (
        uint256 _descriptionID,
        string memory _newMaterialCreated,
        uint256 _antiqueHeight,
        uint256 _antiqueLength,
        uint256 _anitqueWidth,
        address payable _uploader
    ) external;

    function ValidateDescriptionID(uint256 _descriptionID)
        external
        returns (bool);

    function SetAntiqueIDByDescriptionID(
        uint256 _descriptionID,
        uint256 _antiqueID,
        address payable _uploader
    ) external;

    function GetDescriptionByID(uint256 _descriptionID)
        external
        returns (DescriptionObject memory);
}

// D. Antique Contract
interface IAntique {
    struct AntiqueObject {
        uint256 antiqueID;
        uint256 documentationID;
        uint256 verificationID;
        uint256 descriptionID;
    }

    function AddAntique(
        uint256 _documentationID,
        uint256 _verificationID,
        uint256 _descriptionID,
        address payable _uploader
    ) external returns (uint256);

    function UpdateAntique(
        uint256 _antiqueID,
        uint256 _documentationID,
        uint256 _verificationID,
        uint256 _descriptionID,
        address payable _uploader
    ) external;

    function ValidateAntiqueID(uint256 _antiqueID) external returns (bool);

    function GetAntiqueByID(uint256 _antiqueID)
        external
        returns (AntiqueObject memory);
}

contract DatabaseController {
    string public name = "DatabaseController";
    address antiqueContractAddress;
    address descriptionContractAddress;
    address documentationContractAddress;
    address verificationContractAddress;
    uint256 antiqueCount = 0;

    IDocumentation documentationContract;
    IVerification verificationContract;
    IDescription descriptionContract;
    IAntique antiqueContract;

    function setAntiqueContractAddress(address _antiqueContractAddress)
        public
        payable
    {
        require(_antiqueContractAddress != address(0));
        antiqueContract = IAntique(_antiqueContractAddress);
    }

    function setDocumentationContractAddress (address _documentationContractAddress)
    public payable
    {
        require (_documentationContractAddress != address(0));
        documentationContract = IDocumentation(_documentationContractAddress);
    }

    function setVerificationContractAddress (address _verificationContractAddress)
    public payable
    {
        require (_verificationContractAddress != address(0));
        verificationContract = IVerification(_verificationContractAddress);
    }

    function setDescriptionContractAddress(address _descriptionContractAddress)
    public payable
    {
        require (_descriptionContractAddress != address(0));
        descriptionContract = IDescription(_descriptionContractAddress);
    }


    // constructor(
    //     address _antiqueContractAddress,
    //     address _descriptionContractAddress,
    //     address _documentationContractAddress,
    //     address _verificationContractAddress)
    // {
    //    //Check Parameters
    //     require(_antiqueContractAddress != address(0));
    //     require(_descriptionContractAddress != address(0));
    //     require(_documentationContractAddress != address(0));
    //     require(_verificationContractAddress != address(0));

    //     //Set the Address For Contracts
    //     documentationContract = IDocumentation(_documentationContractAddress);
    //     verificationContract = IVerification(_verificationContractAddress);
    //     descriptionContract = IDescription(_descriptionContractAddress);
    //     antiqueContract = IAntique(_antiqueContractAddress);

    //     name = "DatabaseController";
    // }

    //A. Verification Functions

    //1. Add Verification Function
    function AddVerification 
    (
        //Owner and Appraiser Data
        address payable _ownerAddress,
        uint256 _ownerID,
        uint256 _personVerificationID,
        
        //Antique Object Data
        uint256 _ioTDeviceID,
        string memory _estimateManufactureYears,
        string memory _antiqueRareness,
        string memory _antiqueAuthenticity,
        string memory _antiqueRealness,

        //Time Data    
        address payable _uploader
    )  external returns (uint256) {
        return
            verificationContract.AddVerification(
                payable(_ownerAddress),
                _ownerID,
                _personVerificationID,
                _ioTDeviceID,
                _estimateManufactureYears,
                _antiqueRareness,
                _antiqueAuthenticity,
                _antiqueRealness,
                _uploader
            );
    }

    //2. Update Verification Function
     function UpdateVerification 
    (
        //Owner and Appraiser Data
        uint256 _verificationID,
        address payable _newOwnerAddress,
        uint256 _newOwnerID,
        uint256 _newPersonVerificationID,
        
        //Antique Object Data
        uint256 _newIoTDeviceID,
        string memory _newEstimateManufactureYears,
        string memory _newAntiqueRareness,
        string memory _newAntiqueAuthenticity,
        string memory _newAntiqueRealness,

        //Time Data
        address payable _uploader    
    )
    external {
        verificationContract.UpdateVerification(
            _verificationID,
            _newOwnerAddress,
            _newOwnerID,
            _newPersonVerificationID,
            _newIoTDeviceID,
            _newEstimateManufactureYears,
            _newAntiqueRareness,
            _newAntiqueAuthenticity,
            _newAntiqueRealness,
            _uploader
        );
    }

    //3. Validate Verification ID
    function ValidateVerificationID(uint256 _verificationID)
        external
        returns (bool)
    {
        return verificationContract.ValidateVerificationID(_verificationID);
    }

    //4. Get Verification By ID
    function GetVerificationByID(uint256 _verificationID)
        external
        returns (IVerification.VerificateionObject memory)
    {
        return verificationContract.GetVerificationByID(_verificationID);
    }

    // B. Description Contract

    //1. Add Description Function
     function  AddDescription
    (
        uint256 _antiqueObjectID,
        string memory _materialCreated,
        uint256 _antiqueHeight,
        uint256 _antiqueLength,
        uint256 _anitqueWidth,
        address payable _uploader
    ) external returns (uint256) {
        return
            descriptionContract.AddDescription(
                _antiqueObjectID,
                _materialCreated,
                _antiqueHeight,
                _antiqueLength,
                _anitqueWidth,
                _uploader
            );
    }

    //2. Update Description Function
    function UpdateDescriptionMaterials 
    (
        uint256 _descriptionID,
        string memory _newMaterialCreated,
        uint256 _antiqueHeight,
        uint256 _antiqueLength,
        uint256 _anitqueWidth,
        address payable _uploader
    ) external {
        descriptionContract.UpdateDescriptionMaterials(
            _descriptionID,
            _newMaterialCreated,
            _antiqueHeight,
            _antiqueLength,
            _anitqueWidth,
            _uploader
        );
    }

    //3. Validate Description ID
    function ValidateDescriptionID(uint256 _descriptionID)
        external
        returns (bool)
    {
        return descriptionContract.ValidateDescriptionID(_descriptionID);
    }

    //4. Get Description By Description ID
    function GetDescriptionByID(uint256 _descriptionID)
        external
        returns (IDescription.DescriptionObject memory)
    {
        return descriptionContract.GetDescriptionByID(_descriptionID);
    }

    //C. Documentation Contract
    //Return Unit256 ID - ID for Created Documentation

    //1. Add Documentation
    function AddDocumentation(
        string memory _fileHash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription,
        address payable _uploader
    ) external returns (uint256) {
        return
            documentationContract.AddDocumentation(
                _fileHash,
                _fileSize,
                _fileType,
                _fileName,
                _fileDescription,
                _uploader
            );
    }

    //2. Update Documentation
    function UpdateDocumentation(
        uint256 _documentationID,
        string memory _fileHash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription,
        address payable _uploader
    ) external {
        documentationContract.UpdateDocumentation(
            _documentationID,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            _fileDescription,
            _uploader
        );
    }

    //3. Validate Documentation
    function ValidateDocumentationID(uint256 _documentationID)
        external
        returns (bool)
    {
        return documentationContract.ValidateDocumentationID(_documentationID);
    }

    //4. Get Documentation By ID
    function GetDocumentationByID(uint256 _documentationID)
        external
        returns (IDocumentation.DocumentationObject memory)
    {
        return documentationContract.GetDocumentationByID(_documentationID);
    }

    // D.Antique Contract
    // 1. Add Antique Object
    function AddAntique(
        uint256 _documentationID,
        uint256 _verificationID,
        uint256 _descriptionID,
        address payable _uploader
    ) external returns (uint256) {
        //Check Parameters
        require(
            documentationContract.ValidateDocumentationID(_documentationID) ==
                true
        );
        require(
            verificationContract.ValidateVerificationID(_verificationID) == true
        );
        require(
            descriptionContract.ValidateDescriptionID(_descriptionID) == true
        );

        // Create A New Antique Object
        uint256 _antiqueID = antiqueContract.AddAntique(
            _documentationID,
            _verificationID,
            _descriptionID,
            _uploader
        );

        // Set Antique ID In Verification Object, Documentation Object and Description Object
        documentationContract.SetAntiqueIDByDocumentationID(
            _documentationID,
            _antiqueID,
            _uploader
        );
        verificationContract.SetAntiqueIDByVerificationID(
            _verificationID,
            _antiqueID,
            _uploader
        );
        descriptionContract.SetAntiqueIDByDescriptionID(
            _descriptionID,
            _antiqueID,
            _uploader
        );
        return _antiqueID;
    }

    //2. Update Antique Object
    function UpdateAntique(
        uint256 _antiqueID,
        uint256 _documentationID,
        uint256 _verificationID,
        uint256 _descriptionID,
        address payable _uploader
    ) external {
        //Check Parameters

        require(
            documentationContract.ValidateDocumentationID(_documentationID) ==
                true
        );
        require(
            verificationContract.ValidateVerificationID(_verificationID) == true
        );
        require(
            descriptionContract.ValidateDescriptionID(_descriptionID) == true
        );

        //Update Antique Object Data
        require(ValidateAntiqueID(_antiqueID) == true);
        antiqueContract.UpdateAntique(
            _antiqueID,
            _documentationID,
            _verificationID,
            _descriptionID,
            _uploader
        );

        //Update Description, Verification and Documentation Data
        documentationContract.SetAntiqueIDByDocumentationID(
            _documentationID,
            _antiqueID,
            _uploader
        );
        verificationContract.SetAntiqueIDByVerificationID(
            _verificationID,
            _antiqueID,
            _uploader
        );
        descriptionContract.SetAntiqueIDByDescriptionID(
            _descriptionID,
            _antiqueID,
            _uploader
        );
    }

    //3. Validate Antique Object ID
    function ValidateAntiqueID(uint256 _antiqueID) public returns (bool) {
        if (antiqueContract.ValidateAntiqueID(_antiqueID) == true) {
            IAntique.AntiqueObject memory _antiqueData = antiqueContract
                .GetAntiqueByID(_antiqueID);
            if (
                descriptionContract.ValidateDescriptionID(
                    _antiqueData.descriptionID
                ) ==
                true &&
                verificationContract.ValidateVerificationID(
                    _antiqueData.verificationID
                ) ==
                true &&
                documentationContract.ValidateDocumentationID(
                    _antiqueData.documentationID
                ) ==
                true
            ) {
                return true;
            }
        }
        return false;
    }

    //4. Get Antique By ID
    function GetAntiqueByID(uint256 _antiqueID)
        public
        returns (IAntique.AntiqueObject memory)
    {
        return antiqueContract.GetAntiqueByID(_antiqueID);
    }
}
