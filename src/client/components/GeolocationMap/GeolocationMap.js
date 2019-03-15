import React, { Component } from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from 'react-yandex-maps';
import './GeolocationMap.css';

export class GeolocationMap extends Component {
    constructor() {
        super();
        this.state = {
            center: [55.771707, 37.678784],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl'],
        };
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
    }

    onMapClick = async e => {
        let result = await this.ymapsAPI.geolocation.get({ provider: 'auto' }); // "yandex", "browser" or "auto"
        console.log('Geolocation: ', result); // Geolocation objects
        let countryName = result.geoObjects.get(0).getCountry();
        document.querySelector('div .overlay').innerHTML = `<p>${countryName}</p>`;
    };

    render() {
        return (
            <>
                <div className="overlay" />
                <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                    <Map
                        className="map-container"
                        onClick={this.onMapClick}
                        onLoad={ymaps => (this.ymapsAPI = ymaps)} // Keep ymaps api instance as a field
                        instanceRef={map => (this.mapInstance = map)} // Keep map instance as a field
                        state={this.state}
                    >
                        <GeolocationControl
                            options={{ float: 'right' }}
                            onClick={e => console.log('Click on geolocation button event: ', e)}
                        />
                    </Map>
                </YMaps>
            </>
        );
    }
}
