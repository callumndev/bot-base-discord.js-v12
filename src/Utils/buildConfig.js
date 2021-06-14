module.exports = config => {
    // Restructure
    let _config = {};
    function restructure( obj, ...args ) {
        for ( const [ key, value ] of Object.entries( obj ) ) {
            if ( typeof value == 'object' ) {
                restructure( value, ...args, key );
            } else {
                _config[ [...args, key].join( '_' ) ] = value;
            };
        };
    };
    
    restructure( config );
    
    
    // Repalce Vars
    function replaceVars( str ) {
        for ( const [ key, value ] of Object.entries( _config ) ) {
            str = str?.replace( `{${ key }}`, value );
        };
    
        return str;
    };
    
    let c = {};
    for ( const [ key, value ] of Object.entries( _config ) ) {
        c[ key ] = typeof value != 'string' ? value : replaceVars( value );
    };
    
    
    // Export
    const _fs = require( 'fs' ),
        _path = require( 'path' )
        
    _fs.writeFileSync (
        _path.join( __dirname, '..', 'config.json' ),
        
        JSON.stringify( c )
    );
};