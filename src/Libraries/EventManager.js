class EventManager extends LibBase {
    constructor() {
        super( { name: 'Event Manager' } );

        this._events = new Map();
        this.client = null;
    };

    init( client ) {
        this.client = client;
        
        const events = fs.readdirSync( path.join( __dirname, '..', 'Events' ) );
        
        for ( let eventName of events ) {
            const event = require( '../Events/' + eventName );
            
            try {
                this.register( event );
            } catch ( e ) {
                this.error( `[init] Failed to register event ${ eventName } because ${ e.message }`, '\n', e.stack );
            };
        };
        
        this.handle();
        
        return this;
    };
    
    handle() {
        this._events.forEach( ( e ) => {
            if ( !data.isEvent( e.eventName ) ) return this.verbose( `Ignoring invalid event ${ e.eventName }` );
            
            this.client.on( e.eventName, ( ...args ) => {
                if ( e.enabled == false ) return;
                
                e.classFn[ e.formattedName ].bind( e.classFn, ...args, this.client )();
            } );
        } );
    };

    validate( name ) {
        return this._events.has( name );
    };

    status( name ) {
        if ( !checkType( name, 'string' ) )
            this.error( 'Error: typeof eventName != string' );
        
        if ( !this.validate( name ) )
            throw new Error( `${ name } is not a registered event` );

        return this._events.get( name )?.enabled;
    };

    register( classFn ) {
        if ( !classes.isClass( classFn ) ) {
            return this.error( 'EventManager.register(): One parameter is not the correct type' );
        };

        classes.funcs( classFn ).forEach( fn => {
            let name = `${ classes.name( classFn ) }.${ fn }`;
            let eventName = lowerFirst( fn.replace( 'on', '' ) );

            this._events.set( name, {
                name,
                eventName,
                formattedName: fn,
                classFn: new classFn(),
                enabled: true
            } );

            this.log( `[register] Registered event ${ name }` );
        } );
    };

    disable( name ) {
        if ( !checkType( name, 'string' ) || !this.validate( name ) || !this.status( name ) ) {
            return this.error( 'EventManager.disable(): Either the name typeof param != string or that is not a registered event or the event is already disabled' );
        };

        let event = this._events.get( name );
        event.enabled = false;

        this._events.set( name, event );
    };

    enable( name ) {
        if ( !checkType( name, 'string' ) || !this.validate( name ) || this.status( name ) ) {
            return this.error( 'EventManager.enable(): Either the name typeof param != string or that is not a registered event or the event is already enabled' );
        };

        let event = this._events.get( name );
        event.enabled = true;

        this._events.set( name, event );
    };
};


module.exports = EventManager;