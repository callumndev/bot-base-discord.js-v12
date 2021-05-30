class LibBase {
    constructor( options ) {
        this._options = options;
        console.log( 'options', options )
    };

    log( str ) {
        console.log( '[' + this._options.name + ']', str )
    };
    
    error( str ) {
        console.log( '[' + this._options.name + ' :: Error]', str )
    };
};

module.exports = LibBase;