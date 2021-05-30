// {
//     name: 'Config',
//     classFn: 'ConfigClass',
//     enabled: true,
//     makeGlobal: true
// })

class StructureManager extends LibBase {
    constructor( ) {
        super( { name: 'Structure Manager' } );

        this._structures = new Map();
    };

    init() {
        const structures = fs.readdirSync( path.join( __dirname, '..', 'Structures' ) );

        for ( let structureName of structures ) {
            const structure = require( '../Structures/' + structureName );

            if ( isClass( structure ) ) {
                try {
                    this.register( className( structure ), structure, !!structure.makeGlobal );
                } catch ( e ) {
                    this.error( `[init] Failed to register structure ${ structureName } because ${ e.message }` );
                };
            } else if ( checkType( structure, 'function' ) ) {
                try {
                    structure();
                    
                    this.log( `[init] Called structure ${ structureName }` );
                } catch ( e ) {
                    this.error( `[init] Failed to call structure ${ structureName } because ${ e.message }` );
                };
            };
        };

        return this;
    };

    validate( name ) {
        return this._structures.has( name );
    };

    status( name ) {
        if ( !checkType( name, 'string' ) )
            console.error( 'Error: typeof structureName != string' );
        
        if ( !this.validate( name ) )
            throw new Error( `${ name } is not a registered structure` );

        return this._structures.get( name )?.enabled;
    };

    register( name, classFn, makeGlobal = false ) {
        if ( !checkType( name, 'string' ) || !isClass( classFn ) || !checkType( makeGlobal, 'boolean' ) ) {
            return console.error( 'StructureManager.register(): One parameter is not the correct type' );
        };

        this._structures.set( name, {
            name,
            classFn,
            enabled: true,
            makeGlobal
        } );

        if ( makeGlobal ) {
            console.log( name + ' is global' )
            global[ name ] = new classFn();
        } else {
            discord.Structures.extend( name, classFn );
        };

        this.log( `[register] Registered structure ${ className( classFn ) }` );
    };

    disable( name, override = null ) {
        if ( !checkType( name, 'string' ) || !this.validate( name ) || !this.status( name ) ) {
            return console.error( 'StructureManager.disable(): Either the name typeof param != string or that is not a registered structure or the structure is already disabled' );
        };

        let structure = this._structures.get( name );
        structure.enabled = false;

        if ( structure.makeGlobal ) {
            delete global[ name ];
        } else {
            discord.Structures.extend( name, discord[ override != null ? override : name ] );
        };

        this._structures.set( name, structure );
    };

    enable( name ) {
        if ( !checkType( name, 'string' ) || !this.validate( name ) || this.status( name ) ) {
            return console.error( 'StructureManager.enable(): Either the name typeof param != string or that is not a registered structure or the structure is already enabled' );
        };

        let structure = this._structures.get( name );
        structure.enabled = true;

        if ( structure.makeGlobal ) {
            global[ name ] = structure.classFn;
        } else {
            discord.Structures.extend( name, structure.classFn );
        };

        this._structures.set( name, structure );
    };
};

module.exports = StructureManager;