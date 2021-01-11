<template>
    <div style='margin-top:80px;min-height:85vh;margin-left:-5%;'>
        <h3 class="modal-title col-12 mt-3 mb-3" id="exampleModalLabel" style='text-decoration: underline;color:#000;'>Subscribe</h3>

        <div class="col-12 mb-3">
            <div class='col-12 text-dark' style='clear:both;margin:0px auto;text-align:center;'>
              Get full access to <strong>dArray</strong> for less than 5$/month!<br /><br />

              <div style='max-width:460px;margin:0px auto 30px;text-align:center;border:1px solid #ccc; border-radius:8px; padding:30px; background-color:#0e0b4f0d; box-shadow:3px 3px 5px #0e0b4f3b;'>
                <div style='text-align:center;'>
                  <img src='darray_sm.png' style='margin:0px auto 20px;width:100px;' />
                  <br />1 year subscription
                  <br />Unlimited Invoices & Expenses
                  <br />Unlimited Customers
                  <br />Pomodoro + Tasks + Documents
                  <br />Crypto Tracker + Personal Finance (WIP)
                  <br />New Features for free
                  <br /><span style='font-size:12px;font-weight:200;margin-top:20px;'>+ Support a solo-maker</span>
                  <br /><span style='font-size:13px;font-weight:600;margin-top:20px;text-decoration: line-through;'>99$</span>
                  <br /><span style='font-size:16px;font-weight:600;margin-top:20px;'>59.88$ <span style='font-size:13px;'>(early bid)</span></span>
                </div>
              </div>
              <div style='text-align:center;'>
                <button class="btn btn-link" v-on:click="purchase" style='margin:10px auto;border:1px solid #1d253b;border-radius:8px;padding-top:10px;padding:8px 10px;color:#fff;background-color:#1d253b;min-width:220px;padding:12px 5px;'>Buy</button>
                <br />
                <span style='margin:0px auto;font-size:12px;'>(You will be redirected to Stripe)</span>
              </div>
            </div>
        </div>
    </div>
</template>

<script src="https://js.stripe.com/v3/"></script>
<script>
import { userSession } from '@/userSession'
var stripe = Stripe('pk_test_pALdYXC6f316H4PUGjaQDstY00JiQ39DRr')

export default {
  methods: {
    async purchase () {
      var host = location.protocol.concat('//').concat(window.location.host)
      this.subscribe = true

      stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1I84z0CjpkHqiQ9gk0cUUb1Q', // Replace with the ID of your price
          quantity: 1
        }],
        mode: 'payment',
        successUrl: host + '/paymentSuccess?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: host + '/paymentCancel'
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      })
    }
  }
}
</script>
