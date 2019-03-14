import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './PlacemarkMap.css';

export class PlacemarkMap extends Component {
    constructor() {
        super();
        this.state = {
            center: [55.771707, 37.678784],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl'],
            placemarks: [{ y: 55.771707, x: 37.678784 }],
        };
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
    }

    addPlacemark = (y, x) => {
        this.setState(prevState => ({
            placemarks: [...prevState.placemarks, { y, x }],
        }));
    };

    handleMapClick = ev => {
        // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/events-docpage/
        const coords = ev.get('coords');
        console.log(coords); // Geo coordinates
        this.addPlacemark(...coords);
    };

    handleButtonClick = ev => {
        this.addPlacemark(
            55.771707 + (-Math.random()) ** (~~(Math.random() + 0.5) + 1),
            37.678784 + (-Math.random()) ** (~~(Math.random() + 0.5) + 1)
        );
    };

    handlePlacemarkClick = ev => {
        // Get object that invoked event (in yandex API event model)
        const placemark = ev.get('target');
        console.dir(placemark);
        // Set placemark options dynamically (one of default icons, see link below)
        // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/geoobjects-docpage/#geoobjects__icon-style
        placemark.options.set('preset', 'islands#blueWaterwayIcon');
    };

    handlePlacemarkContextMenu = ev => {
        const placemark = ev.get('target'); // Remove "menu" if it is there
        document.getElementById('menu')?.remove();

        let leftOffset = ev.get('pagePixels')[0]; // Get screen coords
        let topOffset = ev.get('pagePixels')[1];
        console.log(`${leftOffset}, ${topOffset}`);

        // Show "menu" on this coordinates:
        let menu = document.createElement('div');
        menu.addEventListener('click', e => document.getElementById('menu')?.remove());
        menu.id = 'menu';
        menu.innerHTML = '<h3>Меню</h3>';
        menu.style.left = `${leftOffset}px`;
        menu.style.top = `${topOffset}px`;
        document.body.appendChild(menu);
    };

    render() {
        return (
            <>
                <div className="overlay">
                    <button id="add-random-placemark" onClick={this.handleButtonClick}>
                        ADD PLACEMARK
                    </button>
                </div>
                <div className="map-container">
                    <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                        <Map
                            onClick={this.handleMapClick}
                            onLoad={ymaps => (this.ymapsAPI = ymaps)}
                            state={this.state}
                            width="100%"
                            height="100vh"
                        >
                            <Placemark
                                defaultGeometry={this.state.center}
                                properties={{
                                    hintContent: 'Статически добавленная метка',
                                    balloonContent: 'Метка с кастомным значком',
                                }}
                                options={{
                                    // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/geoobjects-docpage/#geoobjects__icon-style
                                    iconLayout: 'default#image',
                                    // Placemark can be any image or css-sprite
                                    iconImageHref: 'https://png.pngtree.com/svg/20150401/5d42bc059c.svg',
                                    iconImageSize: [60, 60],
                                    // Left upper icon corner offset relative to its pointer
                                    iconImageOffset: [-5, -38],
                                }}
                                onClick={this.handlePlacemarkClick}
                                onContextmenu={this.handlePlacemarkContextMenu}
                            />

                            {this.state.placemarks.map((pm, i) => (
                                <Placemark key={i} defaultGeometry={[...Object.values(pm)]} onClick={this.handlePlacemarkClick} />
                            )) /*This adds placemarks dynamically*/}
                        </Map>
                    </YMaps>
                </div>
            </>
        );
    }
}
