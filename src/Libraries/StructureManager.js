class StructureManager extends LibBase {
    constructor( ) {
        super( { name: 'Structure Manager' } );

        this._structures = new Map();
    };

    init() {
        const structures = fs.readdirSync( path.join( __dirname, '..', 'Structures' ) );

        for ( let structureName of structures ) {
            const structure = require( '../Structures/' + structureName );

            if ( classes.isClass( structure ) ) {
                try {
                    this.register( classes.name( structure ), structure, !!structure.makeGlobal );
                } catch ( e ) {
                    this.error( `[init] Failed to register structure ${ structureName } because ${ e.message }\n`, e.stack );
                };
            } else if ( checkType( structure, 'function' ) ) {
                try {
                    structure();
                    
                    this.log( `[init] Called structure ${ structureName }` );
                } catch ( e ) {
                    this.error( `[init] Failed to call structure ${ structureName } because ${ e.message }`, '\n', e.stack );
                };
            };
        };

        return this;
    };

    validate( name ) {
        return this._structures?.has( name );
    };

    status( name ) {
        if ( !checkType( name, 'string' ) )
            this.error( 'Error: typeof structureName != string' );
        
        if ( !this.validate( name ) )
            throw new Error( `${ name } is not a registered structure` );

        return this._structures?.get( name )?.enabled;
    };

    register( name, classFn, makeGlobal = false ) {
        if ( !checkType( name, 'string' ) || !classes.isClass( classFn ) || !checkType( makeGlobal, 'boolean' ) ) {
            return this.error( 'StructureManager.register(): One parameter is not the correct type' );
        };

        this._structures?.set( name, {
            name,
            classFn,
            enabled: true,
            makeGlobal
        } );

        if ( makeGlobal ) {
            global[ name ] = new classFn();
        } else {
            if ( !data.isStructure( name ) ) return this.verbose( `Ignoring invalid structure ${ name }` );

            discord?.Structures?.extend( name, () => classFn );
        };

        this.log( `[register] Registered structure ${ classes.name( classFn ) }` );
    };
};


module.exports = StructureManager;