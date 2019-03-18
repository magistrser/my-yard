import React, { Component } from 'react';
import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps';
import './UserClickMap.css';

export default class UserClickMap extends Component {
    constructor() {
        super();
        this.state = {
            center: [55.771707, 37.678784],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
        };
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
    }

    render() {
        return (
            <div>
                <aside id="user-click-aside">Options</aside>
                <main id="user-click-main">
                    <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                        <Map
                            className="map-container"
                            onLoad={ymaps => (this.ymapsAPI = ymaps)} // Keep ymaps api instance as a field
                            instanceRef={map => (this.mapInstance = map)} // Keep map instance as a field
                            state={this.state}
                        />
                    </YMaps>
                </main>
            </div>
        );
    }
}
