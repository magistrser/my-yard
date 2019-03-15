import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './GeolocationMap.css'

export class GeolocationMap extends Component {
    constructor() {
        super();
        this.state = {
            center: [55.771707, 37.678784],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl']
        };
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
    }

    onMapClick = async e => {
      let result = await this.ymapsAPI.geolocation.get({provider:"auto"}); // "yandex", "browser" or "auto"
      console.log("Geolocation: ",result); // Geolocation objects
      let countryName = result.geoObjects.get(0).getCountry();
      document.querySelector('div .overlay').innerHTML = `<p>${countryName}</p>`;
    }
    
    render() {
        return (
            <>
                <div className="overlay">
                </div>
                <div className="map-container">
                    <YMaps query={{ apikey: this.apikey, load: 'package.full' }} >
                        <Map
                            onClick={this.onMapClick}
                            onLoad={ymaps => this.ymapsAPI = ymaps} // Keep ymaps api instance as a field
                            instanceRef={map => this.mapInstance = map} // Keep map instance as a field
                            state={this.state}
                            width="100%"
                            height="100vh"
                        />
                    </YMaps>
                </div>
            </>
        );
    }
}