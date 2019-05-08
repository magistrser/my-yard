/**
 * Stores and provides images
 */
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import axios from 'axios';
import sharp from 'sharp';
import shortid from 'shortid';

export default class ImageManager {
    static imageFolder = 'examples/MapPostsExamples/server/__images/';

    static getImageByName(imageName: String) {
        if (imageName.substr(imageName.length - 4, 4) !== '.jpg') {
            imageName += '.jpg';
        }
        const pathToImage = path.join(ImageManager.imageFolder, imageName);
        return new Promise((resolve, reject) => {
            fs.readFile(pathToImage, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    static async saveImage(img: ArrayBuffer) {
        const imageName = shortid.generate();
        await sharp(Buffer.from(img, 'binary'))
            .resize(640, 480, {
                fit: 'inside',
            })
            .toFormat('jpg')
            .toFile(path.join(ImageManager.imageFolder, `${imageName}.jpg`));
        return imageName;
    }
}
