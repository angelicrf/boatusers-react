import React from 'react'
import { useLocation } from "react-router-dom"

const FavoritedPlaces = () => {
    const location = useLocation();

    return (
        <div>
            Favorited Places
            {location.state.myFavs.map((element, index) => (
                <div key={index}>
                    <div className='d-flex justify-content-center'>
                        <div style={{ width: '520px' }} className="card">
                            <button style={{ border: 'none', outline: 'none' }} onClick={() => { return console.log('newImgclicked..') }}><
                                span><img style={{ width: '500px', height: '300px' }} className="card-img-top rounded" src={`${element.myFav.favImg}`} alt={`${element.myFav.favName}`} /></span></button>
                            <div className="card-body">
                                <h4 className="card-title">{element.myFav.favName}</h4>
                                <p className="card-text">{element.myFav.favId}</p>
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
            )}
        </div>
    )
}

export default FavoritedPlaces
