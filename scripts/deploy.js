// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const { ethers } = require('hardhat');
// const hre = require('hardhat');

// const tokens = (n) => {
//   return ethers.utils.parseUnits(n.toString(), 'ether');
// };

// async function main() {
//   // Setup accounts
//   const [buyer, seller, inspector, lender] = await ethers.getSigners();

//   // Deploy Real Estate
//   const RealEstate = await ethers.getContractFactory('RealEstate');
//   const realEstate = await RealEstate.deploy();
//   await realEstate.deployed();
//   console.log(`Deployed Real Estate Contract at: ${realEstate.address}`);

//   //Mint properties
//   console.log('Miniting 3 proterties... \n');
//   for (let i = 0; i < 3; i++) {
//     const transaction = await realEstate
//       .connect(seller)
//       .mint(
//         `https://gateway.pinata.cloud/ipfs/bafybeibaan4mbbxtapsbyae47hqo4ehfvag5fzux3j2ekotm3ieddbnjva/${
//           i + 1
//         }.json`
//       );
//     await transaction.wait();
//   }

//   // Deploy Escrow
//   const Escrow = await ethers.getContractFactory('Escrow');
//   const escrow = await Escrow.deploy(
//     realEstate.address,
//     seller.address,
//     inspector.address,
//     lender.address
//   );
//   await escrow.deployed();
//   console.log(`Deployed Escrow Contract at: ${escrow.address}`);

//   console.log(`Listing 3 properties...\n`);

//   for (let i = 0; i < 3; i++) {
//     //Approve property
//     let transaction = await realEstate
//       .connect(seller)
//       .approve(escrow.address, i + 1);
//     await transaction.wait();
//   }

//   //Listing properties
//   let transaction = await escrow
//     .connect(seller)
//     .list(1, buyer.address, tokens(20), tokens(10));
//   await transaction.wait();

//   transaction = await escrow
//     .connect(seller)
//     .list(2, buyer.address, tokens(15), tokens(10));
//   await transaction.wait();

//   transaction = await escrow
//     .connect(seller)
//     .list(3, buyer.address, tokens(10), tokens(5));
//   await transaction.wait();

//   console.log('Finished.');
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  // Setup accounts
  const [buyer, seller, inspector, lender] = await ethers.getSigners();

  // Deploy Real Estate
  const RealEstate = await ethers.getContractFactory("RealEstate");
  const realEstate = await RealEstate.deploy();
  await realEstate.deployed();
  console.log(`Deployed Real Estate Contract at: ${realEstate.address}`);

  //Mint properties
  console.log("Miniting 3 proterties... \n");
  const properties = [
    "7bRsRLoUlFY6Scj-gLIYx0pDoNB9BuPHS9YqC0FsNF8",
    "4a2qWf6bUgSEOHt_7DUwM1XGYPE65_9gJrPil_QW1wA",
    "jblRWZAYu9Jj06fjCp2BzCOLLJtSFA7XlQREY_3z3X0",
  ];
  for (let i = 0; i < 3; i++) {
    const property = properties[i];

    const transaction = await realEstate
      .connect(seller)
      .mint(`https://arweave.net/${property}`);

    await transaction.wait();
  }

  // Deploy Escrow
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    realEstate.address,
    seller.address,
    inspector.address,
    lender.address
  );
  await escrow.deployed();
  console.log(`Deployed Escrow Contract at: ${escrow.address}`);

  console.log(`Listing 3 properties...\n`);

  for (let i = 0; i < 3; i++) {
    //Approve property
    let transaction = await realEstate
      .connect(seller)
      .approve(escrow.address, i + 1);
    await transaction.wait();
  }

  //Listing properties
  let transaction = await escrow
    .connect(seller)
    .list(1, buyer.address, tokens(20), tokens(10));
  await transaction.wait();

  transaction = await escrow
    .connect(seller)
    .list(2, buyer.address, tokens(15), tokens(10));
  await transaction.wait();

  transaction = await escrow
    .connect(seller)
    .list(3, buyer.address, tokens(10), tokens(5));
  await transaction.wait();

  console.log("Finished.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});