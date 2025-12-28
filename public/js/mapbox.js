/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1IjoibGVzemVrLW1pa3J1dCIsImEiOiJjbWpvbzEyeGkxYzAwM2VxeWx6c3R2cHMxIn0.3eX0nGEqhWB_2Cgbk1GgRA';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/leszek-mikrut/cmjopdrr5004z01r0h5rd3om0', // style URL
  scrollZoom: false
  // center: [-118.113491, 34.111745], // starting position [lng, lat]
  // zoom: 7, // starting zoom
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(location => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';
  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  }).setLngLat(location.coordinates).addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(location.coordinates)
    .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
    .addTo(map);

  // Extends map bounds to include current location
  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
