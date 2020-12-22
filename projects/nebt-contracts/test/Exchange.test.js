const Exchange = artifacts.require('Exchange')
const chai = require('chai')
const asPromised = require('chai-as-promised')
const Token = artifacts.require('Token')
const { setTokens, setEther } = require('../helpers')
const { EVM_REVERT, ETHER_ADDRESS } = require('../helpers/constants')

chai.use(asPromised).should()

contract('Exchange', ([deployer, feeAccount, user1, user2]) => {
  const values = {
    feePercent: 10,
    depositEvenType: 'Deposit',
    withdrawEventType: 'Withdraw',
  }

  let exchangeContract
  let tokenContract

  beforeEach(async () => {
    tokenContract = await Token.new()
    exchangeContract = await Exchange.new(feeAccount, values.feePercent)
    tokenContract.transfer(user1, setTokens(100), { from: deployer })
  })

  describe('deployment', () => {
    it('tracks the fee account', async () => {
      const result = await exchangeContract.feeAccount()
      result.should.equal(feeAccount)
    })
    it('tracks the fee percentage', async () => {
      const result = await exchangeContract.feePercent()
      result.toString().should.equal(values.feePercent.toString())
    })
  })

  describe('fallback', () => {
    it('reverts when ether is sent', async () => {
      let result = await exchangeContract
        .sendTransaction({ value: setEther(1), from: user1 })
        .should.be.rejectedWith(EVM_REVERT)
    })
  })

  describe('depositing tokens', () => {
    let result
    let amount

    describe('success', () => {
      beforeEach(async () => {
        amount = setTokens(10)
        await tokenContract.approve(exchangeContract.address, amount, {
          from: user1,
        })
        result = await exchangeContract.depositToken(
          tokenContract.address,
          amount,
          { from: user1 }
        )
      })

      it('tracks the tokenContract deposit', async () => {
        let balance
        balance = await tokenContract.balanceOf(exchangeContract.address)
        balance.toString().should.equal(amount.toString())
        balance = await exchangeContract.tokens(tokenContract.address, user1)
        balance.toString().should.equal(amount.toString())
      })

      it('tracks the emits deposit event', async () => {
        const log = result.logs[0]
        log.event.should.equal(values.depositEvenType)
        const event = log.args
        event.tokenAddress
          .toString()
          .should.equal(tokenContract.address, 'token address is incorrect')
        event.user.toString().should.equal(user1, 'user address is incorrect')
        event.amount
          .toString()
          .should.equal(amount.toString(), 'amount is incorrect')
        event.balance
          .toString()
          .should.equal(amount.toString(), 'balance is incorrect')
      })
    })

    describe('failure', () => {
      it('rejects ether deposits', async () => {
        result = await exchangeContract
          .depositToken(ETHER_ADDRESS, setTokens(10), { from: user1 })
          .should.be.rejectedWith(EVM_REVERT)
      })

      it('fails when no tokens are approved', async () => {
        await exchangeContract
          .depositToken(tokenContract.address, setTokens(10), { from: user1 })
          .should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('depositing ether', () => {
    let result
    let amount = setEther(1)

    beforeEach(async () => {
      amount = setEther(1)
      result = await exchangeContract.depositEther({
        from: user1,
        value: amount,
      })
    })

    it('tracks the ether deposit', async () => {
      const etherBalance = await exchangeContract.tokens(ETHER_ADDRESS, user1)
      etherBalance.toString().should.equal(amount.toString())
    })

    it('tracks the emits ether deposit event', async () => {
      const log = result.logs[0]
      log.event.should.equal(values.depositEvenType)
      const event = log.args
      event.tokenAddress
        .toString()
        .should.equal(ETHER_ADDRESS, 'token address is incorrect')
      event.user.toString().should.equal(user1, 'user address is incorrect')
      event.amount
        .toString()
        .should.equal(amount.toString(), 'amount is incorrect')
      event.balance
        .toString()
        .should.equal(amount.toString(), 'balance is incorrect')
    })
  })

  describe('withdrawing ether', () => {
    let result
    let amount

    beforeEach(async () => {
      amount = setEther(1)
      await exchangeContract.depositEther({ from: user1, value: amount })
    })

    describe('success', () => {
      beforeEach(async () => {
        result = await exchangeContract.withdrawEther(amount, { from: user1 })
      })
      it('reduces users ether from the exchange by value', async () => {
        const balance = await exchangeContract.tokens(ETHER_ADDRESS, user1)
        balance.toString().should.equal('0')
      })

      it('emits a withdrawl event', async () => {
        const log = result.logs[0]
        log.event.should.equal(values.withdrawEventType)
        const event = log.args
        event.tokenAddress
          .toString()
          .should.equal(ETHER_ADDRESS, 'token address is incorrect')
        event.user.toString().should.equal(user1, 'user address is incorrect')
        event.amount
          .toString()
          .should.equal(amount.toString(), 'amount is incorrect')
        event.balance.toString().should.equal('0', 'balance is incorrect')
      })
    })

    describe('failure', () => {
      it('rejects withdraws for insufficent balances', async () => {
        await exchangeContract
          .withdrawEther(setEther(1000), { from: user1 })
          .should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('withdrawing tokens', () => {
    let result
    let amount

    beforeEach(async () => {
      amount = setTokens(10)
      await tokenContract.approve(exchangeContract.address, amount, {
        from: user1,
      })
      await exchangeContract.depositToken(tokenContract.address, amount, {
        from: user1,
      })
      result = await exchangeContract.withdrawToken(
        tokenContract.address,
        amount,
        { from: user1 }
      )
    })

    describe('success', () => {
      it('reduces users tokens from the exchange by value', async () => {
        const balance = await exchangeContract.tokens(
          tokenContract.address,
          user1
        )
        balance.toString().should.equal('0')
      })

      it('emits a withdraw event', async () => {
        const log = result.logs[0]
        log.event.should.equal(values.withdrawEventType)
        const event = log.args
        event.tokenAddress
          .toString()
          .should.equal(tokenContract.address, 'token address is incorrect')
        event.user.toString().should.equal(user1, 'user address is incorrect')
        event.amount
          .toString()
          .should.equal(amount.toString(), 'amount is incorrect')
        event.balance.toString().should.equal('0', 'balance is incorrect')
      })
    })

    describe('failure', () => {
      it('rejects withdraws for insufficent balances', async () => {
        await exchangeContract
          .withdrawToken(ETHER_ADDRESS, setTokens(10), { from: user1 })
          .should.be.rejectedWith(EVM_REVERT)
      })
      it('fails on insufficient balances', async () => {
        await exchangeContract
          .withdrawToken(tokenContract.address, setTokens(10000), {
            from: user1,
          })
          .should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('checking user balances', () => {
    let amount
    let result
    it('tracks the balance of a user ETHER', async () => {
      amount = setEther(10)
      await tokenContract.approve(exchangeContract.address, amount, {
        from: user1,
      })
      await exchangeContract.depositEther({
        from: user1,
        value: amount,
      })
      result = await exchangeContract.balanceOf(ETHER_ADDRESS, user1)
      result.toString().should.equal(amount.toString())
    })
    it('tracks the balance of a user TOKENS', async () => {
      amount = setTokens(10)
      await tokenContract.approve(exchangeContract.address, amount, {
        from: user1,
      })
      await exchangeContract.depositToken(tokenContract.address, amount, {
        from: user1,
      })
      result = await exchangeContract.balanceOf(tokenContract.address, user1)
      result.toString().should.equal(amount.toString())
    })
  })

  describe('making orders', () => {
    let result, getAmount, giveAmount, testTimestamp

    beforeEach(async () => {
      getAmount = setTokens(1)
      giveAmount = setEther(1)
      result = await exchangeContract.makeOrder(
        tokenContract.address,
        getAmount,
        ETHER_ADDRESS,
        giveAmount,
        { from: user1 }
      )
    })

    it('tracks the newly created order', async () => {
      const orderCount = await exchangeContract.orderCount()
      orderCount.toString().should.equal('1')
      const order = await exchangeContract.orders(1)
      order.id.toString().should.equal('1', 'id is incorrect')
      order.user.toString().should.equal(user1, 'user is incorrect')
      order.tokenGet
        .toString()
        .should.equal(tokenContract.address, 'tokenGet is incorrect')
      order.amountGet
        .toString()
        .should.equal(getAmount.toString(), 'amountGet is incorrect')
      order.tokenGive
        .toString()
        .should.equal(ETHER_ADDRESS, 'tokenGive is incorrect')
      order.amountGive
        .toString()
        .should.equal(giveAmount.toString(), 'amountGive is incorrect')
      order.timestamp
        .toString()
        .length.should.be.at.least(1, 'timestamp is present')
    })

    it('emits an Order event', async () => {
      const log = result.logs[0]
      log.event.should.eq('Order')
      const event = log.args
      event.id.toString().should.equal('1', 'id is incorrect')
      event.user.toString().should.equal(user1, 'user is incorrect')
      event.tokenGet
        .toString()
        .should.equal(tokenContract.address, 'tokenGet is incorrect')
      event.amountGet
        .toString()
        .should.equal(getAmount.toString(), 'amountGet is incorrect')
      event.tokenGive
        .toString()
        .should.equal(ETHER_ADDRESS, 'tokenGive is incorrect')
      event.amountGive
        .toString()
        .should.equal(giveAmount.toString(), 'amountGive is incorrect')
      event.timestamp
        .toString()
        .length.should.be.at.least(1, 'timestamp is present')
    })
  })

  describe('order actions', () => {
    let result, id, getAmount, giveAmount
    beforeEach(async () => {
      getAmount = setTokens(1)
      giveAmount = setEther(1)
      await exchangeContract.depositEther({ from: user1, value: setEther(1) })
      await tokenContract.transfer(user2, setTokens(100), { from: deployer })
      await tokenContract.approve(exchangeContract.address, setTokens(2), {
        from: user2,
      })
      await exchangeContract.depositToken(tokenContract.address, setTokens(2), {
        from: user2,
      })
      await exchangeContract.makeOrder(
        tokenContract.address,
        getAmount,
        ETHER_ADDRESS,
        giveAmount,
        { from: user1 }
      )
    })

    describe('filling orders', async () => {
      describe('success', async () => {
        beforeEach(async () => {
          id = '1'
          result = await exchangeContract.fillOrder(id, { from: user2 })
        })
        it('executes the trade and charges fees', async () => {
          let balance
          balance = await exchangeContract.balanceOf(
            tokenContract.address,
            user1
          )
          balance
            .toString()
            .should.equal(getAmount.toString(), 'user1 received tokens')
          balance = await exchangeContract.balanceOf(ETHER_ADDRESS, user2)
          balance
            .toString()
            .should.equal(giveAmount.toString(), 'user2 received Ether')
          balance = await exchangeContract.balanceOf(ETHER_ADDRESS, user1)
          balance.toString().should.equal('0', 'user1 Ether deducted')
          balance = await exchangeContract.balanceOf(
            tokenContract.address,
            user2
          )
          balance
            .toString()
            .should.equal(
              setTokens(0.9).toString(),
              'user2 tokens deducted with fee applied'
            )
          const feeAccount = await exchangeContract.feeAccount()
          balance = await exchangeContract.balanceOf(
            tokenContract.address,
            feeAccount
          )
          balance
            .toString()
            .should.equal(setTokens(0.1).toString(), 'feeAccount received fee')
        })
        it('updates filled orders', async () => {
          const orderFilled = await exchangeContract.orderFilled(1)
          orderFilled.should.equal(true)
        })

        it('emits a "Trade" event', async () => {
          const log = result.logs[0]
          log.event.should.eq('Trade')
          const event = log.args
          event.id.toString().should.equal('1', 'id is correct')
          event.user.should.equal(user1, 'user is correct')
          event.tokenGet.should.equal(
            tokenContract.address,
            'tokenGet is correct'
          )
          event.amountGet
            .toString()
            .should.equal(setTokens(1).toString(), 'amountGet is correct')
          event.tokenGive.should.equal(ETHER_ADDRESS, 'tokenGive is correct')
          event.amountGive
            .toString()
            .should.equal(setEther(1).toString(), 'amountGive is correct')
          event.userFill.should.equal(user2, 'userFill is correct')
          event.timestamp
            .toString()
            .length.should.be.at.least(1, 'timestamp is present')
        })
      })
      describe('failure', async () => {
        it('rejects invalid order ids', async () => {
          const invalidOrderId = 99999
          await exchangeContract
            .fillOrder(invalidOrderId, { from: user2 })
            .should.be.rejectedWith(EVM_REVERT)
        })

        it('rejects already-filled orders', async () => {
          await exchangeContract.fillOrder('1', { from: user2 }).should.be
            .fulfilled
          await exchangeContract
            .fillOrder('1', { from: user2 })
            .should.be.rejectedWith(EVM_REVERT)
        })

        it('rejects cancelled orders', async () => {
          await exchangeContract.cancelOrder('1', { from: user1 }).should.be
            .fulfilled
          await exchangeContract
            .fillOrder('1', { from: user2 })
            .should.be.rejectedWith(EVM_REVERT)
        })
      })
    })

    describe('cancelling orders', async () => {
      describe('success', async () => {
        beforeEach(async () => {
          id = '1'
          result = await exchangeContract.cancelOrder(id, { from: user1 })
        })
        it('updates cancelled orders', async () => {
          const orderCancelled = await exchangeContract.orderCancelled(id)
          orderCancelled.should.eq(true)
        })
        it('emits an cancel order event', async () => {
          const log = result.logs[0]
          log.event.should.eq('Cancel')
          const event = log.args
          event.id.toString().should.equal(id.toString(), 'id is incorrect')
          event.user.toString().should.equal(user1, 'user is incorrect')
          event.tokenGet
            .toString()
            .should.equal(tokenContract.address, 'tokenGet is incorrect')
          event.amountGet
            .toString()
            .should.equal(getAmount.toString(), 'amountGet is incorrect')
          event.tokenGive
            .toString()
            .should.equal(ETHER_ADDRESS, 'tokenGive is incorrect')
          event.amountGive
            .toString()
            .should.equal(giveAmount.toString(), 'amountGive is incorrect')
          event.timestamp
            .toString()
            .length.should.be.at.least(1, 'timestamp is present')
        })
      })
      describe('failure', async () => {
        it('rejects invalid order ids', async () => {
          const invalidId = 8483
          await exchangeContract
            .cancelOrder(invalidId, { from: user1 })
            .should.be.rejectedWith(EVM_REVERT)
        })
        it('rejects unauthorized cancelations', async () => {
          id = 1
          await exchangeContract
            .cancelOrder(id, { from: user2 })
            .should.be.rejectedWith(EVM_REVERT)
        })
      })
    })
  })
})
