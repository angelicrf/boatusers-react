import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

export default function MarkerInfo() {

    const location = useLocation();
    // add more img into image array
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${location.state.locImg}`}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${location.state.locImg}`}
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${location.state.locImg}`}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <h4 className='card-title'>{location.state.locName}</h4>
                    {location.state.locCenter.map((thisCenter, index) => <div key={index} className="card-text">{thisCenter}</div>)}
                    <p className='card-text'>{location.state.locId}</p>
                </div>
            </div>
        </div>

    )
}