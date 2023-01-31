// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Documentation {
    string public name = "Documentation";
    uint256 public documentationCount = 0;
    mapping(uint256 => DocumentationObject) public documentationMapp;

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
    event documentationUploaded(
        uint256 documentationID,
        string filehash,
        uint256 fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint256 uploadTime,
        address payable uploader
    );

    event documentationUpdated(
        uint256 documentationID,
        string filehash,
        uint256 fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint256 uploadTime,
        address payable uploader
    );

    event setAntiqueIDByDocumentationID(
        uint256 documentationID,
        uint256 antiqueID,
        uint256 uploadTime,
        address payable uploader
    );

    constructor() {
        name = "Documentation";
    }

    // POST: Add Documentation
    function AddDocumentation(
        string memory _fileHash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription,
        address payable _uploader
    ) public returns (uint256) {
        require(bytes(_fileHash).length > 0);
        require(bytes(_fileType).length > 0);
        require(bytes(_fileName).length > 0);
        require(bytes(_fileDescription).length > 0);
        require(_uploader != address(0));
        require(_fileSize > 0);

        documentationCount++;

        //Set Default Antique ID
        uint256 _antiqueDefaultID = 0;

        // add file to the list
        documentationMapp[documentationCount] = DocumentationObject(
            documentationCount,
            _antiqueDefaultID,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            _fileDescription,
            block.timestamp,
            _uploader
        );

        //Trigger the event
        emit documentationUploaded(
            documentationCount,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            _fileDescription,
            block.timestamp,
            _uploader
        );
        return documentationCount;
    }

    //PUT: Update Documentation
    function UpdateDocumentation(
        uint256 _documentationID,
        string memory _fileHash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription,
        address payable _uploader
    ) public {
        require(_documentationID > 0 && _documentationID <= documentationCount);
        require(_uploader != address(0));
        //Get File From Blockchain and Update Data
        DocumentationObject memory _documentationData = documentationMapp[
            _documentationID
        ];
        if (bytes(_fileHash).length > 0) {
            _documentationData.filehash = _fileHash;
        }
        if (bytes(_fileType).length > 0) {
            _documentationData.fileType = _fileType;
        }
        if (bytes(_fileName).length > 0) {
            _documentationData.fileName = _fileName;
        }
        if (bytes(_fileDescription).length > 0) {
            _documentationData.fileDescription = _fileDescription;
        }

        if (_fileSize > 0) {
            _documentationData.fileSize = _fileSize;
        }

        //Update Blockchain Data
        documentationMapp[_documentationID] = _documentationData;
        emit documentationUpdated(
            _documentationID,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            _fileDescription,
            block.timestamp,
            _uploader
        );
    }

    //GET Documentation By ID
    function GetDocumentationByID(uint256 _documentationID)
        external
        view
        returns (DocumentationObject memory)
    {
        require(ValidateDocumentationID(_documentationID) == true);
        return documentationMapp[_documentationID];
    }

    //Validate ID
    function ValidateDocumentationID(uint256 _documentationID)
        public
        view
        returns (bool)
    {
        if (_documentationID < 0 || _documentationID > documentationCount) {
            return false;
        }
        DocumentationObject memory _documentationData = documentationMapp[
            _documentationID
        ];
        if (bytes(_documentationData.filehash).length < 0) {
            return false;
        }
        if (bytes(_documentationData.fileName).length < 0) {
            return false;
        }
        return true;
    }

    //PUT: Set Antique ID By Documentation ID
    function SetAntiqueIDByDocumentationID(
        uint256 _documentationID,
        uint256 _antiqueID,
        address payable _uploader
    ) public {
        require(ValidateDocumentationID(_documentationID) == true);
        require(_antiqueID > 0);
        require(_uploader != address(0));

        //Update Antique ID by Documentation ID
        DocumentationObject memory _documentationData = documentationMapp[
            _documentationID
        ];
        _documentationData.antiqueID = _antiqueID;

        // Add Data To Blockchain
        emit setAntiqueIDByDocumentationID(
            _documentationID,
            _antiqueID,
            block.timestamp,
            _uploader
        );
    }
}
