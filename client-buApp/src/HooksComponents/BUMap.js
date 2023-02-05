import { useEffect, useState } from "react"
import { addMarker, displayMap, findMyLocation, markedPlaces, searchLocation, directionSetUp } from "../JS/mapData"
import MarkerInfo from "./MarkerInfo"

export default function BUMap() {
    const [thisData, setThisData] = useState('')
    const [isClicked, setIsClicked] = useState('')
    const [locMarkerCenter, setLocMarkerCenter] = useState('')
    const [locMarkerId, setLocMarkerId] = useState(0)
    const [locMarkerName, setLocMarkerName] = useState('')
    const [isMarkerData, setIsMarkerData] = useState(false)
    // marker data

    useEffect(() => {
        console.log(`useEffectCalled ${isMarkerData}`)
        if (isMarkerData) {

            fetch('http://localhost:5000/api/map/marker/data', {
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
                    console.log(`fromget ${JSON.stringify(myJson)}`)
                    if (!myJson.err) {
                        console.log('entered')
                        myJson.success.map(d => {

                            setLocMarkerCenter(d.markerCenter)
                            setLocMarkerId(d.markerId)
                            setLocMarkerName(d.markerName)
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    }, [isMarkerData])

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
            <button type="button" className="btn btn-primary" onClick={
                async () => {
                    let resultData = await
                        searchLocation();
                    if (resultData) setIsMarkerData(true)
                }}>Display Map</button>

            <div>Local Center is{locMarkerCenter}</div>
            {(isMarkerData) ? <MarkerInfo locCenter={locMarkerCenter} LocName={locMarkerName} locId={locMarkerId} /> : <div>No Marker Info</div>}

        </div>
    )

}