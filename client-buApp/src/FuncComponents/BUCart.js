import React, { useEffect, useState } from 'react'
import BUNavBar from './BUNavBar'
import UserName from './UserName'
import { useSelector, useDispatch } from 'react-redux'
import { updateFromCart, rmFromCart } from '../Store/cartSlice'
import PaypalRequest from './PaypalRequest'
import DeliveryStatus from './DeliveryStatus'

const BUcart = () => {
  const isAddedToCart = useSelector((state) => state.cartReducer.isAddedCart)
  const getCartItemsArray = useSelector((state) => state.cartReducer.cartItems)
  const [isDeletedCartBtn, setIsDeletedCartBtn] = useState(false)
  const [isUpdatedCartBtn, setIsUpdatedCartBtn] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [errorTransaction, setErrorTransaction] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    document.body.style.background = '#829bc0'
    setErrorTransaction(checkErrorParam())
    let thisNewArray = checkEmptyItems(getCartItemsArray)

    if (thisNewArray.length > 0) {
      console.log(thisNewArray)
      calcTotal(thisNewArray)
    }
  }, [])
  const checkErrorParam = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const errorValue = queryParameters.get('errorValue')
    return errorValue
  }
  const checkEmptyItems = (thisArray) =>
    thisArray.filter((e) => e.thisPrId !== undefined)

  const deleteCartItem = (prId) => {
    setIsDeletedCartBtn(false)
    setTimeout(() => {
      console.log(isDeletedCartBtn)

      getCartItemsArray.map((d, j) => {
        if (prId === d.thisPrId) {
          console.log('deletedCartExist ', prId)

          dispatch(
            rmFromCart({
              thisPrName: d.thisPrName,
              thisPrId: d.thisPrId,
              thisPrQuantity: d.thisPrQuantity,
              thisPrImg: d.thisPrImg,
              thisPrDes: d.thisPrDes,
              thisPrPrice: d.thisPrPrice,
            }),
          )
          return setIsDeletedCartBtn(true)
        }
      })
    }, 1000)
  }
  const calcTotal = (thisArray) => {
    let sumPrice = ''
    return thisArray.forEach((element) => {
      return setTotalAmount((sumPrice += element.thisPrPrice))
    })
  }
  const updateCartQuantity = (prId, typeUpdate) => {
    setIsUpdatedCartBtn(false)

    setTimeout(() => {
      console.log(isUpdatedCartBtn)

      getCartItemsArray.map((u, j) => {
        if (prId === u.thisPrId) {
          console.log(`existCartUpdate ${u.thisPrQuantity}`)
          dispatch(
            updateFromCart({
              thisPrName: u.thisPrName,
              thisPrId: u.thisPrId,
              thisPrQuantity:
                typeUpdate == 'plus'
                  ? u.thisPrQuantity + 1
                  : typeUpdate == 'minus'
                  ? u.thisPrQuantity - 1
                  : u.thisPrQuantity,
              thisPrImg: u.thisPrImg,
              thisPrDes: u.thisPrDes,
              thisPrPrice: u.thisPrPrice,
            }),
          )
          return setIsUpdatedCartBtn(true)
        }
      })
    }, 1000)
  }

  return (
    <div>
      <header>
        <title>Cart</title>
      </header>
      <BUNavBar />
      <div>BUCart</div>
      <UserName />
      {errorTransaction !== null ? (
        <div className='container border border-2 border-dark rounded bg-success mt-2 mb-2'>
          <div>
            Transaction Failure Error from Paypal Request:{' '}
            <span className='fw-bold text-danger'>{errorTransaction}</span>
          </div>
        </div>
      ) : null}
      {isAddedToCart && checkEmptyItems(getCartItemsArray).length > 0 ? (
        <div>
          {getCartItemsArray.map((data, index) => {
            if (data) {
              return data.thisPrDes ? (
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
                      <span className='card-text d-flex justify-content-between bg-info rounded px-2 py-2'>
                        <button
                          style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                          }}
                          type='button'
                          onClick={() => {
                            deleteCartItem(data.thisPrId)
                          }}
                        >
                          <i className='bi bi-trash-fill'></i>
                        </button>
                        <button
                          style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                          }}
                          type='button'
                          onClick={() => {
                            updateCartQuantity(data.thisPrId, 'minus')
                          }}
                        >
                          <i className='bi bi-dash-circle'></i>
                        </button>
                        <span>Quantity: {data.thisPrQuantity}</span>
                        <button
                          style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            float: 'right',
                          }}
                          type='button'
                          onClick={() => {
                            updateCartQuantity(data.thisPrId, 'plus')
                          }}
                        >
                          <i className='bi bi-plus-circle'></i>
                        </button>
                      </span>
                      <p className='card-text mt-2'>
                        Price:
                        {data.thisPrPrice * data.thisPrQuantity}
                      </p>
                      <p className='card-text'>Description: {data.thisPrDes}</p>
                    </div>
                  </div>
                  <div>
                    Total Amount:{' '}
                    <span className='text-danger fw-bold'>{totalAmount}</span>
                  </div>
                </div>
              ) : null
            }
          })}
          <div className='container mt-2 d-flex justify-content-center'>
            <PaypalRequest
              totalAmount={totalAmount}
              itemArray={checkEmptyItems(getCartItemsArray)}
            />
          </div>
          <div className='container mt-2 d-flex justify-content-center'>
            <DeliveryStatus />
          </div>
        </div>
      ) : (
        <div>
          <div className='container bg-success rounded mt-2 mb-2'>
            <div className='text-info px-2 py-2'>Cart is Empty</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BUcart
