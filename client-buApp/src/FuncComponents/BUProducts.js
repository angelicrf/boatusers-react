import React, { useEffect, useState } from 'react'
import BUNavBar from '../FuncComponents/BUNavBar'
import UserName from '../FuncComponents/UserName'
import ProductItem from './ProductItem'
import { products } from '../ProductRestAPI/porducts'
import {
  addToCart,
  updateFromCart,
  rmFromCart,
  favsProductsItems,
  saveProducts,
  rmFromFavs,
  rmFromSaved,
} from '../Store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

export const BUProducts = () => {
  let thisRow = []
  let thisCol = []
  let holdOldQuantity = []

  const [thisProductId, setThisProductId] = useState(0)
  const [isMatchedProductId, setIsMatchedProductId] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [isAddedBtn, setAddedBtn] = useState(false)
  const [isAddedCart, setIsAddedCart] = useState(false)
  const [isDeletedBtn, setIsDeletedBtn] = useState(false)
  const [isSavedBtn, setIsSavedBtn] = useState(false)
  const [isFavedBtn, setIsFavedBtn] = useState(false)
  const [thisItemCart, setThisItemCart] = useState([{}])
  const dispatch = useDispatch()
  const getisItemAdded = useSelector((state) => state.cartReducer.isAddedCart)
  const getItemStore = useSelector((state) => state.cartReducer.cartItems)
  const getSavedItmStore = useSelector(
    (state) => state.cartReducer.savedLaterProducts,
  )
  const getFavsItmStore = useSelector((state) => state.cartReducer.favsProducts)

  useEffect(() => {
    console.log('rerendered')
    document.body.style.background = '#dae8ee'
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
    if (getFavsItmStore.length > 0) {
      products.map((data, index) => {
        data.productData.map((subData, i) => {
          subData.productType.subProductTypeInfo.map((subInfo, j) => {
            getFavsItmStore.map((df) => {
              if (df.thisPrId !== undefined)
                if (df.thisPrId === subData.productId) {
                  subInfo.subProductLiked = true
                  setIsFavedBtn(true)
                }
            })
          })
        })
      })
    }
    if (getSavedItmStore.length > 0) {
      products.map((data, index) => {
        data.productData.map((subData, i) => {
          subData.productType.subProductTypeInfo.map((subInfo, j) => {
            getSavedItmStore.map((ds) => {
              if (ds.thisPrId !== undefined)
                if (ds.thisPrId === subData.productId) {
                  subInfo.subProductSaved = true
                  setIsSavedBtn(true)
                }
            })
          })
        })
      })
    }
  }, [thisItemCart, isFavedBtn])

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
          if (isDeletedBtn) {
            console.log('isDeletedCalledUseEffect')
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
            setIsDeletedBtn(false)
          }
          if (!isAddedBtn) console.log('updateFromUseEffect')
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
          holdOldQuantity = []
          thisQuantityArray = []
        })
      }
    }

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
                          thisPrAddMsg: thisValueArray[index].thisPrAddMsg,
                          thisPrDeleteMsg:
                            thisValueArray[index].thisPrDeleteMsg,
                          thisPrAddStyle: thisValueArray[index].thisPrAddStyle,
                          thisPrDeleteStyle:
                            thisValueArray[index].thisPrDeleteStyle,
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
    thisPrAddMsg,
    thisPrDeleteMsg,
    thisPrAddStyle,
    thisPrDeleteStyle,
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
        thisPrAddMsg: thisPrAddMsg,
        thisPrDeleteMsg: thisPrDeleteMsg,
        thisPrAddStyle: thisPrAddStyle,
        thisPrDeleteStyle: thisPrDeleteStyle,
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
  const deleteProductItem = (prId) => {
    if (getisItemAdded && getItemStore.some((el) => el.thisPrId === prId)) {
      setIsDeletedBtn(false)
      setTimeout(() => {
        console.log(isDeletedBtn)

        products.map((data, index) => {
          data.productData.map((subData, i) => {
            subData.productType.subProductTypeInfo.map((subInfo, j) => {
              if (prId === subData.productId) {
                console.log('existDelete', prId)
                return setIsDeletedBtn(true)
              }
            })
          })
        })
      }, 1000)
    } else {
      products.map((data, index) => {
        data.productData.map((subData, i) => {
          subData.productType.subProductTypeInfo.map((subInfo, j) => {
            if (prId === subData.productId) {
              console.log('existDeleteMsg', prId)
              ;(subInfo.subProductDeleteMsg = 'No Product Found to Delete'),
                (subInfo.subProductDeleteStyle = 'inline')
              return setIsDeletedBtn(true)
            }
          })
        })
      })
    }
  }
  const handleAddCartBtn = (prId) => {
    setIsAddedCart(false)
    setTimeout(() => {
      console.log('isAddedCart ', isAddedCart)
      products.map((data, index) => {
        data.productData.map((subData, i) => {
          subData.productType.subProductTypeInfo.map((subInfo, j) => {
            if (prId === subData.productId) {
              console.log('existAddHandle', prId)
              console.log(subInfo.subProductAddMsg)
              console.log(subInfo.subProductAddStyle)
              ;(subInfo.subProductAddMsg = 'Update Quantity'),
                (subInfo.subProductAddStyle = 'inline')
              setIsAddedCart(true)
            }
          })
        })
      })
    }, 1000)
  }
  const favProductItem = (prId) => {
    if (
      !getFavsItmStore.some((el) => {
        if (el.thisPrId !== undefined) return el.thisPrId === prId
      })
    ) {
      setIsFavedBtn(false)
      setTimeout(() => {
        console.log(isFavedBtn)
        products.map((data, index) => {
          data.productData.map((subData, i) => {
            subData.productType.subProductTypeInfo.map((subInfo, j) => {
              if (prId === subData.productId) {
                console.log('exixtFavproduct', subInfo)

                dispatch(
                  favsProductsItems({
                    thisPrName: subInfo.subProductName,
                    thisPrId: subData.productId,
                    thisPrImg: subInfo.subProductImage,
                    thisPrDes: subInfo.subProductDesc,
                    thisPrPrice: subInfo.subProductPrice,
                  }),
                )
                subInfo.subProductLiked = true
                if (getFavsItmStore.length > 0) return setIsFavedBtn(true)
              }
            })
          })
        })
      }, 1000)
    } else {
      console.log('exitLiked')
      setIsFavedBtn(false)
      setTimeout(() => {
        console.log(isFavedBtn)
        products.map((data, index) => {
          data.productData.map((subData, i) => {
            subData.productType.subProductTypeInfo.map((subInfo, j) => {
              if (prId === subData.productId) {
                console.log('exixtFavproductRm', subInfo)

                dispatch(
                  rmFromFavs({
                    thisPrName: subInfo.subProductName,
                    thisPrId: subData.productId,
                    thisPrImg: subInfo.subProductImage,
                    thisPrDes: subInfo.subProductDesc,
                    thisPrPrice: subInfo.subProductPrice,
                  }),
                )
                subInfo.subProductLiked = false
                if (getFavsItmStore.length == 0) return setIsFavedBtn(true)
              }
            })
          })
        })
      }, 1000)
    }
  }
  const saveProductItem = (prId) => {
    if (
      !getSavedItmStore.some((el) => {
        if (el.thisPrId !== undefined) return el.thisPrId === prId
      })
    ) {
      setIsSavedBtn(false)
      setTimeout(() => {
        console.log(isSavedBtn)

        products.map((data, index) => {
          data.productData.map((subData, i) => {
            subData.productType.subProductTypeInfo.map((subInfo, j) => {
              if (prId === subData.productId) {
                console.log('existSave', subInfo)
                dispatch(
                  saveProducts({
                    thisPrName: subInfo.subProductName,
                    thisPrId: subData.productId,
                    thisPrImg: subInfo.subProductImage,
                    thisPrDes: subInfo.subProductDesc,
                    thisPrPrice: subInfo.subProductPrice,
                  }),
                )
                subInfo.subProductSaved = true
                if (getSavedItmStore.length > 0) setIsSavedBtn(true)
              }
            })
          })
        })
      }, 1000)
    } else {
      setIsSavedBtn(false)
      setTimeout(() => {
        console.log(isSavedBtn)

        products.map((data, index) => {
          data.productData.map((subData, i) => {
            subData.productType.subProductTypeInfo.map((subInfo, j) => {
              if (prId === subData.productId) {
                console.log('existSaveRm', subInfo)
                dispatch(
                  rmFromSaved({
                    thisPrName: subInfo.subProductName,
                    thisPrId: subData.productId,
                    thisPrImg: subInfo.subProductImage,
                    thisPrDes: subInfo.subProductDesc,
                    thisPrPrice: subInfo.subProductPrice,
                  }),
                )
                subInfo.subProductSaved = false
                if (getSavedItmStore.length == 0) setIsSavedBtn(true)
              }
            })
          })
        })
      }, 1000)
    }
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
                  isItmAdded={subInfo.subProductAddStyle}
                  isItmDeleted={subInfo.subProductDeleteStyle}
                  msgAdd={subInfo.subProductAddMsg}
                  msgDelete={subInfo.subProductDeleteMsg}
                  isLiked={subInfo.subProductLiked}
                  isSaved={subInfo.subProductSaved}
                  addQuantity={() => {
                    increaseQuantity(subData.productId)
                  }}
                  saveLater={() => {
                    saveProductItem(subData.productId)
                  }}
                  favProduct={() => {
                    favProductItem(subData.productId)
                  }}
                  deleteItem={() => deleteProductItem(subData.productId)}
                  productAdd={() => {
                    if (subInfo.subProductQuantity > 0) {
                      subInfo.subProductAddMsg = ''
                      subInfo.subProductAddStyle = 'none'
                      return addToMainCart(
                        subData.productType.productTypeName,
                        subData.productId,
                        subInfo.subProductQuantity,
                        subInfo.subProductImage,
                        subInfo.subProductDesc,
                        subInfo.subProductPrice,
                        subInfo.subProductAddMsg,
                        subInfo.subProductDeleteMsg,
                        subInfo.subProductAddStyle,
                        subInfo.subProductDeleteStyle,
                      )
                    } else {
                      handleAddCartBtn(subData.productId)
                    }
                  }}
                />,
              )}
            </div>
          ))}
        </div>
      )),
    )
  }
  const columnsByTwo = () => {
    /*const rows = thisCol.filter((x, i) => {
    if (i % 2 === 0) {
      return thisCol.slice(i, i + 1)
    }
  }) */
    return thisCol.reduce(
      (r, i) =>
        !r.some((j) => i.props.productId === j.props.productId) ? [...r, i] : r,
      [],
    )
  }
  renderItems()
  let newColArrayData = columnsByTwo()
  //addElemnts()
  return (
    <div>
      <header>
        <title>Products</title>
      </header>
      <BUNavBar />
      <div>BUProducts</div>
      <UserName />
      <div className='conatiner border border-dark rounded border-4'>
        <div className='row'>
          <div className='col col-sm'>
            {newColArrayData.map((dData, dIndex) => {
              return (
                <div key={dIndex}>
                  {dIndex % 2 == 0 ? <div>{dData}</div> : null}
                </div>
              )
            })}
          </div>
          <div className='col col-sm'>
            {newColArrayData.map((dData, dIndex) => {
              return (
                <div key={dIndex}>
                  {dIndex % 2 !== 0 ? <div>{dData}</div> : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
