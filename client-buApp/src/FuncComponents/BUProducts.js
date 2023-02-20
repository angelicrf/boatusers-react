import React, { useEffect, useState } from 'react'
import BUNavBar from '../FuncComponents/BUNavBar'
import UserName from '../FuncComponents/UserName'
import ProductItem from './ProductItem'
import { products } from '../ProductRestAPI/porducts'
import { addToCart, updateFromCart, rmFromCart } from '../Store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

export const BUProducts = () => {
  let thisRow = []
  let thisCol = []
  let subOne = []

  const [thisProductId, setThisProductId] = useState(0)
  const [isMatchedProductId, setIsMatchedProductId] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [isAddedBtn, setAddedBtn] = useState(false)
  const [thisItemCart, setThisItemCart] = useState([{}])
  const dispatch = useDispatch()
  const getisItemAdded = useSelector((state) => state.cartReducer.isAddedCart)
  const getItemStore = useSelector((state) => state.cartReducer.cartItems)

  useEffect(() => {
    let newSorted = sortArray(thisItemCart)

    if (!getisItemAdded && !isSorted && newSorted.length > 0) {
      setThisItemCart(newSorted)
      if (newSorted.length > 0) {
        setIsSorted(true)
      }
    }
    if (!getisItemAdded && isSorted && newSorted.length > 0) {
      thisItemCart.map((d, i) => {
        if (d) {
          dispatch(
            addToCart({
              thisPrName: d.thisPrName,
              thisPrId: d.thisPrId,
              thisPrQuantity: d.thisPrQuantity,
              thisPrImg: d.thisPrImg,
              thisPrDes: d.thisPrDes,
              thisPrPrice: d.thisPrPrice,
            }),
          )
        }
      })
    }
    if (getisItemAdded && isAddedBtn) {
      let sArray = notDuplicatedArray(thisItemCart)
      console.log('lookSArray ', sArray)
      console.log('secondStoreArray', getItemStore)
      compareArrays(sArray, getItemStore)
    }
  }, [thisItemCart])

  let subTwo = []
  let holdOldQuantity = []
  const addQuantity = (newQuantity, oldQuantity) =>
    (oldQuantity = oldQuantity + newQuantity)

  const sortArray = (thisArray) => {
    let srtArray = thisArray.filter(
      (data, index) => Object.keys(data).length !== 0,
    )
    return srtArray
  }
  const changedQuantity = (oldQuantity, newQuantity) => {
    if (newQuantity > 0) {
      if (oldQuantity + 1 !== newQuantity) {
        return true
      } else return false
    }
  }
  const compareArrays = (arrayOne, arrayTwo) => {
    let runIsPrId = false
    holdOldQuantity = []

    if (arrayOne) {
      var thisValueArray = arrayOne.filter((dt) => {
        return !arrayTwo.some((item) => item.thisPrId === dt.thisPrId)
      })
      var thisQuantityArray = arrayOne.filter((dt) => {
        console.log('thisPrid ', thisProductId)
        return arrayTwo.some((item) => {
          if (item.thisPrId !== undefined) {
            if (dt.thisPrId == thisProductId && item.thisPrId == dt.thisPrId) {
              holdOldQuantity.push(dt.thisPrQuantity)
              return thisProductId
            }
          }
        })
      })
      console.log('thisNotIncludedArray ', thisValueArray)
      console.log('thisQuantityArray ', thisQuantityArray)
      if (thisQuantityArray.length > 0 && holdOldQuantity.length > 0) {
        thisQuantityArray.map((qt) => {
          let nQuantity = addQuantity(qt.thisPrQuantity, holdOldQuantity[0])
          console.log(nQuantity)
          //delete
          setThisItemCart((mItem) =>
            mItem.filter((ti) => ti.thisPrId !== qt.thisPrId),
          )
          dispatch(
            rmFromCart({
              thisPrName: qt.thisPrName,
              thisPrId: qt.thisPrId,
              thisPrQuantity: qt.thisPrQuantity,
              thisPrImg: qt.thisPrImg,
              thisPrDes: qt.thisPrDes,
              thisPrPrice: qt.thisPrPrice,
            }),
          )
        })
      }
    }
    /*   setTimeout(() => {
            dispatch(
              updateFromCart({
                thisPrName: qt.thisPrName,
                thisPrId: qt.thisPrId,
                thisPrQuantity: nQuantity,
                thisPrImg: qt.thisPrImg,
                thisPrDes: qt.thisPrDes,
                thisPrPrice: qt.thisPrPrice,
              }),
            )
          }, 700)*/

    if (thisValueArray.length > 0) {
      console.log('insideValueArray')
      getItemStore.map((nd) => {
        if (nd) {
          if (nd.thisPrId !== undefined) {
            for (let index = 0; index < thisValueArray.length; index++) {
              if (thisValueArray) {
                if (thisValueArray[index] !== undefined) {
                  if (thisValueArray[index].thisPrId) {
                    if (nd.thisPrId !== thisValueArray[index].thisPrId) {
                      console.log('addedtodispatch')
                      dispatch(
                        addToCart({
                          thisPrName: thisValueArray[index].thisPrName,
                          thisPrId: thisValueArray[index].thisPrId,
                          thisPrQuantity: thisValueArray[index].thisPrQuantity,
                          thisPrImg: thisValueArray[index].thisPrImg,
                          thisPrDes: thisValueArray[index].thisPrDes,
                          thisPrPrice: thisValueArray[index].thisPrPrice,
                        }),
                      )
                      thisValueArray = []
                    }
                  }
                }
              }
            }
          }
        }
      })
    }
  }
  const notDuplicatedArray = (thisArray) => {
    let thisVal = thisArray.filter(
      (value, index, array) =>
        array.findIndex((t) => t.thisPrId == value.thisPrId) === index,
    )
    console.log('thisValue', thisVal)
    return thisVal
  }
  const addElemnts = () => {
    for (let index = 0; index < thisCol.length; index++) {
      thisRow.push(index)
    }
    console.log(thisRow)
    return thisRow
  }
  const addToMainCart = (
    thisPrName,
    thisPrId,
    thisPrQuantity,
    thisPrImg,
    thisPrDes,
    thisPrPrice,
  ) => {
    setThisProductId(thisPrId)
    setAddedBtn(true)
    return setThisItemCart([
      ...thisItemCart,
      {
        thisPrName: thisPrName,
        thisPrId: thisPrId,
        thisPrQuantity: thisPrQuantity,
        thisPrImg: thisPrImg,
        thisPrDes: thisPrDes,
        thisPrPrice: thisPrPrice,
      },
    ])
  }
  const increaseQuantity = (prId) => {
    setIsMatchedProductId(false)

    setTimeout(() => {
      console.log(isMatchedProductId)

      products.map((data, index) => {
        data.productData.map((subData, i) => {
          subData.productType.subProductTypeInfo.map((subInfo, j) => {
            if (prId === subData.productId) {
              console.log('exist', prId)
              subInfo.subProductQuantity = subInfo.subProductQuantity + 1
              console.log('newQuantity ', subInfo.subProductQuantity)
              return setIsMatchedProductId(true)
            }
          })
        })
      })
    }, 1000)
  }

  const renderItems = () => {
    return products.map((data, index) =>
      data.productData.map((subData, i) => (
        <div key={i}>
          {subData.productType.subProductTypeInfo.map((subInfo, j) => (
            <div key={j}>
              {thisCol.push(
                <ProductItem
                  productTitle={subData.productType.productTypeName}
                  productId={subData.productId}
                  productImg={subInfo.subProductImage}
                  productDesc={subInfo.subProductDesc}
                  productPrice={subInfo.subProductPrice}
                  productQuantity={subInfo.subProductQuantity}
                  addQuantity={() => {
                    increaseQuantity(subData.productId)
                  }}
                  productAdd={() =>
                    addToMainCart(
                      subData.productType.productTypeName,
                      subData.productId,
                      subInfo.subProductQuantity,
                      subInfo.subProductImage,
                      subInfo.subProductDesc,
                      subInfo.subProductPrice,
                    )
                  }
                />,
              )}
            </div>
          ))}
        </div>
      )),
    )
  }
  renderItems()
  addElemnts()
  return (
    <div>
      <header>
        <title>Products</title>
      </header>
      <BUNavBar />
      <div>BUProducts</div>
      <UserName />
      <div className='conatiner border border-dark rounded border-4'>
        {thisRow.map((rData, rIndex) => (
          <div key={rIndex}>
            {(() => {
              if (rIndex % 2 == 0) {
                return (
                  <div className='row'>
                    {thisCol.map((dData, dIndex) => {
                      return (
                        <div key={dIndex}>
                          {(() => {
                            if (dIndex % 2 != 0 && rIndex == 0) {
                              subOne.push(dData)
                            } else if (dIndex % 2 == 0 && rIndex != 0) {
                              subTwo.push(dData)
                            }
                          })()}
                        </div>
                      )
                    })}

                    {rIndex == 0 ? (
                      subOne.map((sData, sIndex) => (
                        <div className='col' key={sIndex}>
                          <div>{sData}</div>
                        </div>
                      ))
                    ) : rIndex != 0 ? (
                      subTwo.map((sData, sIndex) => (
                        <div className='col' key={sIndex}>
                          <div>{sData}</div>
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                )
              }
            })()}
          </div>
        ))}
      </div>
    </div>
  )
}
