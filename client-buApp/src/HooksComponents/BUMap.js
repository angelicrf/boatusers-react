import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addMarker, displayMap, findMyLocation, markedPlaces, searchLocation, directionSetUp } from "../JS/mapData"

export default function BUMap() {
    const [thisData, setThisData] = useState('')
    const [isClicked, setIsClicked] = useState('')
    const [isMarkersData, setIsMarkersData] = useState(false)
    const [isSearchMarkerData, setIsSearchMarkerData] = useState(false)
    const buNavigate = useNavigate();
    // marker data

    useEffect(() => {
        console.log(`useEffetSearchMarker ${isSearchMarkerData} and useEffectMarkers ${isMarkersData} `)
        if (isSearchMarkerData || isMarkersData) {

            let thisUrl = ''
            isSearchMarkerData ? thisUrl = 'http://localhost:5000/api/map/marker/data'
                : isMarkersData ? thisUrl = 'http://localhost:5000/api/map/markers/data'
                    : thisUrl = ''

            if (thisUrl !== '') {

                fetch(`${thisUrl}`, {
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
                                buNavigate('/MapLocInfo', { state: { locName: d.markerName, locId: d.markerId, locCenter: d.markerCenter, locImg: d.markerLocImg } })
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    }, [isSearchMarkerData, isMarkersData])

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
                    if (resultData) setIsSearchMarkerData(true)
                }}>Display Map</button>
            <button type="button" className="btn btn-danger" onClick={
                async () => {
                    let resultMarketData = await markedPlaces();
                    if (resultMarketData) setIsMarkersData(true)
                }}>Display Markers</button>
        </div>
    )

}