class EventBase extends LibBase {
    constructor( options ) {
        super( { name: 'Event - ' + options.name } );
    };

    // log() {
    //     console.log( 'loggerrrr' )
    // }
};

module.exports = EventBase;