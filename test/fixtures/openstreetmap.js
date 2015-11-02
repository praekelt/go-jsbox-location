module.exports = function() {
    return [

    // Foe Street, World only
    {
        "request": {
            "method": "GET",
            "url": "http://open.mapquestapi.com/nominatim/v1/search.php",
            "params": {
               key: 'testapikey',
               format: "json",
               q: "Foe Street",
               addressdetails: "1",
               bounded: "1",
               limit: "30",
               viewbox: "-180.0,90.0,180.0,-90.0"
            }
        },
        "response": {
            "code": 200,
            "data": [
               {
                  "place_id": "41697576",
                  "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright",
                  "osm_type": "way",
                  "osm_id": "6281420",
                  "boundingbox": [
                     "-33.9344496",
                     "-33.9338317",
                     "18.4566646",
                     "18.4575346"
                  ],
                  "lat": "-33.9344496",
                  "lon": "18.4575346",
                  "display_name": "Foe Street, Cape Town Ward 57, Cape Town Subcouncil 15, Cape Town, City of Cape Town, Western Cape, 7925, RSA",
                  "class": "highway",
                  "type": "unclassified",
                  "importance": 0.3,
                  "address": {
                     "road": "Foe Street",
                     "suburb": "Cape Town Ward 57",
                     "city_district": "Cape Town Subcouncil 15",
                     "city": "Cape Town",
                     "county": "City of Cape Town",
                     "state": "Western Cape",
                     "postcode": "7925",
                     "country": "RSA",
                     "country_code": "za"
                  }
               },
               {
                  "place_id": "148585060",
                  "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright",
                  "osm_type": "way",
                  "osm_id": "277202897",
                  "boundingbox": [
                     "42.8562649",
                     "42.856395",
                     "-70.9340489",
                     "-70.9337327"
                  ],
                  "lat": "42.856319",
                  "lon": "-70.9338925",
                  "display_name": "Foe Street, Amesbury, Essex County, Massachusetts, 01913, United States of America",
                  "class": "highway",
                  "type": "tertiary",
                  "importance": 0.25625,
                  "address": {
                     "road": "Foe Street",
                     "town": "Amesbury",
                     "county": "Essex County",
                     "state": "Massachusetts",
                     "postcode": "01913",
                     "country": "United States of America",
                     "country_code": "us"
                  }
               },
               {
                  "place_id": "52002761",
                  "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright",
                  "osm_type": "way",
                  "osm_id": "18818106",
                  "boundingbox": [
                     "43.587128",
                     "43.588894",
                     "-71.2201729",
                     "-71.2185079"
                  ],
                  "lat": "43.587787",
                  "lon": "-71.2195199",
                  "display_name": "Foe Street, Wolfeboro, Carroll County, New Hampshire, 03894, United States of America",
                  "class": "highway",
                  "type": "residential",
                  "importance": 0.25625,
                  "address": {
                     "road": "Foe Street",
                     "village": "Wolfeboro",
                     "county": "Carroll County",
                     "state": "New Hampshire",
                     "postcode": "03894",
                     "country": "United States of America",
                     "country_code": "us"
                  }
               }
            ]
        }
    },

    // no_data
    {
        "request": {
            "method": "GET",
            "url": "http://open.mapquestapi.com/nominatim/v1/search.php",
            "params": {
               key: 'testapikey',
               format: "json",
               q: "no_data",
               addressdetails: "1",
               bounded: "1",
               limit: "30",
               viewbox: "-180.0,90.0,180.0,-90.0"
            }
        },
        "response": {
            "code": 200,
        }
    },

    // empty_data
    {
        "request": {
            "method": "GET",
            "url": "http://open.mapquestapi.com/nominatim/v1/search.php",
            "params": {
               key: 'testapikey',
               format: "json",
               q: "empty_data",
               addressdetails: "1",
               bounded: "1",
               limit: "30",
               viewbox: "-180.0,90.0,180.0,-90.0"
            }
        },
        "response": {
            "code": 200,
            "data": []
        }
    },

    // custom URL, The Moon
    {
        "request": {
            "method": "GET",
            "url": "http://example.com/nominatim/v1/search.php",
            "params": {
               key: 'testapikey',
               format: "json",
               q: "Moon",
               addressdetails: "1",
               bounded: "1",
               limit: "30",
               viewbox: "-180.0,90.0,180.0,-90.0"
            }
        },
        "response": {
            "code": 200,
            "data": [
               {
                  "display_name": "Lake Serenity, The Moon",
               },
            ]
        }
    },


    ];
};
