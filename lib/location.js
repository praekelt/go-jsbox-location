var _ = require('lodash');

var vumigo = require('vumigo_v02');
var states = vumigo.states;
var State = states.State;

var LocationState = State.extend(function(self, name, opts) {
    /**class:Location(name, opts)

    A state which requests a location from the user, and sets the user data
    through getting the location data from the Google Maps API. It may also
    request a second prompt from the user to further refine the location
    if the first prompt wasn't clear enough.

    :param string name:
        name used to identify and refer to the state
    :type opts.question string or LazyText
    :param opts.question:
        The question to first display to the user. Defaults to
        'What is your address?'.
    :type opts.refine_question string or LazyText
    :param opts.refine_question
        The question to display to the user when selecting a location from a
        list if the first search query wasn't clear enough. Defaults to
        'Please select your location from the following:'
    :param boolean opts.continue_session:
        whether or not this is the last state in a session. Defaults to `true`.
    :param boolean opts.send_reply:
        whether or not a reply should be sent to the user's message. Defaults
        to `true`.
    :type opts.next function or string or object
    :param opts.next:
        The state that the user should visit after this state. May either be the
        name of the next state, an options object representing the next state,
        or a function of the form ``f(content)`` returning either, where
        ``content`` is the input given by the user. If ``next`` is ``null`` or
        not defined, the state machine will be left in the current state. See
        :meth:`State.set_next_state`. Defaults to `null`
    :type opts.events object
    :param opts.events:
        Optional event name-listener mappings to bind.
    */

    opts = _.defaults(opts || {}, {
        next:null, 
        question:'What is your address?',
        refine_question:'Please select your location from the following:'
    });


    State.call(self, name, opts);

    self.next = opts.next;
    self.question_text = opts.question;
    self.refine_question_text = opts.refine_question;

    self.init = function() {
        _.defaults(self.metadata, {locationstate:'initial'});
    };

    self.on('state:input', function(event) {
        var content = (event.content || "").trim();

        return self.set_next_state(self.next, content);
    });

    self.translate = function(i18n) {
        self.question_text = i18n(self.question_text);
        self.refine_question_text = i18n(self.refine_question_text);
    };

    self.display = function() {
        switch(self.metadata.locationstate) {
            case 'initial':
                return self.question_text;
            case 'refinequestion':
                return self.refine_question_text;
            default:
                return 'Error';
        }
        return self.question_text;
    };
});

this.LocationState = LocationState;
