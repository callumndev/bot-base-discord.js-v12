function replaceVars( str ) {
    for ( const [ key, value ] of Object.entries( _Config ) ) {
        str = str?.replace( `{${ key }}`, value );
    };

    return str;
};


class GuildSettings extends RedisBase {
    constructor( id ) {
        super( { name: 'Redis Base - Guild', hash: 'Guild' } );

        this._id = id;
    };

    get default() {
        let _default = model( 'Guild' );

        for ( const [ key, value ] of Object.entries( _default ) ) {
            _default[ key ] = typeof value != 'string' ? value : replaceVars( value );
        };

        return _default;
    };

    async set( key, val, secondVal ) {
        return new Promise( async ( resolve, reject ) => {
            let id = this._id ?? key,
                k = this._id ? key : val,
                v = this._id ? val : secondVal,
                json = this._id ? v : k,
                isJSON = checkType( json, 'object' );
            
            let server = isJSON ? json : { [ k ]: v },
                missing = Object.keys( this.default )
                    .filter( x => !Object.keys( server ).includes( x ) );
            
            for ( const missingKey of missing ) {
                let value = await this.get( this._id ? missingKey : id );
                    value = this._id ? value : value[ missingKey ];

                server[ missingKey ] = value;
            };

            server.id = id;

            
            try {
                await this._set( id, server );
            } catch ( e ) {
                reject( e );
            } finally {
                resolve( server );
            };
        } );
    };
    
    async get( key ) {
        return new Promise( async resolve => {
            let id = this._id ?? key,
                server = await this._get( id );
            
            if ( !server ) {
                server = {
                    ...this.default,
                    id
                };
            };

            Object.keys( this.default )
                .filter( x => !Object.keys( server ).includes( x ) )
                    .forEach( async missingKey => server[ missingKey ] = this.default[ missingKey ] );
            
            resolve( this._id ? server[ key ] : server );
        } );
    };

    async getAll() {
        return ( await this._getAll() ).map( JSON.parse );
    };

    async delete( key ) {
        return await this._delete( this._id ?? key );
    };
};


module.exports = GuildSettings;
module.exports.makeGlobal = true;