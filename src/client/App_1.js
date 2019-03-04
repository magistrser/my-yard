import React, { Component } from 'react';
import { YMaps, Map } from 'react-yandex-maps';

export class App_1 extends Component {
    render() {
        const apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`; 
        // Works somehow without api key
        const state = {
            center: [55.75, 37.57],
            zoom: 9
        }
        return (
            <div>
                <h1>react-yandex-maps</h1>
                <YMaps query={{ apikey}}>
                    <Map defaultState={state}  width='100%' height='100vh'/>
                </YMaps>
            </div>
        );
    }
}

export default App_1;
