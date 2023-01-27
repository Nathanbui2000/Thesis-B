const DatabaseController = artifacts.require("DatabaseController");
module.exports = function (deployer) {
    deployer.deploy(DatabaseController);
};