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
        uint256 uploadTime;
        address payable uploader;
    }
    event addAntiqueDescription (
        uint256 descriptionID,
        uint256 antiqueObjectID,
        string materialCreated,
        address payable uploader
    );
    event updateAntiqueDescription (
        uint256 documentationID,
        string newMaterialCreated,
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
        address payable _uploader
    )
    public returns (uint256)
    {
        string memory antiqueMaterial;

        //Initialise Default Antique ID = -1 
        uint256 _antiqueID = 0;

        require(_uploader != address(0));
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
            block.timestamp,
            _uploader
        );
        emit addAntiqueDescription (descriptionCount,_antiqueID,antiqueMaterial,_uploader); 
        return descriptionCount;
    }

    // PUT:  Description Materials In Blockchain
    function UpdateDescriptionMaterials 
    (
        uint256 _descriptionID,
        string memory _newMaterialCreated,
        address payable _uploader
    )
    public 
    {
        require(_descriptionID > 0 && _descriptionID <= descriptionCount);
        require (bytes(_newMaterialCreated).length > 0);
        require(_uploader != address(0));
        DescriptionObject memory _description = descriptionMap[_descriptionID];
        _description.materialCreated = _newMaterialCreated;
        descriptionMap[_descriptionID] = _description;
        emit updateAntiqueDescription (_descriptionID , _newMaterialCreated, _uploader);
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
