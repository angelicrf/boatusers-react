import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import ChildCarousel from '../FuncComponents/ChildCarousel';
import { useRef, useState } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom"
//import Button from '@mui/material/Button';

export default function MarkerInfo() {

    const [favClicked, setFavClicked] = useState(false)
    const buNavigate = useNavigate()

    const location = useLocation();
    const ref = useRef();
    ref.current = 0
    let favObj = Object.assign({
        myFav: {
            favId: '',
            favName: '',
            favImg: ''
        }
    })
    let allFavorites = []
    const addFavorite = (thisName, thisId, thisImg) => {
        favObj.myFav.favName = thisName
        favObj.myFav.favId = thisId
        favObj.myFav.favImg = thisImg

        if (!allFavorites.includes(favObj)) {
            allFavorites.push(favObj)
            console.log('clicked ', allFavorites)
            // redux storage and
            buNavigate('/MyAccount/FavoritePlaces', { state: { myFavs: allFavorites } })
        }

    }
    const deleteFavorite = () => {
        console.log('removedFav')
        // clean local storage
    }
    //useEffect to get from localstorage

    return (

        <div>
            <div className="card">
                <div className="card-body">
                    <Carousel>
                        {location.state.locImg.map((element, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100 h-50"
                                    src={`${element}`}
                                    alt={`${index} Slide`}
                                    style={{ maxHeight: '550px' }}
                                />
                                <Carousel.Caption>
                                    <h3>{`${index} Lable`}</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum. {index}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            /*<div key={index}><ChildCarousel buElement={element} buIndex={index} ref={ref} /></div> */
                        ))}
                    </Carousel>
                    <h4 className='card-title mt-1'>{location.state.locName}  <span><button style={{ float: 'right', backgroundColor: 'transparent', border: 'none', outline: 'none' }} onClick={() => {
                        setFavClicked(!favClicked)
                        if (!favClicked) return addFavorite(location.state.locName, location.state.locId, location.state.locImg[0])
                        else if (favClicked) return deleteFavorite()
                    }}><i className="bi bi-heart-fill" style={{ color: favClicked ? 'red' : 'blue' }}></i></button></span></h4>
                    {location.state.locCenter.map((thisCenter, index) => <div key={index} className="card-text">{thisCenter}</div>)}
                    <p className='card-text'>{location.state.locId}</p>
                </div>
            </div>
        </div>
    )
}