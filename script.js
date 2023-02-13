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
    /*ADDING A SOURCE FROM A GEOJSON FILE*/
    map.addSource('uoft', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Sidney Smith Hall"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.39865237301687,
                            43.662343395037766
                        ],
                        "type": "Point"
                    }
                }
            ]
        }
    })
    map.addLayer({
        'id': 'uoft-buildings',
        'type': 'circle',
        'source': 'uoft',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
        }
    });

    map.addSource('ct', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://raw.githubusercontent.com/ananmaysharan/ggr472-lab1/main/torontoct.geojson'
        });

        map.addLayer({
            'id': 'ctadd',
            'type': 'fill',
            'source': 'ct', //must match source ID from addSource method
            'paint': {
                'fill-color': '#888888',
                'fill-opacity': 0.4,
                'fill-outline-color': 'black'
            },
        },
             'uoft-buildings' //Drawing order - place below points
        );
});