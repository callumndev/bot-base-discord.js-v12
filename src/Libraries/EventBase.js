class EventBase extends LibBase {
    constructor( options ) {
        super( { name: 'Event - ' + options.name } );

        this._event = options.event;
    };
};


module.exports = EventBase;