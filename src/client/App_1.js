import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export class App_1 extends Component {
    constructor() {
        super();
        this.state = {
            apikey: `9d4c59f1-72a1-418f-a219-a1734042cd50`, // Works somehow without api key
            center: [55.75, 37.57],
            zoom: 9,
            controls: ['zoomControl', 'fullscreenControl'],
        };
    }

    render() {

        const btnZoomOnClickHandler = event => {
            event.preventDefault();
            console.log(this.refs.textZoom.value);

            const zoom = parseFloat(this.refs.textZoom.value); 
            if (!zoom) {
                this.refs.textZoom.value = "NOPE";
                return;
            }
            this.setState({ zoom });
            /*
            There are two versions of YMap-related component properties:
            <property> and default<property> (state and defaultState for instance)
            We can change only not default verions by calling set state.
            */
        }

        const apikey = this.state.apikey;
        return (
            <div>
                <h1>react-yandex-maps</h1>
                <div>
                    <label>Zoom value:</label>
                    <input type="text" ref="textZoom"/>
                    <input type="button" name="btnZoom" onClick={btnZoomOnClickHandler} value="OK"/>
                </div>
                <YMaps query={{ apikey, load: 'package.full' }}>
                    <Map state={this.state} 
                        width="100%"
                        height="100vh" 
                        onClick={(e) => console.log("Clicked on map", e)}> 
                        <Placemark
                            // That's how we catch api instance:
                            onLoad={(ymaps) => console.log(`onLoad on any component is fired when api is loaded. First argument is ymaps = ${ymaps}`, ymaps)}
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
