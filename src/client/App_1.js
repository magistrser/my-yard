import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export class App_1 extends Component {
    render() {
        const apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
        // Works somehow without api key
        const state = {
            center: [55.75, 37.57],
            zoom: 9,
            controls: ['zoomControl', 'fullscreenControl'],
        };

        return (
            <div>
                <h1>react-yandex-maps</h1>
                <YMaps query={{ apikey, load: 'package.full' }}>
                    <Map defaultState={state} width="100%" height="100vh">
                        <Placemark
                            defaultGeometry={[55.75, 37.57]}
                            properties={{
                                balloonContentBody: `<h3>BALOON</h3><input type="button" value="OK"/><script>alert('?')</script>`,
                            }}
                        />
                    </Map>
                </YMaps>
            </div>
        );
    }
}

export default App_1;
