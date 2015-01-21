var OpenStreetMap = {
    // Defaults
    url: 'http://open.mapquestapi.com/nominatim/v1/search.php',
    store_fields: ['display_name'],
    hard_boundary: true,
    address_limit: 30,
    address_details: [],
    bounding_box: ["-180.0", "90.0", "180.0", "-90.0"],

    // Constructs the params for use with the Api GET call
    build_osmaps_params: function(user_reply) {
        params = {
            format: 'json',
            q: user_reply,
            addressdetails: 1,
            bounded: ((openstreetmaps_api.hard_boundary === true) ? 1 : 0),
            limit: openstreetmaps_api.address_limit,
            viewbox: "viewbox=" + openstreetmaps_api.bounding_box.join('%2C')
        };
        return params;
    },

    // Takes a list of address results returned by the Api GET call
    // and returns a list of addresses with details as set in
    // opts.map_api_opts.store_fields.
    extract_addresses: function(results) {
        var addresses = [];
        results.forEach(function(res) {
            var result = {};  // Used to generate single result object
            openstreetmaps_api.store_fields.forEach(function(field) {
                result[field] = utils.extract_object(res, field);
            });
            // Override display_name if address_details are provided
            if (openstreetmaps_api.address_details.length !== 0) {
                var addr_detail_list = [];
                openstreetmaps_api.address_details.forEach(function(detail) {
                    if (res.address[detail] !== undefined) {
                        addr_detail_list.push(res.address[detail]);
                    }
                });
                result.display_name = addr_detail_list.join(', ');
            }
            // Ensure that display_name is included even if excluded from
            // store_fields as it is needed to generate the pages.
            if(!result.display_name) {
                result.display_name = res.display_name;
            }
            addresses.push(result);
        });
        return addresses;
    },

    // Takes the user's reply, makes an Api GET call, and returns a list of
    // addresses that matches the queried address. If no results are found
    // an empty list is returned
    get_addresses: function(user_reply) {
        var addresses;
        return self.http
            .get(openstreetmaps_api.url, {
                params: openstreetmaps_api.build_osmaps_params(user_reply)
            })
            .then(function(resp) {
                if((!resp.data) || (resp.code !== 200)
                || (resp.data.length === 0)) {
                    addresses = [];
                } else {
                    addresses = openstreetmaps_api.extract_addresses(resp.data);
                }
                return addresses;
            });
    },

    // Helper for page generation when multiple addresses are available
    format_choice: function(number, address) {
        return '\n' + number + '. ' + address.display_name;
    },
};

this.OpenStreetMap = OpenStreetMap;
