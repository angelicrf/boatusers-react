import React, { useEffect, useState } from 'react'
import BUNavBar from '../FuncComponents/BUNavBar'
import UserName from '../FuncComponents/UserName'
import ProductItem from './ProductItem'
import { products } from '../ProductRestAPI/porducts'

export const BUProducts = () => {
  let thisRow = []
  let thisCol = []
  let subOne = []

  const [thisProductId, setThisProductId] = useState(0)
  const [isMatchedProductId, setIsMatchedProductId] = useState(false)
  const [thisItemCart, setThisItemCart] = useState([{}])

  useEffect(() => {
    console.log(thisItemCart)
    //store the non empty sorted array into redux store
  }, [thisItemCart])

  let subTwo = []
  const addElemnts = () => {
    for (let index = 0; index < thisCol.length; index++) {
      thisRow.push(index)
    }
    console.log(thisRow)
    return thisRow
  }
  const addToCart = (
    thisPrName,
    thisPrId,
    thisPrQuantity,
    thisPrImg,
    thisPrDes,
    thisPrPrice,
  ) => {
    setThisItemCart([
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
                    addToCart(
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
