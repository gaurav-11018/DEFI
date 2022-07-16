const { getNamedAccounts, ethers } = require("hardhat");
const { getWeth } = require("../scripts/getWeth");

async function main() {
  await getWeth();
  const { deployer } = await getNamedAccounts();
}
//   Got 0.20000000000000000ETH
//   Lending Pool Address Provider: 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
//   Lending Pool: ^

async function getLendingPool(account) {
  const lendingPoolAddressProvider = await ethers.getContract(
    "ILendingPoolAddressesProvider",
    "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
    account
  );
  const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool();
  const lendingPool = await ethers.getContractAt(
    "ILendingPool",
    lendingPoolAddress,
    account
  );
  return lendingPool;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
