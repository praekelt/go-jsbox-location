var provider = require('./provider');
var googlemaps = require('./googlemaps');
var osm = require('./openstreetmap');

this.Provider = provider.Provider;
this.AddressResult = provider.AddressResult;
this.GoogleMaps = googlemaps.GoogleMaps;
this.OpenStreetMap = osm.OpenStreetMap;