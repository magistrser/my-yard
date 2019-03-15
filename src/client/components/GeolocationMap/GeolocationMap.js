import React, { Component } from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from 'react-yandex-maps';
import './GeolocationMap.css';
import draggifyDiv from './draggifyDiv';

export class GeolocationMap extends Component {
    constructor() {
        super();
        this.state = {
            center: [55.771707, 37.678784],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
        };
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
    }

    componentDidMount() {
        let overlay = document.getElementById('geolocation-overlay');
        draggifyDiv(overlay);
    }

    // Get geolocation data
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/geolocation-docpage/
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geolocation-docpage/
    handleGetGeodataClick = async e => {
        let result = await this.ymapsAPI.geolocation.get({
            /* List of options: */
            autoReverseGeocode: true, // This option might be payed (see docs)
            mapStateAutoApply: true,
            provider: 'auto', // "yandex" - by IP and yandex spying services, "browser" - by geolocation API or "auto"
            timeout: 3000,
            useMapMargin: true,
        });
        console.log('Geolocation result: ', result);
        // Result contains geoObjects array (of one) that could be added to the map (not necessarily)
        this.mapInstance.geoObjects.add(result.geoObjects); // This makes your location appear on the map
        // Get information about user location:
        let countryName = result.geoObjects.get(0).getCountry();
        let address = result.geoObjects.get(0).properties.get('text');
        let coodinates = result.geoObjects.get(0).geometry.getCoordinates();

        document.querySelector('div .overlay > #overlay-content').innerHTML = `
        <h3>Страна:</h3>
        <p>${countryName}</p>
        <h3>Адрес:</h3>
        <p>${address}</p>
        <h3>Координаты:</h3>
        <p>${coodinates}</p>
        `;
    };

    render() {
        return (
            <>
                <div className="overlay" id="geolocation-overlay">
                    <button id="get-geodata" onClick={this.handleGetGeodataClick}>
                        Вычислить по айпи
                    </button>
                    <div id="overlay-content" />
                </div>
                <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                    <Map
                        className="map-container"
                        onLoad={ymaps => (this.ymapsAPI = ymaps)} // Keep ymaps api instance as a field
                        instanceRef={map => (this.mapInstance = map)} // Keep map instance as a field
                        onClick={handleMapClick}
                        state={this.state}
                    />
                </YMaps>
            </>
        );
    }
}
