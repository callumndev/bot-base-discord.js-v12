class LibBase {
    constructor( options ) {
        this.libOptions = options;
    };

    log( ...str ) {
        logger.log( chalk.blue( '[' + this.libOptions.name + ']' ), chalk.bold( ...str ) );
    };
    
    error( ...str ) {
        logger.error( chalk.red( '[' + this.libOptions.name + ' :: Error]' ), chalk.bold( ...str ) );
    };

    verbose( ...str ) {
        logger.verbose( chalk.blue( '[' + this.libOptions.name + ']' ), chalk.grey( ...str ) );
    };
};


module.exports = LibBase;