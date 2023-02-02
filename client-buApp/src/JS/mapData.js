//require('mapbox-gl/dist/mapbox-gl.css');


const mapboxgl = require('mapbox-gl')
mapboxgl.accessToken =
    //'pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw'
    'pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw';

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
        }));
    })
}
module.exports = { findMyLocation, displayMap }