mapboxgl.accessToken = "pk.eyJ1IjoiYW5hbm1heSIsImEiOiJjbDk0azNmY3oxa203M3huMzhyZndlZDRoIn0.1L-fBYplQMuwz0LGctNeiA";


// creating map

const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/ananmay/clb46qysm000l14kyvn8q1gjh", // custom Mapbox Studio style URL
    center: [-79.380331532, 43.646497454], // starting center in [lng, lat]
    zoom: 12,
});

map.on('load', () => {

    // bikeways layer

    map.addSource('cycling', {
        type: 'geojson',
        // using a URL for the external geojson to load.
        data: 'https://ananmaysharan.github.io/ggr472-lab2/cycling-network.geojson'
    });

    map.addLayer({
        'id': 'cyclinglines',
        'type': 'line',
        'source': 'cycling', // matching source ID from addSource method
        'paint': { // styling line
            'line-color': '#b42222',
            'line-width': 3,
            'line-opacity': 0.4
        }
    },
    );

    map.addSource('bikeshare', {
        type: 'geojson',
        // using a URL for the external geojson to load.
        data: 'https://ananmaysharan.github.io/ggr472-lab2/bikeshare.geojson'
    })
    map.addLayer({
        'id': 'bikesharenetwork',
        'type': 'circle',
        'source': 'bikeshare',
        'paint': { // styline points
            'circle-radius': 6,
            'circle-color': '#B42222'
        }
    }
    );

    // When a click event occurs on a feature in the bike stations layer, open a popup at the
    // location of the feature, with station name and the number of bike docks in HTML, from its properties.

    map.on('click', 'bikesharenetwork', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice(); // get coordinates
        const station = e.features[0].properties.station; // get station name
        const docks = e.features[0].properties.Total_docks; // get number of docks


        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to. (from mapbox example)
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup() // creating popup
            .setLngLat(coordinates) // setting coords
            .setHTML('<p>' + "Station Name: " + station + '<br>' + "Bike Docks: " + docks + '</p>') // adding HTML
            .addTo(map);
    });

    document.getElementById('state-legend'); // adding legend 
    document.getElementById('title').innerHTML = "Map of Toronto Bikeways and Bike Share Stations"



});