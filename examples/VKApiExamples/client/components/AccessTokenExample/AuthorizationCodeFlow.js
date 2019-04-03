/**
 * Authorization Code flow is used in on-server authentication
 * https://vk.com/dev/authcode_flow_user
 */

import React from 'react';

export default function AuthorizationCodeFlow() {
    return (
        <div>
            <h1>Authorization code flow</h1>
            <p>
                Используйте Authorization Code Flow для вызова методов API ВКонтакте с серверной части Вашего приложения (например, из PHP).
                Ключ доступа, полученный таким способом, не привязан к IP-адресу, но набор прав, которые может получить приложение,
                ограничен из соображений безопасности.
            </p>
            <button onClick={handleLoginClick}>Авторизцаия через сервер</button>
        </div>
    );

    function handleLoginClick(ev) {
        ev.preventDefault();
        location.href =
            'https://oauth.vk.com/authorize?' +
            'client_id=6907668' + // Our app id
            '&scope=email' + // Required permissions
            '&redirect_uri=http://localhost/api/getToken' + // Our server login endpoint
            '&display=page' + // page, popup or mobile
            '&response_type=code' + // Will be sent to our server as a get query. Can be used within 1 hour to get access token from server
            '&state=arbitrary_string' + // Returned in answer
            '&revoke=1' + // Asks for permissions even if user is already authorized (0 by default)
            '&v=5.92'; // version of api (mandatory)
    }
}
