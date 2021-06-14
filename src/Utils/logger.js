console.stdlog = console.log.bind( console );
console.logs = [];
console.log = function() {
    console.logs.push( Array.from( arguments ) );
    console.stdlog.apply( console, arguments );
};


let suppresses = 0;
function suppress() {
    suppresses++;

    const suppressedLog = s => `Suppressed ${ s } logs`;
    let lastLog = console.logs[ console.logs.length - 1 ]?.toString();

    if ( !!lastLog.startsWith( 'Suppressed' ) ) {
        process.stdout.clearLine();
        process.stdout.cursorTo( 0 );
    } else {
        suppresses = 1;
    };
    
    process.stdout.write( suppressedLog( suppresses ) );
    console.logs.push( suppressedLog( suppresses ) );
};

module.exports = {
    log( ...str ) {
        console.log( chalk.blue( '[Log]' ), chalk.bold( ...str ) );
    },

    error( ...str ) {
        console.log( chalk.red( '[Error]' ), chalk.bold( ...str ) );
    },

    verbose( ...str ) {
        if ( _Config.logs_suppress_verbose )
            suppress();
        else
            console.log( chalk.blue( '[Verbose]' ), chalk.grey( ...str ) );
    }
};