import React, { Component } from 'react';
import styles from './Header.module.css';

export default function Header(props) {
    return (
        <header className={styles.header}>
            <h1>header</h1>
            {!props.isAuthorized ? (
                <a className="btn" href="/api/auth/vkontakte">
                    Login
                </a>
            ) : (
                <a className="btn btn-red" href="/api/logout">
                    Logout
                </a>
            )}
        </header>
    );
}
