import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export class PlacemarkMap extends Component {
    constructor() {
        super();
        this.state = {
            apikey: `9d4c59f1-72a1-418f-a219-a1734042cd50`,
            center: [55.771707, 37.678784],
            zoom: 11,
            controls: ['zoomControl', 'fullscreenControl'],
            placemarks: [{ y: 55.771707, x: 37.678784 }],
        };
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
    }

    handleClick = ev => {
        console.dir(ev); // Отсюда надо достать координаты каким-то образом
        this.setState(prevState => ({
            placemarks: [
                ...prevState.placemarks,
                {
                    y: 55.771707 + Math.random() * 0.1,
                    x: 37.678784 + Math.random() * 0.1,
                },
            ],
        }));
    };
    render() {
        return (
            <div className="map-container">
                <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                    <Map
                        onClick={this.handleClick}
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
        );
    }
}
