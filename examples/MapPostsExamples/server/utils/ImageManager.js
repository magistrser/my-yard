/**
 * Stores and provides images
 */
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';

export default class ImageManager {
    static getImageByName(imageName) {}
    static saveImage(img) {
        sharp(new Buffer(img, 'binary'))
            .resize(640, 480, {
                fit: 'inside',
            })
            .toFormat('jpg')
            .toFile('examples/MapPostsExamples/server/__images/result.jpg');
        console.log(typeof new Buffer(img, 'binary'));
    }
}
