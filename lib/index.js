var location = require('./location');
var providers = require('./providers');

module.exports = {
    LocationState: location.LocationState,
    GoogleMaps: providers.GoogleMaps,
    OpenStreetMap: providers.OpenStreetMap,
    providers: providers,
    test_utils: require('./test_utils'),
};
