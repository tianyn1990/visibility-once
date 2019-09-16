const path = require('path');

module.exports = {
    src: path.resolve(__dirname, '../lib/visibility.js'),
    output: path.resolve(__dirname, '../dist'),
    lib: path.resolve(__dirname, '../', 'lib'),
};