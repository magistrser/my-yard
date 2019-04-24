import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export default class PostsMap extends Component {
    constructor(props) {
        super(props);
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
        this.state = {
            center: [55.771707, 37.678784],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl'],
            isYmapsAPILoaded: false,
            placemarks: [{ y: 55.771707, x: 37.678784 }],
        };
    }
    render() {
        return (
            <div className="map-container">
                <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                    <Map
                        onClick={this.handleMapClick}
                        onLoad={ymaps => {
                            this.ymapsAPI = ymaps;
                            this.setState({ isYmapsAPILoaded: true });
                        }}
                        state={this.state}
                        width="100%"
                        height="90vh"
                    >
                        {this.state.placemarks.map((pm, i) => (
                            <Placemark key={i} defaultGeometry={[...Object.values(pm)]} />
                        ))}
                    </Map>
                </YMaps>
            </div>
        );
    }
}
