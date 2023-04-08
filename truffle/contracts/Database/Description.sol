// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Description {
    string public name = "Description";
    uint256 public descriptionCount = 0;
    mapping(uint256 => DescriptionObject) private descriptionMap;

    constructor() {
        name = "Description";
    }

    struct DescriptionObject {
        uint256 descriptionID;
        uint256 antiqueID;
        //Antique Description Dimension
        string materialCreated;
        uint256 antiqueHeight;
        uint256 antiqueLength;
        uint256 anitqueWidth;
        //Description File Upload
        string filehash;
        uint256 fileSize;
        string fileType;
        string fileName;
        uint256 uploadTime;
        address payable uploader;
    }
    event addAntiqueDescription(
        uint256 descriptionID,
        uint256 antiqueObjectID,
        //Antique Description Dimension
        string materialCreated,
        uint256 antiqueHeight,
        uint256 antiqueLength,
        uint256 anitqueWidth,
        //Antique Description File Upload
        string filehash,
        uint256 fileSize,
        string fileType,
        string fileName,
        uint256 uploadTime,
        address payable uploader
    );

    event updateAntiqueDescription(
        uint256 documentationID,
        string newMaterialCreated,
        uint256 antiqueHeight,
        uint256 antiqueLength,
        uint256 anitqueWidth,
        uint256 uploadTime,
        address payable uploader
    );

    event updateAntiqueDescriptionFileUpload(
        uint256 descriptionID,
        string filehash,
        uint256 fileSize,
        string fileType,
        string fileName,
        uint256 uploadTime,
        address payable uploader
    );

    event setAntiqueIDByDescriptionID(
        uint256 descriptionID,
        uint256 antiqueID,
        uint256 uploadTime,
        address payable uploader
    );

    //POST: Description To Blockchain

    function AddDescription(
        uint256 _antiqueObjectID,
        string memory _materialCreated,
        uint256 _antiqueHeight,
        uint256 _antiqueLength,
        uint256 _anitqueWidth,
        string memory _filehash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        address payable _uploader
    ) public returns (uint256) {
        string memory antiqueMaterial;

        //Initialise Default Antique ID = -1
        uint256 _antiqueID = 0;

        require(_uploader != address(0));
        require(_antiqueHeight > 0);
        require(_antiqueLength > 0);
        require(_anitqueWidth > 0);
        require(bytes(_filehash).length > 0);
        require(bytes(_fileType).length > 0);
        require(bytes(_fileName).length > 0);
        require(_fileSize > 0);

        // require(_antiqueObjectID > 0);
        if (_antiqueObjectID > 0) {
            _antiqueID = _antiqueObjectID;
        }

        if (bytes(_materialCreated).length > 0) {
            antiqueMaterial = _materialCreated;
        }
        descriptionCount++;

        descriptionMap[descriptionCount] = DescriptionObject(
            descriptionCount,
            _antiqueID,
            antiqueMaterial,
            _antiqueHeight,
            _antiqueLength,
            _anitqueWidth,
            _filehash,
            _fileSize,
            _fileType,
            _fileName,
            block.timestamp,
            _uploader
        );
        emit addAntiqueDescription(
            descriptionCount,
            _antiqueID,
            antiqueMaterial,
            _antiqueHeight,
            _antiqueLength,
            _anitqueWidth,
            _filehash,
            _fileSize,
            _fileType,
            _fileName,
            block.timestamp,
            _uploader
        );
        return descriptionCount;
    }

    // PUT:  Description Materials In Blockchain
    function UpdateDescriptionMaterials(
        uint256 _descriptionID,
        string memory _newMaterialCreated,
        uint256 _antiqueHeight,
        uint256 _antiqueLength,
        uint256 _anitqueWidth,
        address payable _uploader
    ) public {
        require(_antiqueHeight > 0);
        require(_antiqueLength > 0);
        require(_anitqueWidth > 0);
        require(_descriptionID > 0 && _descriptionID <= descriptionCount);
        require(bytes(_newMaterialCreated).length > 0);
        require(_uploader != address(0));
        DescriptionObject memory _description = descriptionMap[_descriptionID];
        _description.materialCreated = _newMaterialCreated;
        _description.antiqueHeight = _antiqueHeight;
        _description.antiqueLength = _antiqueLength;
        _description.anitqueWidth = _anitqueWidth;
        descriptionMap[_descriptionID] = _description;
        emit updateAntiqueDescription(
            _descriptionID,
            _newMaterialCreated,
            _antiqueHeight,
            _antiqueLength,
            _anitqueWidth,
            block.timestamp,
            _uploader
        );
    }

    //PUT: Description Upload File In Blockchain
    function UpdateDescriptionUploadFile(
        uint256 _descriptionID,
        string memory _filehash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        uint256 _uploadTime,
        address payable _uploader
    ) public {
        require(_descriptionID > 0 && _descriptionID <= descriptionCount);
        require(_fileSize > 0);
        require(bytes(_filehash).length > 0);
        require(bytes(_fileType).length > 0);
        require(bytes(_fileName).length > 0);
        require(_uploader != address(0));
        DescriptionObject memory _description = descriptionMap[_descriptionID];
        _description.filehash = _filehash;
        _description.fileSize = _fileSize;
        _description.fileName = _fileName;
        _description.fileType = _fileType;
        _description.uploader = _uploader;
        _description.uploadTime = block.timestamp;
        descriptionMap[_descriptionID] = _description;
        emit updateAntiqueDescriptionFileUpload(
            _descriptionID,
            _filehash,
            _fileSize,
            _fileType,
            _fileName,
            _uploadTime,
            _uploader
        );
    }

    //GET Description By ID
    function GetDescriptionByID(
        uint256 _descriptionID
    ) external view returns (DescriptionObject memory) {
        require(ValidateDescriptionID(_descriptionID) == true);
        return descriptionMap[_descriptionID];
    }

    //PUT: Antique ID by Description ID
    function SetAntiqueIDByDescriptionID(
        uint256 _descriptionID,
        uint256 _newAntiqueID,
        address payable _uploader
    ) external {
        require(ValidateDescriptionID(_descriptionID) == true);
        DescriptionObject memory _descriptionData = descriptionMap[
            _descriptionID
        ];
        _descriptionData.antiqueID = _newAntiqueID;
        //Update To the Blockchain
        descriptionMap[_descriptionID] = _descriptionData;
        emit setAntiqueIDByDescriptionID(
            _descriptionID,
            _newAntiqueID,
            block.timestamp,
            _uploader
        );
    }

    //Validate Description ID
    function ValidateDescriptionID(
        uint _descriptionID
    ) public view returns (bool) {
        if (_descriptionID <= 0 || _descriptionID > descriptionCount) {
            return false;
        }

        // DescriptionObject memory _descriptionData = descriptionMap[_descriptionID];
        // if(_descriptionData.antiqueID <= 0)
        // {
        //     return false;
        // }
        return true;
    }
}
