module.exports = function() {
   return [
   // GET gmaps agx
      {
         "request": {
            "method": "GET",
            "url": "http://maps.googleapis.com/maps/api/geocode/json",
            "params": {
                address:'agx'
            }
         },
         "response": {
            "code": 200,
            "data": {
               "results" : [],
               "status" : "ZERO_RESULTS"
            }
         }
      },

   // GET gmaps agy
      {
         "request": {
            "method": "GET",
            "url": "http://maps.googleapis.com/maps/api/geocode/json",
            "params": {
                address:'agy'
            }
         },
         "response": {
            "code": 200,
            "data": {
               "results" : [],
               "status" : "ZERO_RESULTS"
            }
         }
      },

   // GET gmaps Friend Street
      {
         "request": {
            "method": "GET",
            "url": "http://maps.googleapis.com/maps/api/geocode/json",
            "params": {
                address:'Friend Street'
            }
         },
         "response": {
            "code": 200,
            "data": {
               "results" : [
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Amesbury",
                           "short_name" : "Amesbury",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Essex County",
                           "short_name" : "Essex County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "01913",
                           "short_name" : "01913",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Amesbury, MA 01913, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 42.857408,
                              "lng" : -70.9308506
                           },
                           "southwest" : {
                              "lat" : 42.8532,
                              "lng" : -70.94641539999999
                           }
                        },
                        "location" : {
                           "lat" : 42.8550001,
                           "lng" : -70.9383138
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 42.857408,
                              "lng" : -70.9308506
                           },
                           "southwest" : {
                              "lat" : 42.8532,
                              "lng" : -70.94641539999999
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Adams",
                           "short_name" : "Adams",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Berkshire County",
                           "short_name" : "Berkshire County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "01220",
                           "short_name" : "01220",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Adams, MA 01220, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 42.63718799999999,
                              "lng" : -73.1129541
                           },
                           "southwest" : {
                              "lat" : 42.6279006,
                              "lng" : -73.12540349999999
                           }
                        },
                        "location" : {
                           "lat" : 42.632345,
                           "lng" : -73.117998
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 42.63718799999999,
                              "lng" : -73.1129541
                           },
                           "southwest" : {
                              "lat" : 42.6279006,
                              "lng" : -73.12540349999999
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Berkley",
                           "short_name" : "Berkley",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Bristol County",
                           "short_name" : "Bristol County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "02779",
                           "short_name" : "02779",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Berkley, MA 02779, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 41.8146076,
                              "lng" : -71.0828413
                           },
                           "southwest" : {
                              "lat" : 41.811129,
                              "lng" : -71.0966797
                           }
                        },
                        "location" : {
                           "lat" : 41.8135507,
                           "lng" : -71.089743
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 41.8146076,
                              "lng" : -71.0828413
                           },
                           "southwest" : {
                              "lat" : 41.811129,
                              "lng" : -71.0966797
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Downtown",
                           "short_name" : "Downtown",
                           "types" : [ "neighborhood", "political" ]
                        },
                        {
                           "long_name" : "Boston",
                           "short_name" : "Boston",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Suffolk County",
                           "short_name" : "Suffolk County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "02114",
                           "short_name" : "02114",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Boston, MA 02114, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 42.3652221,
                              "lng" : -71.059566
                           },
                           "southwest" : {
                              "lat" : 42.3631797,
                              "lng" : -71.0618336
                           }
                        },
                        "location" : {
                           "lat" : 42.36398579999999,
                           "lng" : -71.06047839999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 42.3655498802915,
                              "lng" : -71.0593508197085
                           },
                           "southwest" : {
                              "lat" : 42.3628519197085,
                              "lng" : -71.06204878029151
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Ashland",
                           "short_name" : "Ashland",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Englewood",
                           "short_name" : "Englewood",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Clark County",
                           "short_name" : "Clark County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Kansas",
                           "short_name" : "KS",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "67831",
                           "short_name" : "67831",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Ashland, KS 67831, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 37.042462,
                              "lng" : -99.979399
                           },
                           "southwest" : {
                              "lat" : 37.0422719,
                              "lng" : -99.994907
                           }
                        },
                        "location" : {
                           "lat" : 37.0423899,
                           "lng" : -99.98710509999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 37.0437159302915,
                              "lng" : -99.979399
                           },
                           "southwest" : {
                              "lat" : 37.0410179697085,
                              "lng" : -99.994907
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Newberry",
                           "short_name" : "Newberry",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Newberry County",
                           "short_name" : "Newberry County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "South Carolina",
                           "short_name" : "SC",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "29108",
                           "short_name" : "29108",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Newberry, SC 29108, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 34.2756823,
                              "lng" : -81.61442959999999
                           },
                           "southwest" : {
                              "lat" : 34.2726956,
                              "lng" : -81.6221228
                           }
                        },
                        "location" : {
                           "lat" : 34.2740711,
                           "lng" : -81.6185488
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 34.2756823,
                              "lng" : -81.61442959999999
                           },
                           "southwest" : {
                              "lat" : 34.2726956,
                              "lng" : -81.6221228
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Cottonwood Falls",
                           "short_name" : "Cottonwood Falls",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Falls",
                           "short_name" : "Falls",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Chase County",
                           "short_name" : "Chase County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Kansas",
                           "short_name" : "KS",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "66845",
                           "short_name" : "66845",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Cottonwood Falls, KS 66845, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 38.3721102,
                              "lng" : -96.53895079999999
                           },
                           "southwest" : {
                              "lat" : 38.3718466,
                              "lng" : -96.54681869999999
                           }
                        },
                        "location" : {
                           "lat" : 38.371972,
                           "lng" : -96.542706
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 38.37332738029151,
                              "lng" : -96.53895079999999
                           },
                           "southwest" : {
                              "lat" : 38.37062941970851,
                              "lng" : -96.54681869999999
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Gloucester",
                           "short_name" : "Gloucester",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Essex County",
                           "short_name" : "Essex County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "01930",
                           "short_name" : "01930",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Gloucester, MA 01930, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 42.6201099,
                              "lng" : -70.651583
                           },
                           "southwest" : {
                              "lat" : 42.616184,
                              "lng" : -70.656471
                           }
                        },
                        "location" : {
                           "lat" : 42.6180743,
                           "lng" : -70.6539937
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 42.6201099,
                              "lng" : -70.651583
                           },
                           "southwest" : {
                              "lat" : 42.616184,
                              "lng" : -70.656471
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Pittston",
                           "short_name" : "Pittston",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Jenkins",
                           "short_name" : "Jenkins",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Luzerne County",
                           "short_name" : "Luzerne County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Pennsylvania",
                           "short_name" : "PA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "18640",
                           "short_name" : "18640",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Pittston, PA 18640, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 41.3112973,
                              "lng" : -75.81023499999999
                           },
                           "southwest" : {
                              "lat" : 41.309068,
                              "lng" : -75.815286
                           }
                        },
                        "location" : {
                           "lat" : 41.3098043,
                           "lng" : -75.81292739999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 41.3115316302915,
                              "lng" : -75.81023499999999
                           },
                           "southwest" : {
                              "lat" : 41.3088336697085,
                              "lng" : -75.815286
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Soldier",
                           "short_name" : "Soldier",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Soldier",
                           "short_name" : "Soldier",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Jackson County",
                           "short_name" : "Jackson County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Kansas",
                           "short_name" : "KS",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "66540",
                           "short_name" : "66540",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Soldier, KS 66540, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 39.5391041,
                              "lng" : -95.9635323
                           },
                           "southwest" : {
                              "lat" : 39.5390402,
                              "lng" : -95.96936649999999
                           }
                        },
                        "location" : {
                           "lat" : 39.5390666,
                           "lng" : -95.96570269999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 39.54042113029149,
                              "lng" : -95.9635323
                           },
                           "southwest" : {
                              "lat" : 39.53772316970849,
                              "lng" : -95.96936649999999
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Worthington",
                           "short_name" : "Worthington",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Jefferson",
                           "short_name" : "Jefferson",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Greene County",
                           "short_name" : "Greene County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Indiana",
                           "short_name" : "IN",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "47471",
                           "short_name" : "47471",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Worthington, IN 47471, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 39.1164176,
                              "lng" : -86.97477310000001
                           },
                           "southwest" : {
                              "lat" : 39.1156946,
                              "lng" : -86.97917939999999
                           }
                        },
                        "location" : {
                           "lat" : 39.1156964,
                           "lng" : -86.9771406
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 39.1174050802915,
                              "lng" : -86.97477310000001
                           },
                           "southwest" : {
                              "lat" : 39.1147071197085,
                              "lng" : -86.97917939999999
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Ludlow Falls",
                           "short_name" : "Ludlow Falls",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Union",
                           "short_name" : "Union",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Miami County",
                           "short_name" : "Miami County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Ohio",
                           "short_name" : "OH",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "45339",
                           "short_name" : "45339",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Ludlow Falls, OH 45339, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 40.0001919,
                              "lng" : -84.3383023
                           },
                           "southwest" : {
                              "lat" : 39.9991404,
                              "lng" : -84.342552
                           }
                        },
                        "location" : {
                           "lat" : 39.99972959999999,
                           "lng" : -84.3402258
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 40.0010151302915,
                              "lng" : -84.3383023
                           },
                           "southwest" : {
                              "lat" : 39.9983171697085,
                              "lng" : -84.342552
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Marianna",
                           "short_name" : "Marianna",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Jackson County",
                           "short_name" : "Jackson County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Florida",
                           "short_name" : "FL",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "32448",
                           "short_name" : "32448",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Marianna, FL 32448, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 30.7772775,
                              "lng" : -85.24570299999999
                           },
                           "southwest" : {
                              "lat" : 30.772682,
                              "lng" : -85.246239
                           }
                        },
                        "location" : {
                           "lat" : 30.7753978,
                           "lng" : -85.24608769999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 30.7772775,
                              "lng" : -85.2446220197085
                           },
                           "southwest" : {
                              "lat" : 30.772682,
                              "lng" : -85.24731998029151
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Lodgepole",
                           "short_name" : "Lodgepole",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Lodgepole",
                           "short_name" : "Lodgepole",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Cheyenne County",
                           "short_name" : "Cheyenne County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Nebraska",
                           "short_name" : "NE",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "69149",
                           "short_name" : "69149",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Lodgepole, NE 69149, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 41.15826,
                              "lng" : -102.7647541
                           },
                           "southwest" : {
                              "lat" : 41.155111,
                              "lng" : -102.7647935
                           }
                        },
                        "location" : {
                           "lat" : 41.1563343,
                           "lng" : -102.7647811
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 41.15826,
                              "lng" : -102.7634248197085
                           },
                           "southwest" : {
                              "lat" : 41.155111,
                              "lng" : -102.7661227802915
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Penn",
                           "short_name" : "Penn",
                           "types" : [ "neighborhood", "political" ]
                        },
                        {
                           "long_name" : "Coulee",
                           "short_name" : "Coulee",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Ramsey County",
                           "short_name" : "Ramsey County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "North Dakota",
                           "short_name" : "ND",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "58362",
                           "short_name" : "58362",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Penn, ND 58362, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 48.2237575,
                              "lng" : -99.0865575
                           },
                           "southwest" : {
                              "lat" : 48.2198366,
                              "lng" : -99.08918079999999
                           }
                        },
                        "location" : {
                           "lat" : 48.2221769,
                           "lng" : -99.08830139999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 48.2237575,
                              "lng" : -99.08652016970848
                           },
                           "southwest" : {
                              "lat" : 48.2198366,
                              "lng" : -99.0892181302915
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Hingham",
                           "short_name" : "Hingham",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Plymouth County",
                           "short_name" : "Plymouth County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "02043",
                           "short_name" : "02043",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Hingham, MA 02043, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 42.2164603,
                              "lng" : -70.8846417
                           },
                           "southwest" : {
                              "lat" : 42.2149993,
                              "lng" : -70.8874761
                           }
                        },
                        "location" : {
                           "lat" : 42.2155905,
                           "lng" : -70.8863492
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 42.21707878029149,
                              "lng" : -70.8846417
                           },
                           "southwest" : {
                              "lat" : 42.2143808197085,
                              "lng" : -70.8874761
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Liberty",
                           "short_name" : "Liberty",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Liberty County",
                           "short_name" : "Liberty County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Texas",
                           "short_name" : "TX",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "77575",
                           "short_name" : "77575",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Liberty, TX 77575, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 30.0588303,
                              "lng" : -94.7509336
                           },
                           "southwest" : {
                              "lat" : 30.0573217,
                              "lng" : -94.7526003
                           }
                        },
                        "location" : {
                           "lat" : 30.0579494,
                           "lng" : -94.75216689999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 30.0594249802915,
                              "lng" : -94.75041796970849
                           },
                           "southwest" : {
                              "lat" : 30.0567270197085,
                              "lng" : -94.7531159302915
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Kettleman City",
                           "short_name" : "Kettleman City",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Kings County",
                           "short_name" : "Kings County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "California",
                           "short_name" : "CA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "93239",
                           "short_name" : "93239",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Kettleman City, CA 93239, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 36.0102889,
                              "lng" : -119.958201
                           },
                           "southwest" : {
                              "lat" : 36.0072092,
                              "lng" : -119.958706
                           }
                        },
                        "location" : {
                           "lat" : 36.0092418,
                           "lng" : -119.958459
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 36.0102889,
                              "lng" : -119.9571045197085
                           },
                           "southwest" : {
                              "lat" : 36.0072092,
                              "lng" : -119.9598024802915
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Beverly",
                           "short_name" : "Beverly",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Essex County",
                           "short_name" : "Essex County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "01915",
                           "short_name" : "01915",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Beverly, MA 01915, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 42.560329,
                              "lng" : -70.9027909
                           },
                           "southwest" : {
                              "lat" : 42.556519,
                              "lng" : -70.9057459
                           }
                        },
                        "location" : {
                           "lat" : 42.5585731,
                           "lng" : -70.9042
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 42.560329,
                              "lng" : -70.9027909
                           },
                           "southwest" : {
                              "lat" : 42.556519,
                              "lng" : -70.9057459
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Mount Sterling",
                           "short_name" : "Mt Sterling",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Pleasant",
                           "short_name" : "Pleasant",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Madison County",
                           "short_name" : "Madison County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Ohio",
                           "short_name" : "OH",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "43143",
                           "short_name" : "43143",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Mount Sterling, OH 43143, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 39.7246679,
                              "lng" : -83.2695938
                           },
                           "southwest" : {
                              "lat" : 39.7228359,
                              "lng" : -83.2722976
                           }
                        },
                        "location" : {
                           "lat" : 39.7238443,
                           "lng" : -83.2708325
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 39.7251008802915,
                              "lng" : -83.2695938
                           },
                           "southwest" : {
                              "lat" : 39.7224029197085,
                              "lng" : -83.2722976
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Epping",
                           "short_name" : "Epping",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Rockingham County",
                           "short_name" : "Rockingham County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "New Hampshire",
                           "short_name" : "NH",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "03042",
                           "short_name" : "03042",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Epping, NH 03042, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 43.0379183,
                              "lng" : -71.122647
                           },
                           "southwest" : {
                              "lat" : 43.0370877,
                              "lng" : -71.1276017
                           }
                        },
                        "location" : {
                           "lat" : 43.0371454,
                           "lng" : -71.1241557
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 43.0388519802915,
                              "lng" : -71.122647
                           },
                           "southwest" : {
                              "lat" : 43.0361540197085,
                              "lng" : -71.1276017
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Lynn",
                           "short_name" : "Lynn",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Essex County",
                           "short_name" : "Essex County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "01902",
                           "short_name" : "01902",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Lynn, MA 01902, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 42.4658338,
                              "lng" : -70.93841480000002
                           },
                           "southwest" : {
                              "lat" : 42.464288,
                              "lng" : -70.94080199999999
                           }
                        },
                        "location" : {
                           "lat" : 42.4649536,
                           "lng" : -70.9400081
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 42.46640988029149,
                              "lng" : -70.9382594197085
                           },
                           "southwest" : {
                              "lat" : 42.46371191970849,
                              "lng" : -70.94095738029151
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Clintwood",
                           "short_name" : "Clintwood",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Willis",
                           "short_name" : "Willis",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Dickenson County",
                           "short_name" : "Dickenson County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Virginia",
                           "short_name" : "VA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "24228",
                           "short_name" : "24228",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Clintwood, VA 24228, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 37.1550699,
                              "lng" : -82.4541949
                           },
                           "southwest" : {
                              "lat" : 37.151945,
                              "lng" : -82.45470279999999
                           }
                        },
                        "location" : {
                           "lat" : 37.1535749,
                           "lng" : -82.45462089999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 37.1550699,
                              "lng" : -82.4530998697085
                           },
                           "southwest" : {
                              "lat" : 37.151945,
                              "lng" : -82.4557978302915
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Kennebunk",
                           "short_name" : "Kennebunk",
                           "types" : [ "sublocality_level_1", "sublocality", "political" ]
                        },
                        {
                           "long_name" : "Kennebunk",
                           "short_name" : "Kennebunk",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "York County",
                           "short_name" : "York County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Maine",
                           "short_name" : "ME",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "04043",
                           "short_name" : "04043",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Kennebunk, ME 04043, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 43.3841169,
                              "lng" : -70.5427809
                           },
                           "southwest" : {
                              "lat" : 43.38328500000001,
                              "lng" : -70.5452892
                           }
                        },
                        "location" : {
                           "lat" : 43.38354229999999,
                           "lng" : -70.54400059999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 43.3850499302915,
                              "lng" : -70.54268606970848
                           },
                           "southwest" : {
                              "lat" : 43.3823519697085,
                              "lng" : -70.54538403029149
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Congers",
                           "short_name" : "Congers",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Clarkstown",
                           "short_name" : "Clarkstown",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Rockland County",
                           "short_name" : "Rockland County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "New York",
                           "short_name" : "NY",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "10920",
                           "short_name" : "10920",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Congers, NY 10920, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 41.1517367,
                              "lng" : -73.935845
                           },
                           "southwest" : {
                              "lat" : 41.148728,
                              "lng" : -73.937263
                           }
                        },
                        "location" : {
                           "lat" : 41.1498608,
                           "lng" : -73.9366825
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 41.1517367,
                              "lng" : -73.93520501970849
                           },
                           "southwest" : {
                              "lat" : 41.148728,
                              "lng" : -73.9379029802915
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Wakefield",
                           "short_name" : "Wakefield",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Middlesex County",
                           "short_name" : "Middlesex County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "01880",
                           "short_name" : "01880",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Wakefield, MA 01880, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 42.506044,
                              "lng" : -71.08705499999999
                           },
                           "southwest" : {
                              "lat" : 42.5042553,
                              "lng" : -71.0893507
                           }
                        },
                        "location" : {
                           "lat" : 42.5050345,
                           "lng" : -71.0889356
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 42.50649863029149,
                              "lng" : -71.08685386970849
                           },
                           "southwest" : {
                              "lat" : 42.5038006697085,
                              "lng" : -71.08955183029151
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Taunton",
                           "short_name" : "Taunton",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Bristol County",
                           "short_name" : "Bristol County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "02780",
                           "short_name" : "02780",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Taunton, MA 02780, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 41.9019264,
                              "lng" : -71.1079027
                           },
                           "southwest" : {
                              "lat" : 41.899528,
                              "lng" : -71.110603
                           }
                        },
                        "location" : {
                           "lat" : 41.9006772,
                           "lng" : -71.1091552
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 41.90207618029149,
                              "lng" : -71.1079027
                           },
                           "southwest" : {
                              "lat" : 41.8993782197085,
                              "lng" : -71.110603
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "South Side",
                           "short_name" : "South Side",
                           "types" : [ "neighborhood", "political" ]
                        },
                        {
                           "long_name" : "Waltham",
                           "short_name" : "Waltham",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Middlesex County",
                           "short_name" : "Middlesex County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Massachusetts",
                           "short_name" : "MA",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "02453",
                           "short_name" : "02453",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Waltham, MA 02453, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 42.3682759,
                              "lng" : -71.2250172
                           },
                           "southwest" : {
                              "lat" : 42.366718,
                              "lng" : -71.225855
                           }
                        },
                        "location" : {
                           "lat" : 42.36724600000001,
                           "lng" : -71.22557499999999
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 42.3688459302915,
                              "lng" : -71.22408711970849
                           },
                           "southwest" : {
                              "lat" : 42.3661479697085,
                              "lng" : -71.22678508029149
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Wolfeboro",
                           "short_name" : "Wolfeboro",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Carroll County",
                           "short_name" : "Carroll County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "New Hampshire",
                           "short_name" : "NH",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "03894",
                           "short_name" : "03894",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Wolfeboro, NH 03894, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 43.5889415,
                              "lng" : -71.2185198
                           },
                           "southwest" : {
                              "lat" : 43.5871088,
                              "lng" : -71.2201962
                           }
                        },
                        "location" : {
                           "lat" : 43.5877934,
                           "lng" : -71.2195392
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 43.5893741302915,
                              "lng" : -71.2180090197085
                           },
                           "southwest" : {
                              "lat" : 43.5866761697085,
                              "lng" : -71.22070698029151
                           }
                        }
                     },
                     "types" : [ "route" ]
                  },
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Kittery",
                           "short_name" : "Kittery",
                           "types" : [ "neighborhood", "political" ]
                        },
                        {
                           "long_name" : "Kittery",
                           "short_name" : "Kittery",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "York County",
                           "short_name" : "York County",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Maine",
                           "short_name" : "ME",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "United States",
                           "short_name" : "US",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "03904",
                           "short_name" : "03904",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Kittery, ME 03904, USA",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : 43.0886529,
                              "lng" : -70.73386599999999
                           },
                           "southwest" : {
                              "lat" : 43.08744189999999,
                              "lng" : -70.735039
                           }
                        },
                        "location" : {
                           "lat" : 43.0880796,
                           "lng" : -70.7345605
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : 43.0893963802915,
                              "lng" : -70.73310351970849
                           },
                           "southwest" : {
                              "lat" : 43.0866984197085,
                              "lng" : -70.7358014802915
                           }
                        }
                     },
                     "types" : [ "route" ]
                  }
               ],
               "status" : "OK"
            }
         }
      },

   // GET gmaps Friend Street, South Africa
      {
         "request": {
            "method": "GET",
            "url": "http://maps.googleapis.com/maps/api/geocode/json",
            "params": {
                address:'Friend Street, South Africa'
            }
         },
         "response": {
            "code": 200,
            "data": {
               "results" : [
                  {
                     "address_components" : [
                        {
                           "long_name" : "Friend Street",
                           "short_name" : "Friend St",
                           "types" : [ "route" ]
                        },
                        {
                           "long_name" : "Salt River",
                           "short_name" : "Salt River",
                           "types" : [ "sublocality_level_2", "sublocality", "political" ]
                        },
                        {
                           "long_name" : "Cape Town",
                           "short_name" : "Cape Town",
                           "types" : [ "sublocality_level_1", "sublocality", "political" ]
                        },
                        {
                           "long_name" : "Cape Town",
                           "short_name" : "Cape Town",
                           "types" : [ "locality", "political" ]
                        },
                        {
                           "long_name" : "Cape Town",
                           "short_name" : "Cape Town",
                           "types" : [ "administrative_area_level_3", "political" ]
                        },
                        {
                           "long_name" : "Cape Town",
                           "short_name" : "Cape Town",
                           "types" : [ "administrative_area_level_2", "political" ]
                        },
                        {
                           "long_name" : "Western Cape",
                           "short_name" : "WC",
                           "types" : [ "administrative_area_level_1", "political" ]
                        },
                        {
                           "long_name" : "South Africa",
                           "short_name" : "ZA",
                           "types" : [ "country", "political" ]
                        },
                        {
                           "long_name" : "7925",
                           "short_name" : "7925",
                           "types" : [ "postal_code" ]
                        }
                     ],
                     "formatted_address" : "Friend Street, Cape Town 7925, South Africa",
                     "geometry" : {
                        "bounds" : {
                           "northeast" : {
                              "lat" : -33.9338399,
                              "lng" : 18.4575469
                           },
                           "southwest" : {
                              "lat" : -33.934464,
                              "lng" : 18.45667
                           }
                        },
                        "location" : {
                           "lat" : -33.9339159,
                           "lng" : 18.456782
                        },
                        "location_type" : "GEOMETRIC_CENTER",
                        "viewport" : {
                           "northeast" : {
                              "lat" : -33.9328029697085,
                              "lng" : 18.4584574302915
                           },
                           "southwest" : {
                              "lat" : -33.9355009302915,
                              "lng" : 18.4557594697085
                           }
                        }
                     },
                     "types" : [ "route" ]
                  }
               ],
               "status" : "OK"
            }
         }
      },

   // GET osmaps Friend Street, za only, limit 3
      {
         "request": {
            "method": "GET",
            "url": "http://open.mapquestapi.com/nominatim/v1/search.php",
            "params": {
               format: "json",
               q: "Friend Street",
               addressdetails: "1",
               bounded: "1",
               limit: "3",
               viewbox: "viewbox=16.4500%2C-22.1278%2C32.8917%2C-34.8333"
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
                  "display_name": "Friend Street, Cape Town Ward 57, Cape Town Subcouncil 15, Cape Town, City of Cape Town, Western Cape, 7925, RSA",
                  "class": "highway",
                  "type": "unclassified",
                  "importance": 0.3,
                  "address": {
                     "road": "Friend Street",
                     "suburb": "Cape Town Ward 57",
                     "city_district": "Cape Town Subcouncil 15",
                     "city": "Cape Town",
                     "county": "City of Cape Town",
                     "state": "Western Cape",
                     "postcode": "7925",
                     "country": "RSA",
                     "country_code": "za"
                  }
               }
            ]
         }
      },

   // GET osmaps Friend Street, za preferred, limit 3
      {
         "request": {
            "method": "GET",
            "url": "http://open.mapquestapi.com/nominatim/v1/search.php",
            "params": {
               format: "json",
               q: "Friend Street",
               addressdetails: "1",
               bounded: "0",
               limit: "3",
               viewbox: "viewbox=16.4500%2C-22.1278%2C32.8917%2C-34.8333"
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
                  "display_name": "Friend Street, Cape Town Ward 57, Cape Town Subcouncil 15, Cape Town, City of Cape Town, Western Cape, 7925, RSA",
                  "class": "highway",
                  "type": "unclassified",
                  "importance": 0.3,
                  "address": {
                     "road": "Friend Street",
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
                  "display_name": "Friend Street, Amesbury, Essex County, Massachusetts, 01913, United States of America",
                  "class": "highway",
                  "type": "tertiary",
                  "importance": 0.25625,
                  "address": {
                     "road": "Friend Street",
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
                  "display_name": "Friend Street, Wolfeboro, Carroll County, New Hampshire, 03894, United States of America",
                  "class": "highway",
                  "type": "residential",
                  "importance": 0.25625,
                  "address": {
                     "road": "Friend Street",
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

   // GET osmaps agx - no results
      {
         "request": {
            "method": "GET",
            "url": "http://open.mapquestapi.com/nominatim/v1/search.php",
            "params": {
               format: "json",
               q: "osmaps agx",
               addressdetails: "1",
               bounded: "0",
               limit: "3",
               viewbox: "viewbox=16.4500%2C-22.1278%2C32.8917%2C-34.8333"
            }
         },
         "response": {
            "code": 200,
            "data": []
         }
      },

   // GET osmaps agy - no results
      {
         "request": {
            "method": "GET",
            "url": "http://open.mapquestapi.com/nominatim/v1/search.php",
            "params": {
               format: "json",
               q: "osmaps agy",
               addressdetails: "1",
               bounded: "0",
               limit: "3",
               viewbox: "viewbox=16.4500%2C-22.1278%2C32.8917%2C-34.8333"
            }
         },
         "response": {
            "code": 200,
            "data": []
         }
      },

   ];
};
