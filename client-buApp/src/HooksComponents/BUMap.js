import { useState } from "react"
import { addMarker, displayMap, findMyLocation, markedPlaces, searchLocation } from "../JS/mapData"

export default function BUMap() {
    const [thisData, setThisData] = useState('')
    const [isClicked, setIsClicked] = useState('')

    const getDataValue = () => {
        fetch('http://localhost:5000/api/map/data', {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                myJson.success.map(d => setThisData(d.thisData))
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={() => setIsClicked(true)}>Get Data</button>

            {(isClicked) ? getDataValue() : (<div>Not Clicked</div>)}
            {(thisData !== null) ? <div>{thisData}</div> : (<div>Not Data</div>)}

            <div id="buMap" style={{ width: 400, height: 300 }}></div>
            <button type="button" className="btn btn-primary" onClick={() => searchLocation()}>Display Map</button>

        </div>
    )

}