/**
 * https://vk.com/dev/Auth
 */

import React, { Component } from 'react';
import axios from 'axios';
import md5 from '../../../../utils/md5';

export default class WidgetExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            vkAuthDynamicInfo: [],
            data: {},
            validationColor: 'black',
        };
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://vk.com/js/api/openapi.js?160';
        script.id = 'vk_script';
        document.head.appendChild(script);
        // HACK: This one kinda bad, need to check if VK api loaded somehow instead of waiting for 0.5 sec
        // TODO: Check if it is loaded every 100ms untill its loaded or timelimit reached, for example
        setTimeout(() => {
            console.log('VK instance: ', VK);
            VK.init({ apiId: 6907668 });
            this.setState({ loading: false });
            this.initDynamicWidget();
            this.initOrdinaryWidget();
        }, 500);
    }

    initDynamicWidget() {
        VK.Widgets.Auth('vk_auth_dynamic', {
            onAuth: data => {
                const authInfo = [];
                authInfo.push('onAuth is called');
                for (let key of Object.keys(data)) {
                    if (key === 'session') {
                        authInfo.push(
                            `${key} = { 
                                ${Object.keys(data[key]).reduce((acc, item) => (acc += `${item}, `), '')}
                            }`
                        );
                    } else {
                        authInfo.push(`${key} = ${data[key]}`);
                    }
                }
                this.setState({ vkAuthDynamicInfo: authInfo, data });
                console.log('data object from dynamic widget', data);
            },
        });
    }

    initOrdinaryWidget() {
        VK.Widgets.Auth('vk_auth_ordinary', {
            authUrl: 'http://localhost/widgets', // Url to redirect with get query string (should be server endpoint)
            // onAuth makes widget dynamic so authUrl is ignored
        });
    }

    componentWillUnmount() {
        // Delete VK script so other examples work properly
        const script = document.getElementById('vk_script');
        document.head.removeChild(script);
    }

    handleValidationBtnClick = ev => {
        // To validate authorization we should compare hash and md5(app_id+user_id+secret_key)
        // SHOULD BE DONE ON SERVER!
        const app_id = '6907668';
        const user_id = this.state.data.uid.toString();
        const secret_key = 'wJVp247QPfcwcLdAeUjB';
        const validationColor = md5(app_id + user_id + secret_key) === this.state.data.hash ? 'green' : 'red';
        this.setState({ validationColor });
    };

    render() {
        return (
            <div>
                <h1>Виджеты авторизации</h1>
                <p>
                    С помощью виджета для авторизации Вы можете максимально просто предоставить пользователям возможность авторизовываться
                    на Вашем ресурсе. Перед авторизацией пользователь сможет увидеть свою фотографию и уже авторизовавшихся друзей. Виджет
                    поддерживает два вида авторизации:
                </p>
                <h2>Динамический</h2>
                {this.state.loading ? <h2>Loading...</h2> : <div id="vk_auth_dynamic" />}
                <p>
                    После авторизации будет вызвана функция onAuth c объектом data, содержащим поля{' '}
                    <b>uid, first_name, last_name, photo, photo_rec, session, hash,</b> также пользователь будет авторизован в openApi.
                </p>
                <div id="vk_auth_dynamic_info" style={{ border: '2px solid black' }}>
                    {this.state.vkAuthDynamicInfo.map((item, i) => (
                        <p key={i}>{item}</p>
                    ))}
                    {this.state.data?.hash ? (
                        <div id="vk_validation" style={{ border: `2px solid ${this.state.validationColor}` }}>
                            <p>
                                Для проверки авторизации Вы можете использовать полученный параметр hash, сравнив его с md5 подписью от
                                app_id+user_id+secret_key, например md5(194253766748fTanppCrNSeuYPbA4ENCo).
                            </p>
                            <button onClick={this.handleValidationBtnClick}>Проверить авторизацию</button>
                        </div>
                    ) : null}
                </div>
                <h2>Обычный</h2>
                {this.state.loading ? <h2>Loading...</h2> : <div id="vk_auth_ordinary" />}
                <p>
                    Пользователь будет переадресован на указанный в параметре authUrl адрес с полями:{' '}
                    <b>uid, first_name, last_name, photo, photo_rec, hash</b>
                </p>
                <div style={{ border: '2px solid black' }}>Query string: {document.location.search}</div>
            </div>
        );
    }
}
