const mapboxgl = require('mapbox-gl')
const mapGeocoder = require('mapbox-gl-geocoder')
const MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js')
const buUuId = require('uuid');
const MarkerInfo = require('../HooksComponents/MarkerInfo')

let allFavPlaces = [{ places: [] }]

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw'

const displayMap = () => {
    return new mapboxgl.Map({
        container: 'buMap',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 9
    });
}
const findMyLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
        return new mapboxgl.Map({
            container: 'buMap',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 13
        }).addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }))
    })
}
const addMarker = () => {

    navigator.geolocation.getCurrentPosition(position => {
        let thisMap = new mapboxgl.Map({
            container: 'buMap',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 9
        })
        new mapboxgl.Marker({
            color: "#00FFFF",
            draggable: true
        })
            .setLngLat([position.coords.longitude, position.coords.latitude])
            .addTo(thisMap)
    })
}
const markedPlaces = () => {

}
const thisItemValue = (itemValue) => { console.log(itemValue.place_name); return itemValue.place_name; }
const searchLocation = async () => {
    //https://api.mapbox.com/geocoding/v5/mapbox.places/central%20park.json?
    //proximity=ip&types=place%2Cpostcode%2Caddress&
    //access_token=pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            const marker = {
                color: "#00FFFF"
            }
            let thisMap = new mapboxgl.Map({
                container: 'buMap',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 9,
            }).on('load', () => {
                let thisGeocoder = new mapGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                    marker: true

                }).on('result', (item) => {
                    thisMap.setCenter(item.result.center)
                    thisMap.setZoom(10)
                    let thisMarker = new mapboxgl.Marker({
                        color: "#00FFFF"
                    })
                        .setLngLat(item.result.center)
                        .addTo(thisMap)
                    thisMarker.getElement().addEventListener('click', async (e) => {
                        console.log(`ClickedMarker ${JSON.stringify(e)}`);
                        //change route to specific marker
                        let markerLocImg = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${item.result.center[0]},${item.result.center[1]},11/500x300?access_token=${mapboxgl.accessToken}`
                        let postedData = await postMarkerInfo(item.result.place_name, item.result.center, buUuId.v4(), markerLocImg)
                        if (postedData) resolve(true)

                    });
                    return thisMarker
                })
                thisMap.addControl(thisGeocoder)
            })

        })
    })

    //https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?country=US&access_token=pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw
    //array of objects features
    //object properties
    //center
}
const postMarkerInfo = (markerName, markerCenter, markerId, markerLocImg) => {
    let markerInfo = {
        markerName, markerCenter, markerId, markerLocImg
    }
    return new Promise(async (resolve, reject) => {

        try {
            let thisResponse = await fetch('http://localhost:5000/api/map/marker/data', {
                body: JSON.stringify(markerInfo),
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                redirect: 'follow'
            })
            let sendData = await thisResponse.json()
            console.log(sendData)
            resolve(sendData)

        } catch (error) {
            reject(error)
        }

    })

    /*  .then(function (response) {
         return response.json();
     })
     .then(function (myJson) {
         console.log(myJson);
     })
     .catch(err => console.log(err)) */
}
const directionSetUp = () => {
    navigator.geolocation.getCurrentPosition(position => {
        let thisMap = new mapboxgl.Map({
            container: 'buMap',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 9
        }).on('load', function () {
            var directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken
            });
            thisMap.addControl(directions, 'top-left');

            directions.setOrigin('Flagler dr, West Palm Beach');
            directions.setDestination('Ocean dr, Jupiter');
        });
    })
}
module.exports = { findMyLocation, displayMap, addMarker, markedPlaces, searchLocation, directionSetUp }