class YMapLoader{
    constructor() {
        this.ymap = null;
    }

    _runScriptForApiLoad() {
        const script = document.createElement("script");
        script.src = "https://api-maps.yandex.ru/2.1/?apikey=9d4c59f1-72a1-418f-a219-a1734042cd50&load=Map&lang=ru_RU&onload=ymapOnLoad&onerrorYmapOnError";
        script.async = true;
        document.head.appendChild(script);
    }

    getApi() {
        return new Promise((resolve, reject) => {
            if(this.ymap) {
                resolve(this.ymap)
                return;
            }

            this._runScriptForApiLoad();

            window.ymapOnLoad = ymap => {
                this.ymap = ymap;
                resolve(ymap);
            };

            window.ymapOnError = error => {
                reject(error);
            }
        });


    }
}

const _ymapLoader = new YMapLoader();
export const ymapLoader = _ymapLoader;
