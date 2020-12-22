const Token = artifacts.require('Token')
const chai = require('chai')
const asPromised = require('chai-as-promised')
const { setTokens } = require('../helpers')
const { EVM_REVERT, EVM_INVALID_ADDRESS } = require('../helpers/constants')

chai.use(asPromised).should()

contract('Token', ([deployer, receiver, exchange]) => {
  const expectedValues = {
    name: 'NEB Token',
    symbol: 'NEB',
    decimals: '18',
    totalSupply: setTokens(1000000).toString(),
    eventType: 'Transfer',
  }

  let contract
  beforeEach(async () => {
    contract = await Token.new()
  })

  describe('deployment', () => {
    it('tracks the name', async () => {
      const result = await contract.name()
      result.should.equal(expectedValues.name)
    })

    it('tracks the symbol', async () => {
      const result = await contract.symbol()
      result.should.equal(expectedValues.symbol)
    })

    it('tracks the decimals', async () => {
      const result = await contract.decimals()
      result.toString().should.equal(expectedValues.decimals)
    })

    it('tracks the total supply', async () => {
      const result = await contract.totalSupply()
      result.toString().should.equal(expectedValues.totalSupply)
    })

    it('assigns the total supply to the deployer/sender of the contract', async () => {
      const result = await contract.balanceOf(deployer)
      result.toString().should.equal(expectedValues.totalSupply)
    })
  })

  describe('sending tokens', () => {
    let result
    let amount

    describe('succes', async () => {
      beforeEach(async () => {
        amount = setTokens(100)
        result = await contract.transfer(receiver, amount, { from: deployer })
      })

      it('transfers tokens balances', async () => {
        let balanceOf
        balanceOf = await contract.balanceOf(deployer)
        balanceOf.toString().should.equal(setTokens(999900).toString())
        balanceOf = await contract.balanceOf(receiver)
        balanceOf.toString().should.equal(setTokens(100).toString())
      })

      it('emits a transfer event', async () => {
        const log = result.logs[0]
        log.event.should.equal(expectedValues.eventType)
        const event = log.args
        event.from.toString().should.equal(deployer, 'from is correct')
        event.to.toString().should.equal(receiver, 'to is correct')
        event.value
          .toString()
          .should.equal(amount.toString(), 'value is correct')
      })
    })

    describe('failure', async () => {
      it('rejects innsufficient blanaces', async () => {
        let invalidAmount
        invalidAmount = setTokens(100000000)
        await contract
          .transfer(receiver, invalidAmount, { from: deployer })
          .should.be.rejectedWith(EVM_REVERT)

        invalidAmount = setTokens(10)
        await contract
          .transfer(deployer, invalidAmount, { from: receiver })
          .should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects invalide recepients', async () => {
        await contract
          .transfer(0x0, amount, { from: deployer })
          .should.be.rejectedWith(EVM_INVALID_ADDRESS)
      })
    })
  })

  describe('approving tokens', () => {
    let result
    let amount

    beforeEach(async () => {
      amount = setTokens(100)
      result = await contract.approve(exchange, amount, { from: deployer })
    })

    describe('succes', () => {
      it('allocates an allowance for delegated token spending on an exchange', async () => {
        const allowance = await contract.allowance(deployer, exchange)
        allowance.toString().should.equal(amount.toString())
      })
      it('emits an approval event', async () => {
        const log = result.logs[0]
        log.event.should.equal('Approval')
        const event = log.args
        event.sender.toString().should.equal(deployer, 'sender is correct')
        event.spender.toString().should.equal(exchange, 'spender is correct')
        event.value
          .toString()
          .should.equal(amount.toString(), 'value is correct')
      })
    })

    describe('failure', () => {
      it('rejects invalid spender accounts', async () => {
        await contract
          .approve(0x0, amount, { from: deployer })
          .should.be.rejectedWith(EVM_INVALID_ADDRESS)
      })
    })

    describe('sending delegated tokens', () => {
      let result
      let amount

      beforeEach(async () => {
        amount = setTokens(100)
        result = await contract.approve(exchange, amount, { from: deployer })
      })

      describe('success', async () => {
        beforeEach(async () => {
          result = await contract.transferFrom(deployer, receiver, amount, {
            from: exchange,
          })
        })

        it('transfers tokens balances', async () => {
          let balanceOf
          balanceOf = await contract.balanceOf(deployer)
          balanceOf.toString().should.equal(setTokens(999900).toString())
          balanceOf = await contract.balanceOf(receiver)
          balanceOf.toString().should.equal(setTokens(100).toString())
        })

        it('reduces the allowed spending value of the sender by the exchange by the transferred amount', async () => {
          const allowance = await contract.allowance(deployer, exchange)
          allowance.toString().should.equal('0')
        })

        it('emits a transfer event', async () => {
          const log = result.logs[0]
          log.event.should.equal(expectedValues.eventType)
          const event = log.args
          event.from.toString().should.equal(deployer, 'from is correct')
          event.to.toString().should.equal(receiver, 'to is correct')
          event.value
            .toString()
            .should.equal(amount.toString(), 'value is correct')
        })
      })

      describe('failure', async () => {
        it('rejects innsufficient blanaces', async () => {
          let invalidAmount
          invalidAmount = setTokens(100000000)
          await contract.transferFrom(deployer, receiver, invalidAmount, {
            from: exchange,
          }).should.be.rejected
        })
        it('rejects invalide recepients', async () => {
          await contract.transferFrom(deployer, 0x0, amount, { from: exchange })
            .should.be.rejected
        })
      })
    })
  })
})
