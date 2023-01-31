// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Description {
    string public name = 'Documentation';
    uint256 public descriptionCount = 0;
    mapping (uint256 => DescriptionObject) private descriptionMap;
    constructor() {
        name = "Documentation";
    }

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
    event addAntiqueDescription (
        uint256 descriptionID,
        uint256 antiqueObjectID,
        string materialCreated,
        uint256 antiqueHeight,
        uint256 antiqueLength,
        uint256 anitqueWidth,
        uint256 uploadTime,
        address payable uploader
    );
    event updateAntiqueDescription (
        uint256 documentationID,
        string newMaterialCreated,
        uint256 antiqueHeight,
        uint256 antiqueLength,
        uint256 anitqueWidth,
        uint256 uploadTime,
        address payable uploader
    );

    event setAntiqueIDByDescriptionID (
        uint256 descriptionID,
        uint256 antiqueID,
        uint256 uploadTime,
        address payable uploader
    );

    //POST: Description To Blockchain

    function  AddDescription
    (
        uint256 _antiqueObjectID,
        string memory _materialCreated,
        uint256 _antiqueHeight,
        uint256 _antiqueLength,
        uint256 _anitqueWidth,
        address payable _uploader
    )
    public returns (uint256)
    {
        string memory antiqueMaterial;

        //Initialise Default Antique ID = -1 
        uint256 _antiqueID = 0;

        require(_uploader != address(0));
        require(_antiqueHeight > 0);
        require(_antiqueLength > 0);
        require(_anitqueWidth > 0);
        // require(_antiqueObjectID > 0);
        if (_antiqueObjectID > 0)
        {
            _antiqueID = _antiqueObjectID;
        } 

        if (bytes(_materialCreated).length > 0)
        {
            antiqueMaterial = _materialCreated;
        }
        descriptionCount ++;
        
        descriptionMap[descriptionCount] = DescriptionObject (
            descriptionCount,
            _antiqueID,
            antiqueMaterial,
            _antiqueHeight,
            _antiqueLength,
            _anitqueWidth,
            block.timestamp,
            _uploader
        );
        emit addAntiqueDescription 
        (descriptionCount,
        _antiqueID,
        antiqueMaterial,
        _antiqueHeight,
        _antiqueLength,
        _anitqueWidth,
        block.timestamp,
        _uploader); 
        return descriptionCount;
    }

    // PUT:  Description Materials In Blockchain
    function UpdateDescriptionMaterials 
    (
        uint256 _descriptionID,
        string memory _newMaterialCreated,
        uint256 _antiqueHeight,
        uint256 _antiqueLength,
        uint256 _anitqueWidth,
        address payable _uploader
    )
    public 
    {
        require(_antiqueHeight > 0);
        require(_antiqueLength > 0);
        require(_anitqueWidth > 0);
        require(_descriptionID > 0 && _descriptionID <= descriptionCount);
        require (bytes(_newMaterialCreated).length > 0);
        require(_uploader != address(0));
        DescriptionObject memory _description = descriptionMap[_descriptionID];
        _description.materialCreated = _newMaterialCreated;
        _description.antiqueHeight = _antiqueHeight;
        _description.antiqueLength = _antiqueLength;
        _description.anitqueWidth = _anitqueWidth;
        descriptionMap[_descriptionID] = _description;
        emit updateAntiqueDescription 
            (_descriptionID, 
            _newMaterialCreated,
            _antiqueHeight,
            _antiqueLength,
            _anitqueWidth,
            block.timestamp,
            _uploader);
    }

    //GET Description By ID
    function GetDescriptionByID
    (uint256 _descriptionID)
    external view returns (DescriptionObject memory)
    {
        require (ValidateDescriptionID(_descriptionID) == true);
        return descriptionMap[_descriptionID];
    }

    //PUT: Antique ID by Description ID 
    function SetAntiqueIDByDescriptionID
    (
        uint256 _descriptionID,
        uint256 _newAntiqueID,
        address payable _uploader
    )
    external 
    {
        require(ValidateDescriptionID(_descriptionID) == true);
        DescriptionObject memory _descriptionData = descriptionMap[_descriptionID];
        _descriptionData.antiqueID = _newAntiqueID;
        //Update To the Blockchain
        descriptionMap[_descriptionID] = _descriptionData;
        emit setAntiqueIDByDescriptionID (_descriptionID,_newAntiqueID,block.timestamp,_uploader);
    }

    //Validate Description ID 
    function ValidateDescriptionID 
    (uint _descriptionID)
    public view returns (bool)
    {
        if (_descriptionID <= 0 || _descriptionID > descriptionCount)
        {
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
