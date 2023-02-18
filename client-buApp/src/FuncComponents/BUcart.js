import React from 'react'
import BUNavBar from '../FuncComponents/BUNavBar'
import UserName from '../FuncComponents/UserName'
import { useSelector } from 'react-redux'
import PaypalRequest from './PaypalRequest'

const BUcart = () => {
  const isAddedToCart = useSelector((state) => state.cartReducer.isAddedCart)
  const getCartItemsArray = useSelector((state) => state.cartReducer.cartItems)

  return (
    <div>
      <header>
        <title>Cart</title>
      </header>
      <BUNavBar />
      <div>BUCart</div>
      <UserName />
      {isAddedToCart ? (
        <div>
          {getCartItemsArray.map((data, index) => {
            if (data.thisPrDes)
              return (
                <div
                  style={{ width: '500px' }}
                  className='container border border-4 border-dark rounded bg-info'
                  key={index}
                >
                  <div className='card mt-2 mb-2'>
                    <img
                      style={{ width: '450px', height: '350px' }}
                      className='card-img-top'
                      src={`${data.thisPrImg}`}
                      alt={`${data.thisPrName}`}
                    />
                    <div className='card-body'>
                      <h4 className='card-title'>
                        Boat Name: {data.thisPrName}
                      </h4>
                      <p className='card-text'>Accessory Id: {data.thisPrId}</p>
                      <p className='card-text'>
                        Quantity: {data.thisPrQuantity}
                      </p>
                      <p className='card-text'>
                        Price:
                        {data.thisPrPrice * data.thisPrQuantity}
                      </p>
                      <p className='card-text'>Description: {data.thisPrDes}</p>
                    </div>
                  </div>
                </div>
              )
          })}
          <PaypalRequest />
        </div>
      ) : null}
    </div>
  )
}

export default BUcart
