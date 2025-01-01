
	
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style : "mapbox://styles/mapbox/dark-v11",
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 10 // starting zoom
    });


    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({color : "red"})
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML("<h5> exact location provided after booking</h5>") )
        .addTo(map);