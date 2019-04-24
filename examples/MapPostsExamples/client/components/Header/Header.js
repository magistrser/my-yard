import React, { Component } from 'react';
import styles from './Header.module.css';

export default function Header(props) {
    return (
        <header className={styles.header}>
            <h1>Posts and comments</h1>
            {!props.isAuthorized ? (
                <a className={styles.btn} href="/api/auth/vkontakte">
                    Login
                </a>
            ) : (
                <a className={styles.btnRed} href="/api/logout">
                    Logout
                </a>
            )}
        </header>
    );
}
