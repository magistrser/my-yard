const ip = '93.157.236.34';
//const ip = 'localhost';
module.exports.ip = ip;

const clientPort = 80;
module.exports.clientPort = clientPort;
module.exports.clientAddress = `http://${ip}:${clientPort}/`;

const serverPort = 8080;
module.exports.serverPort = serverPort;
module.exports.serverAddress = `http://${ip}:${serverPort}/`;
