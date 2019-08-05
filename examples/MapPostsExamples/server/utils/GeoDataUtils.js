export const EARTH_RADIUS = 6371e3; // metres

/**
 * This uses the ‘haversine’ formula to calculate the great-circle distance
 * between two points – that is, the shortest distance over the earth’s surface
 * giving an ‘as-the-crow-flies’ distance between the points (ignoring any hills they fly over, of course!).
 * Source: https://www.movable-type.co.uk/scripts/latlong.html
 * @param {{ latitude: Number, longitude: Number}} firstCoords
 * @param {{ latitude: Number, longitude: Number}} secondCoords
 */
export const calcDistance = (firstCoords, secondCoords) => {
    const lat1 = toRadians(firstCoords.latitude);
    const lon1 = toRadians(firstCoords.longitude);
    const lat2 = toRadians(secondCoords.latitude);
    const lon2 = toRadians(secondCoords.longitude);
    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c;
};

export const withinArea = (centerCoords, radius, coords) => {
    return calcDistance(centerCoords, coords) <= radius;
};

const toRadians = angle => (angle * Math.PI) / 180;
