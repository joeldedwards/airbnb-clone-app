import * as React from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import getCenter from 'geolib/es/getCenter'

function MapBox({ searchResults }) {

    const coordinates = searchResults.map(result => ({
        latitude: result.lat,
        longitude: result.long,
    }));

    const center = getCenter(coordinates);

    const [viewState, setViewState] = React.useState({
        width: '100%',
        height: '100%',
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 10
    });


    return (
        <Map 
            mapStyle='mapbox://styles/trinicreations/clfueshgc001301qjbc8fmh41'
            mapboxAccessToken={process.env.MapboxAccessToken}
            {...viewState}
            onMove={(e) => setViewState(e.nextViewport)}>
            {
                searchResults.map((result) => (
                    <div key={result.id}>
                        <Marker 
                            longitude={result.long} 
                            latitude={result.lat} 
                            anchor='bottom'>
                            <p className='cursor-pointer text-2xl'>
                                📍
                            </p>
                        </Marker>
                    </div>
                ))
            }
        </Map>
    )
}

export default MapBox