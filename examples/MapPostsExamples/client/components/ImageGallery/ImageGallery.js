import React, { Component } from 'react';
import { render } from 'react-dom';
import Lightbox from 'react-images';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const photos = [
    {
        src: 'https://sun1-21.userapi.com/c845021/v845021866/1fff65/KgSUE5nD1Mw.jpg',
        width: 4,
        height: 3,
    },
    {
        src: 'https://pp.userapi.com/c851124/v851124901/10a494/2-IBXMoyVCY.jpg',
        width: 1,
        height: 1,
    },
    {
        src: 'https://pp.userapi.com/c844618/v844618665/1ee2df/aSUqKELH46Q.jpg',
        width: 3,
        height: 9,
    },
    {
        src: 'https://pp.userapi.com/vkWMAA0-RaSX_Oqz0EwZj1ZmC8frHNhEjczXGA/ZrBWCl3INYg.jpg',
        width: 3,
        height: 4,
    },
    {
        src: 'https://pp.userapi.com/c618019/v618019303/572f/Q5hyMupNq7U.jpg',
        width: 3,
        height: 4,
    },
    {
        src: 'https://pp.userapi.com/c845416/v845416473/1481c0/yE9RgR8NaTU.jpg',
        width: 4,
        height: 3,
    },
];

export default class ImageGallery extends Component {
    constructor() {
        super();
        this.state = { currentImage: 0 };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }
    openLightbox(event, idx) {
        this.setState({
            currentImage: idx,
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    render() {
        return (
            <div
                style={{
                    margin: 'auto',
                    'max-width': '500px',
                    'max-height': '400px',
                }}
            >
                <div
                    style={{
                        background: 'azure',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        overflow: 'hidden',
                    }}
                >
                    <GridList
                        cols={1.5}
                        style={{
                            flexWrap: 'nowrap',
                            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                            transform: 'translateZ(1000)',
                        }}
                    >
                        {photos.map((photo, idx) => (
                            <GridListTile
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={ev => this.openLightbox(ev, idx)}
                            >
                                <img src={photo.src} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <Lightbox
                    images={photos}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                />
            </div>
        );
    }
}
