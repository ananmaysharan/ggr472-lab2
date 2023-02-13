mapboxgl.accessToken = "pk.eyJ1IjoiYW5hbm1heSIsImEiOiJjbDk0azNmY3oxa203M3huMzhyZndlZDRoIn0.1L-fBYplQMuwz0LGctNeiA";


// create map

const map = new mapboxgl.Map({
    container: "map", // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: "mapbox://styles/ananmay/clb46qysm000l14kyvn8q1gjh", // style URL
    center: [-79.380331532, 43.646497454], // // starting center in [lng, lat]
    zoom: 12,
});

map.on('load', () => {

    map.addSource('cycling', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://ananmaysharan.github.io/ggr472-lab2/cycling-network.geojson'
        });

        map.addLayer({
            'id': 'cyclinglines',
            'type': 'line',
            'source': 'cycling', //must match source ID from addSource method
            'paint': {
                'line-color': '#b42222',
                'line-width': 3,
                'line-opacity': 0.4
            }
        },
        );


    map.addSource('bikeshare', {
        type: 'geojson',
        data: 'https://ananmaysharan.github.io/ggr472-lab2/bikeshare.geojson'
    })
    map.addLayer({
        'id': 'bikesharenetwork',
        'type': 'circle',
        'source': 'bikeshare',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
        }
    }
    );

    // When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'bikesharenetwork', (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const station = e.features[0].properties.station;
    const docks = e.features[0].properties.Total_docks;

     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML('<p>' + "Station Name: " + station + '<br>' + "Bike Docks: " + docks + '</p>')
    .addTo(map);
    });
     
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
    map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
    });

    const stateLegendEl = document.getElementById('state-legend');

    
});