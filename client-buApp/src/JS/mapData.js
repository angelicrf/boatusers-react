
const mapboxgl = require('mapbox-gl')
const mapGeocoder = require('mapbox-gl-geocoder')
const MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js')
const buUuId = require('uuid');
const MarkerInfo = require('../HooksComponents/MarkerInfo')
const { ImageSource } = require('../images/locationImgs')
let allFavPlaces = [{ places: [] }]

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw'

export function displayMap() {
    return new mapboxgl.Map({
        container: 'buMap',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 9
    });
}
export function findMyLocation() {
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
export function addMarker() {

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
export function markedPlaces() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            let thisMap = new mapboxgl.Map({
                container: 'buMap',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 9
            })
            ImageSource.forEach(async (element) => {

                for (let i = 0; i < element.cityImg.length; i++) {
                    element.cityImg[i].cityCenter = await convertNametoLongLat(element.cityImg[i].cityName)
                    new mapboxgl.Marker({
                        color: "#00FFFF"
                    })
                        .setLngLat(element.cityImg[i].cityCenter)
                        .addTo(thisMap)
                        .getElement().addEventListener('click', async (e) => {
                            let postedMarkersData = await postMarkerInfo('markers', element.cityImg[i].cityName, element.cityImg[i].cityCenter, element.cityImg[i].cityId, element.cityImg[i].citySrc)
                            if (postedMarkersData) resolve(true)
                        })
                }
            })
        })
    })
}
export function convertNametoLongLat(thisAddress) {
    let thisUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${thisAddress}.json?country=US&access_token=pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw`

    return new Promise((resolve, reject) => {
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
                if (!myJson.err) {
                    myJson.features.map((d, index) => {
                        if (index === 0) {
                            resolve(d.center)
                        }
                    })
                }
            })
            .catch(err => console.log(err))
    })

}
const thisItemValue = (itemValue) => { console.log(itemValue.place_name); return itemValue.place_name; }
export async function searchLocation() {
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
                        let markerLocImg = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${item.result.center[0]},${item.result.center[1]},11/500x300?access_token=${mapboxgl.accessToken}`
                        let postedData = await postMarkerInfo('marker', item.result.place_name, item.result.center, buUuId.v4(), markerLocImg)
                        if (postedData) resolve(true)

                    });
                    return thisMarker
                })
                thisMap.addControl(thisGeocoder)
            })

        })
    })
}
export function postMarkerInfo(thisRoute, markerName, markerCenter, markerId, markerLocImg) {
    let markerInfo = {
        markerName, markerCenter, markerId, markerLocImg
    }
    return new Promise(async (resolve, reject) => {

        try {
            let thisResponse = await fetch(`http://localhost:5000/api/map/${thisRoute}/data`, {
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
}
export function directionSetUp() {
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