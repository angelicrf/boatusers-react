import React from 'react'

const PaypalRequest = ({ totalAmount, itemArray }) => {
  return (
    <div>
      <form
        action={`http://localhost:5000/api/paypal/pay?itemArray=${JSON.stringify(
          itemArray,
        )}&totalAmount=${totalAmount}`}
        method='post'
      >
        <input
          style={{ width: '400px' }}
          className='btn btn-success'
          type='submit'
          value='Place Order'
        />
      </form>
    </div>
  )
}

export default PaypalRequest
