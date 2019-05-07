import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import blue from '@material-ui/core/colors/blue';

export default class ImageBox extends Component {
    onImageClick = (ev, image) => {
        ev.preventDefault();
        window.open(image);
    };

    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={24}
                style={{
                    padding: 20,
                    background: blue['100'],
                    border: `3px solid ${blue['A200']}`,
                }}
            >
                {this.props.images.map(image => (
                    <Grid
                        className="container"
                        item
                        style={{
                            position: 'relative',
                        }}
                        onClick={ev => this.onImageClick(ev, image)}
                        onMouseEnter={ev => (ev.target.style.opacity = 1)}
                        onMouseLeave={ev => (ev.target.style.opacity = 0)}
                    >
                        <img
                            src={image}
                            style={{
                                maxWidth: 300,
                                maxHeight: 200,
                            }}
                        />
                        <div
                            className="overlay"
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '100%',
                                width: '100%',
                                opacity: 0,
                                transition: '.5s ease',
                                cursor: 'pointer',
                            }}
                        >
                            <div
                                style={{
                                    color: 'white',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    'text-align': 'center',
                                }}
                            >
                                <Search fontSize="large" />
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        );
    }
}
