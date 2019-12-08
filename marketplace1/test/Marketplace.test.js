import { Contract } from "web3-eth-contract";
import { Accounts } from "web3-eth-accounts";
import { isTopic } from "web3-utils";
import { mkdir } from "fs";

const Marketplace = artifacts.require('./MarketPlace.sol')
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('MarketPlace', ([deployer, seller, buyer]) => {
    let mp

    before(async () => {
        mp = await Marketplace.deployed()

    })
    describe('deployment', async() =>{
        it('deplys successfully', async() => {
            const address = await mp.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
        it('has a name', async () => {
            const name = await mp.name()
            assert.equal(name, 'test MarketPlace')
          })

    })

    describe('products', async() =>{
        let result, productCount

        before(async () => {
            result = await mp.createProducts("iPhone X", web3.utils.toWei('1', 'Ether'), {from: seller})
            productCount = await mp.productCount()
        })
        it('creates products', async () => {
            assert.equal(productCount, 1)
            //console.log(result.logs)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'iPhone X', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, seller, 'owner is correct')
            assert.equal(event.purchased, false, 'purchased is correct')
            // FAILURE: Product must have a name
            await await mp.createProducts('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
            // FAILURE: Product must have a price
            await await mp.createProducts('iPhone X', 0, { from: seller }).should.be.rejected;
          })
          it('sells products', async () => {
            // Track the seller balance before purchase
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            // SUCCESS: Buyer makes purchase
            result = await mp.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})
            // Check logs
            const event = result.logs[0].args
            console.log(result.logs)
            // Check that seller received funds
            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)
            
            let price
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)

            const exepectedBalance = oldSellerBalance.add(price)

            assert.equal(newSellerBalance.toString(), exepectedBalance.toString())
          

          })


        })

})
