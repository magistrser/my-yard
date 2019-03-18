import React, { Component } from 'react';
import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps';
import './UserClickMap.css';

export default class UserClickMap extends Component {
    constructor() {
        super();
        this.state = {
            // Map state
            center: [55.771707, 37.678784],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
            // Component state
            isInAddMode: false,
        };
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
        //this.isInAddMode = false;
    }

    handleAddNewPlacemarkBtnClick = ev => {
        // Change cursor depending on
        ev.preventDefault();
        if (!this.state.isInAddMode) {
            this.cursor.setKey('crosshair');
        } else {
            this.cursor.setKey('grab');
        }
        this.setState(prevState => {
            return { ...prevState, isInAddMode: !prevState.isInAddMode };
        });
    };

    handleMapClick = ev => {
        if (this.state.isInAddMode) {
            ev.preventDefault();
            this.addPlaceMark(ev);
            //this.setState(); // No need to set state, map refreshes itself
        }
    };

    addPlaceMark = ev => {
        // Add placemark using api directly
        const coords = ev.get('coords');
        const placemark = new this.ymapsAPI.Placemark(
            coords,
            {
                iconContent: `${coords}`,
            },
            {
                preset: 'islands#greenStretchyIcon',
            }
        );
        this.mapInstance.geoObjects.add(placemark);
    };

    handleMapLoaded = map => {
        this.mapInstance = map; // Keep ymaps api instance as a field
        console.log('Maps instance', map);
        // Add managed cursor and save it as a field
        // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/util.cursor.Manager-docpage/
        this.cursor = map.cursors.push('grab');
    };

    handleApiLoaded = ymaps => {
        this.ymapsAPI = ymaps; // Keep map instance as a field
        console.log('Api instance', ymaps);
    };

    render() {
        return (
            <div>
                <aside id="user-click-aside">
                    <p>Options</p>
                    <button
                        className={this.state.isInAddMode ? 'user-click-button-on' : 'user-click-button-off'}
                        id="add-new-placemark"
                        onClick={this.handleAddNewPlacemarkBtnClick}
                    >
                        Add new placemark
                    </button>
                </aside>
                <main id="user-click-main">
                    <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                        <Map
                            onClick={this.handleMapClick}
                            className="map-container"
                            onLoad={this.handleApiLoaded}
                            instanceRef={this.handleMapLoaded}
                            state={this.state}
                        />
                    </YMaps>
                </main>
            </div>
        );
    }
}
