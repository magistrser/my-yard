import * as React from 'react';
import { Helmet }  from "react-helmet";

type Props = {
    //
};

type State = {
    ymap: Object
};

export default class YMap extends React.Component<Props, State> {
    componentDidMount() {

        const script = document.createElement("script");
        script.src = "https://api-maps.yandex.ru/2.1/?apikey=9d4c59f1-72a1-418f-a219-a1734042cd50&load=Map&lang=ru_RU&onload=ymapOnLoad";
        script.async = true;
        document.body.appendChild(script);
/*
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = 'function ymapOnLoad() {document.write("[ymap] onload")}';
        document.body.appendChild(s);
*/
        window.ymapOnLoad = () => {document.write("[ymap] onload")};
    }

    render() {
        return (
            <div>
                <h1>Experiments with yandex API</h1>
            </div>
        );
    }
}
