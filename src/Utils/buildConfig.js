module.exports = config => {
    let flattenedConfig = flatten( config );
    
    // Repalce Vars
    function replaceVars( str ) {
        for ( const [ key, value ] of Object.entries( flattenedConfig ) ) {
            str = str?.replace( `{${ key }}`, value );
        };
    
        return str;
    };
    
    let c = {};
    for ( const [ key, value ] of Object.entries( flattenedConfig ) ) {
        c[ key ] = typeof value != 'string' ? value : replaceVars( value );
    };
    
    
    // Export to JSON
    fs.writeFileSync (
        path.join( __dirname, '..', 'config.json' ),
        
        JSON.stringify( c )
    );
};