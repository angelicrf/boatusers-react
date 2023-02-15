import React from 'react'
import BUNavBar from '../FuncComponents/BUNavBar'
import UserName from '../FuncComponents/UserName'

const ProductItem = ({
  productTitle,
  productId,
  productImg,
  productDesc,
  productPrice,
  productAdd,
}) => {
  return (
    <div>
      <header>
        <title>Product Item</title>
      </header>
      <div style={{ width: '400px' }} className='card'>
        <img
          style={{ width: '400px', height: '350px' }}
          className='card-img-top'
          src={`${productImg}`}
          alt={`${productId}`}
        />
        <div className='card-body'>
          <h4 className='card-title'>{productTitle}</h4>
          <p className='card-text'>{productDesc}</p>
          <p className='card-text'>{productId}</p>
          <p className='card-text'>$ {productPrice}</p>
        </div>
        <button type='button' className='btn btn-primary' onClick={productAdd}>
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default ProductItem
