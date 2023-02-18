import React from 'react'

const PaypalRequest = () => {
  return (
    <div>
      <form action='http://localhost:5000/api/paypal/pay' method='post'>
        <input type='submit' value='Buy' />
      </form>
    </div>
  )
}

export default PaypalRequest
