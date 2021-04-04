import {expect} from "chai";
import hre from "hardhat";
import {TransactionResponse} from "@ethersproject/abstract-provider";
import {BigNumber} from "ethers";

describe('MyERC721', () => {
    beforeEach(async () => {
        await hre.deployments.fixture();
    })

    const getContracts = async () => {
        const { deployer, tester1, tester2 } = await hre.getNamedAccounts();
        const MyERC721 = await hre.ethers.getContract('MyERC721', deployer);

        return { MyERC721, deployer, tester1, tester2 };
    }

    it('Transfer', async () => {
        const { MyERC721, deployer, tester1 } = await getContracts();

        expect(await MyERC721.totalSupply()).equal(BigNumber.from(1));
        expect(await MyERC721.balanceOf(deployer)).equal(BigNumber.from(1));

        await MyERC721.transferFrom(deployer, tester1, 0).then((tx: TransactionResponse) => tx.wait());

        expect(await MyERC721.balanceOf(tester1)).equal(BigNumber.from(1));
        expect(await MyERC721.balanceOf(deployer)).equal(BigNumber.from(0));
        expect(await MyERC721.ownerOf(0)).equal(tester1);
    })

    it('TransferFrom', async () => {
        const { MyERC721, deployer, tester1, tester2 } = await getContracts();

        expect(await MyERC721.getApproved(0)).equal('0x0000000000000000000000000000000000000000');

        await MyERC721.approve(tester1, 0).then((tx: TransactionResponse) => tx.wait());

        expect(await MyERC721.getApproved(0)).equal(tester1);

        await MyERC721.transferFrom(deployer, tester2, 0).then((tx: TransactionResponse) => tx.wait());

        expect(await MyERC721.balanceOf(tester2)).equal(BigNumber.from(1));
        expect(await MyERC721.balanceOf(deployer)).equal(BigNumber.from(0));
        expect(await MyERC721.ownerOf(0)).equal(tester2);
    })

    it('Transfer Error', async () => {
        const { MyERC721, deployer, tester1, tester2 } = await getContracts();
        const MyERC721_2 = await hre.ethers.getContract('MyERC721', tester1);

        expect(await MyERC721.transferFrom(tester1, tester2, 0).catch((e: Error) => e.message))
            .to.have.string('ERC721: transfer of token that is not own');
        expect(await MyERC721_2.transferFrom(deployer, tester2, 0).catch((e: Error) => e.message))
            .to.have.string('ERC721: transfer caller is not owner nor approved');
    })
})
