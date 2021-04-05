import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import assert from "assert";

assert(process.env.PROXY_REGISTRY_ADDRESS);
assert(process.env.TOKEN_NAME);
assert(process.env.TOKEN_SYMBOL);
assert(process.env.TOKEN_BASE_URI);

const deploy: DeployFunction = async function ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts
}: HardhatRuntimeEnvironment) {
    const { deploy, execute } = deployments;
    const { deployer } = await getNamedAccounts();

    const MyERC721 = await deploy("MyERC721", {
        from: deployer,
        args: [process.env.PROXY_REGISTRY_ADDRESS, process.env.TOKEN_NAME, process.env.TOKEN_SYMBOL, process.env.TOKEN_BASE_URI],
    })

    console.log('MyERC721: ' + MyERC721.address);

    await execute('MyERC721', {from: deployer}, 'mint', deployer);
}

export default deploy;
