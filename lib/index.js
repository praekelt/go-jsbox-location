var location = require('./location');
var providers = require('./providers');
var testing = require('./testing');

module.exports = {
    LocationState: location.LocationState,
    GoogleMaps: providers.GoogleMaps,
    OpenStreetMap: providers.OpenStreetMap,
    testing: testing,
};
