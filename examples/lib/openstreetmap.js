var vumigo = require('vumigo_v02');
var location = require('../../lib');
var LocationState = location.LocationState;
var OpenStreetMap = location.providers.openstreetmap.OpenStreetMap;

var App = vumigo.App;
var EndState = vumigo.states.EndState;

var LocationApp = App.extend(function(self){
    App.call(self, 'states:start');

    self.states.add('states:start', function(name){
        // This state will get the location data from the user and store it in
        // the contact store. We will store and return the longitude and
        // latitude information to the user.
        return new LocationState(name, {
            question: [
                "Welcome to the location app.",
                "What is your current address?",
            ].join("\n"),
            next: "states:end",
            previous_text: "Prev",
            map_provider: new OpenStreetMap({
                api_key: self.im.config.api_key,
            }),
        });
    });

    self.states.add('states:end', function(name) {
        // This state gets the stored location data for the user, and returns
        // the information back to the user. This state ends the application.

        // First we get the contact information
        return self.im
            .contacts.for_user()
            .then(function(user_contact) {
                self.contact = user_contact;
                // Then we return that information to the user
                var address = self.contact.extra['location:formatted_address'];
                return new EndState(name, {
                    text: 'The location you chose is "' + address + '".',
                });
            });
    });

});

vumigo.interact(this.api, LocationApp);
this.LocationApp = LocationApp;
