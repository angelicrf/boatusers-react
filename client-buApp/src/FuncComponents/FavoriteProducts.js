import BUNavBar from '../FuncComponents/BUNavBar'
import UserName from '../FuncComponents/UserName'
import { useSelector } from 'react-redux'

const FavoriteProducts = () => {
  const getFavsItmStore = useSelector((state) => state.cartReducer.favsProducts)

  return (
    <div>
      <header>
        <title>FavoritedProducts</title>
      </header>
      <BUNavBar />
      <div>User Favorite Products</div>
      <UserName />
      <div>{console.log(getFavsItmStore.length)}</div>
      {getFavsItmStore.map((element, index) => {
        if (element.thisPrName)
          return (
            <div key={index}>
              <div className='d-flex justify-content-center'>
                <div style={{ width: '520px' }} className='card'>
                  <button
                    style={{ border: 'none', outline: 'none' }}
                    onClick={() => {
                      return console.log('newImgclicked..')
                    }}
                  >
                    <span>
                      <img
                        style={{ width: '500px', height: '300px' }}
                        className='card-img-top rounded'
                        src={`${element.thisPrImg}`}
                        alt={`${element.thisPrName}`}
                      />
                    </span>
                  </button>
                  <div className='card-body'>
                    <h4 className='card-title'>{element.thisPrName}</h4>
                    <p className='card-text'>{element.thisPrId}</p>
                    <p className='card-text'>{element.thisPrDes}</p>
                    <p className='card-text'>{element.thisPrPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          )
      })}
    </div>
  )
}

export default FavoriteProducts
