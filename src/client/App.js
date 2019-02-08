import * as React from 'react';
import './app.css';
import ReactImage from './react.png';
import { ymapLoader } from './yandex/YmapLoader'

type Props = {
    //
};

type State = {
    username: ?string
};

const mapStyle = {
    width: '100%',
    height: '100vh'
}

export default class App extends React.Component<Props, State> {
    state = { username: null, ymap: { api: null, error: null }, map: null };

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));

        ymapLoader.getApi()
            .then(api => {
                this.setState({ymap: { api, error: null }});
                this._createMap();
            })
            .catch(error => this.setState({ymap: { api: null, error }}));
    }

    _createMap() {
        const { ymap } = this.state;
        let map = new ymap.api.Map('map', {
            center: [55.7, 37.6],
            zoom: 10
        });
        this.setState({ map: map })
    }

    render() {
        const { username, ymap } = this.state;
        return (
            <div>
                <div>
                {ymap.error ? <h1>{`Error loading YandexMap api: ${ymap.error}`}</h1> :
                    ymap.api ? <h1>{`YandexApi loaded   `}</h1> :
                        <h1>Loading.. please wait!</h1>
                }
                </div>
                <div id='map' style={mapStyle}></div>
            </div>
        );
    }
}
