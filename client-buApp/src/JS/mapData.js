//require('mapbox-gl/dist/mapbox-gl.css');


const mapboxgl = require('mapbox-gl')

const displayMap = () => {
    mapboxgl.accessToken =
        //'pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw'
        'pk.eyJ1IjoiYW5nZWxyZWYiLCJhIjoiY2w0czNxMTA2MGkzcjNqbzB5cjlkM3BkaSJ9.gpg4wdvg4dobgzcw795VQw';
    return new mapboxgl.Map({
        container: 'buMap',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 9
    });
}

const testFunc = () => console.log("myName")
module.exports = { testFunc, displayMap }