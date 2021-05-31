const logger = {};

logger.log = ( str ) => {
    console.log( chalk.blue( '[Log]' ), chalk.bold( str ) );
};

logger.error = ( str ) => {
    console.log( chalk.red( '[Error]' ), chalk.bold( str ) );
};

module.exports = logger;