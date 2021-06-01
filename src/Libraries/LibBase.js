class LibBase {
    constructor( options ) {
        this._options = options;
    };

    log( ...str ) {
        console.log( chalk.blue( '[' + this._options.name + ']' ), chalk.bold( ...str ) );
    };
    
    error( ...str ) {
        console.log( chalk.red( '[' + this._options.name + ' :: Error]' ), chalk.bold( ...str ) );
    };
};

module.exports = LibBase;