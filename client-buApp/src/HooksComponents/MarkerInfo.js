import { useLocation } from 'react-router-dom';
import { ImageSource } from '../images/locationImgs'

export default function MarkerInfo() {

    const location = useLocation();
    //compare image id with locId
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <img className='card-img-top' src={location.state.locImg} alt={location.state.locName} />
                    <h4 className='card-title'>{location.state.locName}</h4>
                    {location.state.locCenter.map((thisCenter, index) => <div key={index} className="card-text">{thisCenter}</div>)}
                    <p className='card-text'>{location.state.locId}</p>
                </div>
            </div>
        </div>

    )
}