const paypal = require('paypal-rest-sdk')

const payPalData = paypal.configure({
  mode: 'sandbox',
  client_id:
    'AWTeL4kMDevIsCS-YZzuwnpA2qET4Sb6zGapzyWN1py_CdjzNjFsBKmipq-0HdZqswRBgZO7MFr2gjcW',
  client_secret:
    'EHOWisVj98EI8hOfAG_9PHTGnca36cW5LPNzicJFvflitSehl9GgjL47adBLGfzVeyEDY7J7INK2OXfe',
})
module.exports = { payPalData }
