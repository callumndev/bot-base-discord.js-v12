class LibBase {
    constructor( options ) {
        this._options = options;
    };

    log( ...str ) {
        logger.log( chalk.blue( '[' + this._options.name + ']' ), chalk.bold( ...str ) );
    };
    
    error( ...str ) {
        logger.error( chalk.red( '[' + this._options.name + ' :: Error]' ), chalk.bold( ...str ) );
    };

    verbose( ...str ) {
        logger.verbose( chalk.blue( '[' + this._options.name + ']' ), chalk.grey( ...str ) );
    };
};


module.exports = LibBase;