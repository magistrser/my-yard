import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './PlacemarkMap.css';

export class PlacemarkMap extends Component {
    constructor() {
        super();
        this.state = {
            apikey: `9d4c59f1-72a1-418f-a219-a1734042cd50`,
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
        console.log(coords); // Координаты
        this.addPlacemark(...coords);
    };

    handleButtonClick = ev =>
        this.addPlacemark(
            55.771707 + (-Math.random()) ** (~~(Math.random() + 0.5) + 1),
            37.678784 + (-Math.random()) ** (~~(Math.random() + 0.5) + 1)
        );

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
                                    iconImageHref: 'https://png.pngtree.com/svg/20150401/5d42bc059c.svg',
                                    iconImageSize: [60, 60],
                                    // Смещение левого верхнего угла иконки относительно
                                    // её "ножки" (точки привязки).
                                    iconImageOffset: [-5, -38],
                                }}
                            />

                            {this.state.placemarks.map((pm, i) => (
                                <Placemark key={i} defaultGeometry={[...Object.values(pm)]} />
                            )) /*Динамическое добавление меток*/}
                        </Map>
                    </YMaps>
                </div>
            </>
        );
    }
}
