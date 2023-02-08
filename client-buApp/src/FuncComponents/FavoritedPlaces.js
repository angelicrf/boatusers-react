import React from 'react'
import { useSelector } from 'react-redux'


const FavoritedPlaces = () => {

    const getIdArray = useSelector(state => state.favReducer.favPlaces)

    return (
        <div>
            Favorited Places
            <div>{console.log(getIdArray.length)}</div>
            {getIdArray.map((element, index) => {
                if (element.thisName) return (
                    <div key={index}>

                        <div className='d-flex justify-content-center'>
                            <div style={{ width: '520px' }} className="card">
                                <button style={{ border: 'none', outline: 'none' }} onClick={() => { return console.log('newImgclicked..') }}><
                                    span><img style={{ width: '500px', height: '300px' }} className="card-img-top rounded" src={`${element.thisImg}`} alt={`${element.thisName}`} /></span></button>
                                <div className="card-body">
                                    <h4 className="card-title">{element.thisName}</h4>
                                    <p className="card-text">{element.thisId}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Item 1</li>
                                    <li className="list-group-item">Item 2</li>
                                    <li className="list-group-item">Item 3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default FavoritedPlaces
