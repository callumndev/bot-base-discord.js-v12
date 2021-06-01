class EventBase extends LibBase {
    constructor( options ) {
        super( { name: 'Event - ' + options.name } );
    };
};

module.exports = EventBase;