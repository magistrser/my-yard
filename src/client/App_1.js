import React, { Component } from 'react';
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';

export class App_1 extends Component {
    constructor() {
        super();
        this.state = {
            apikey: `9d4c59f1-72a1-418f-a219-a1734042cd50`, // Works somehow without api key
            center: [55.771707, 37.678784],
            zoom: 11,
            controls: ['zoomControl', 'fullscreenControl'],
        };
    }

    render() {
        const btnZoomOnClickHandler = event => {
            event.preventDefault();
            console.log(this.refs.textZoom.value, this.refs.textZoom);

            const zoom = parseFloat(this.refs.textZoom.value);
            if (!zoom) {
                this.refs.textZoom.value = '';
                this.refs.textZoom.placeholder = 'NOPE';
                return;
            }
            this.setState({ zoom });
            /*
            There are two versions of YMap-related component properties:
            <property> and default<property> (state and defaultState for instance)
            We can change only not default verions by calling set state.
            */
        };

        // onLoad is called when map is loaded
        const mapOnLoadEventHandler = ymaps => {
            // Capture ymaps api object on load
            this.ymaps = ymaps;

            console.log("YMAPS instance",this.ymaps);
            // Create panel
            //let panel = this.ymaps.Panel(); // There is no panel!
            //this.mapInstance.controls.add(panel, { float: 'left' });
            //panel.setContent("!!!!!");
        }
        // instanceRef is called when component is mount (but before onLoad)
        const mapInstanceRefEventHandler = mapInstance => {
            this.mapInstance = mapInstance;
        }

        const apikey = this.state.apikey;
        return (
            <div>
                <h1>react-yandex-maps</h1>
                <div>
                    <label>Zoom value:</label>
                    <input type="text" ref="textZoom" />
                    <input type="button" name="btnZoom" onClick={btnZoomOnClickHandler} value="OK" />
                </div>
                <YMaps query={{ apikey, load: 'package.full' }} version={'2.1'}>
                    <Map state={this.state} 
                        width="100%" 
                        height="100vh" 
                        onClick={e => console.log('Clicked on map', e)}
                        onLoad={mapOnLoadEventHandler}
                        instanceRef={mapInstanceRefEventHandler}>
                        <Placemark
                            // That's how we catch api instance:
                            onLoad={ymaps =>
                                console.log(
                                    `onLoad on any component is fired when api is loaded. First argument is ymaps = ${ymaps}`,
                                    ymaps
                                )
                            }
                            defaultGeometry={[55.75, 37.57]}
                            properties={{
                                balloonContentBody: `<h3>BALOON</h3><input type="button" value="OK"/><script>alert('This script is in DOM, but it does nothing')</script>`,
                            }}
                        />
                        <Placemark
                        defaultGeometry={[55.75, 37.8]}
                        properties={{
                            // iFrame works as intended
                            balloonContentBody: `
                            <iframe src="http://localhost:3000/api/getExampleHtml">
                                <p>Your browser does not support iframes.</p>
                            </iframe>
                            `,
                        }}
                    />
                        <GeoObject // Arbitrary GeoObject
                            geometry={{
                                type: 'Polygon',
                                coordinates: [
                                    // Outer stroke vertices
                                    [[55.75, 37.8], [55.8, 37.9], [55.75, 38.0], [55.7, 38.0], [55.7, 37.8]],
                                    // Inner stroke vertices
                                    [[55.75, 37.82], [55.75, 37.98], [55.65, 37.9]],
                                ],
                                fillRule: 'nonZero',
                            }}
                            options={{
                                fillColor: '#00FF00',
                                strokeColor: '#0000FF',
                                opacity: 0.5,
                                strokeWidth: 5,
                                strokeStyle: 'shortdash',
                            }}
                            properties={{
                                balloonContent: `<h1 id="geoObjectBaloon">Любые HTML теги</h1>
                                                <script>document.getElementById("geoObjectBaloon").innerText="This script is in DOM, but it does nothing"</script>`,
                            }}
                        />
                    </Map>
                </YMaps>
                <script>console.log("This script is in DOM and it does nothing too");</script>
            </div>
        );
    }
}

export default App_1;
