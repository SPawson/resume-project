    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: {
                lat: 53.79648,
                lng: -1.54785
            }
        });

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var locations = [
            { lat: 53.8008, lng: -1.5491 },
            { lat: 53.4808, lng: -2.2426 },
            { lat: 51.5074, lng: -0.1278 },
            { lat: 55.9533, lng: -3.1883 }
        ];

        var markers = locations.map(function(location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length] //the modulus op means that if locations >26 it will start at z and go back through the string 
            })
        })

        var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    }
    