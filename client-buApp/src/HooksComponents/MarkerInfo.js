import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import ChildCarousel from '../FuncComponents/ChildCarousel';
import { useRef } from 'react';

export default function MarkerInfo() {

    const location = useLocation();
    const ref = useRef();
    ref.current = 0
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
                    <h4 className='card-title'>{location.state.locName}</h4>
                    {location.state.locCenter.map((thisCenter, index) => <div key={index} className="card-text">{thisCenter}</div>)}
                    <p className='card-text'>{location.state.locId}</p>
                </div>
            </div>
        </div>
    )
}