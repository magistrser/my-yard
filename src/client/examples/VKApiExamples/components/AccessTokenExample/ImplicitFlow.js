/**
 * https://vk.com/dev/implicit_flow_user
 */

import React from 'react';

export default function ImplicitFlow() {
    function handleLoginClick(ev) {
        ev.preventDefault();
        location.href =
            'https://oauth.vk.com/authorize?' +
            'client_id=6907668' + // Our app id
            '&scope=email' + // Required permissions
            '&redirect_uri=localhost:3000' + // Where to redirect after login (yup, localhost works)
            '&display=popup' + // page, popup or mobile
            '&response_type=token' + // token or code
            '&state=arbitrary_string' + // Returned in answer
            '&revoke=1' + // Asks for permissions even if user is already authorized (0 by default)
            '&v=5.92'; // version of api (mandatory)
    }

    function outputAnswer() {
        if (!location.href.includes('#')) {
            return null;
        }
        const poundIndex = location.href.indexOf('#');
        const params = location.href.slice(poundIndex + 1).split('&');
        return params.map(param => {
            const paramArray = param.split('=');
            return (
                <li key={paramArray[0]}>
                    {paramArray[0]} = {paramArray[1]}
                </li>
            );
        });
    }

    return (
        <div>
            <h1>Implicit Flow</h1>
            <p>
                Используйте Implicit Flow для вызова методов API ВКонтакте непосредственно с устройства пользователя (например, из
                Javascript). Ключ доступа, полученный таким способом, не может быть использован для запросов с сервера.
            </p>
            <button onClick={handleLoginClick}>Войти через ВКонтакте</button>
            {outputAnswer()}
        </div>
    );
}
