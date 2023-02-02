//require('mapbox-gl/dist/mapbox-gl.css');

const mapboxgl = require('mapbox-gl')
const mapGeocoder = require('mapbox-gl-geocoder')

mapboxgl.accessToken =
    //'pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw'
    //'pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw';
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
const searchLocation = () => {
    //https://api.mapbox.com/geocoding/v5/mapbox.places/central%20park.json?
    //proximity=ip&types=place%2Cpostcode%2Caddress&
    //access_token=pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw

    navigator.geolocation.getCurrentPosition(position => {
        let thisMap = new mapboxgl.Map({
            container: 'buMap',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 9
        })
        thisMap.addControl(
            new mapGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        )

    })
}
module.exports = { findMyLocation, displayMap, addMarker, markedPlaces, searchLocation }