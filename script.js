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
    });

    map.addSource('cycling', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://ananmaysharan.github.io/ggr472-lab2/cycling-network.geojson'
        });

        map.addLayer({
            'id': 'cyclinglines',
            'type': 'fill',
            'source': 'cycling', //must match source ID from addSource method
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
                'paint': {
                'line-color': '#888',
                'line-width': 8
                }
        },
             'uoft-buildings' //Drawing order - place below points
        );
});