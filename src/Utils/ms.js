let s = 1000,
    m = s * 60,
    h = m * 60,
    d = h * 24,
    w = d * 7,
    y = d * 365.25;

const plural = ( ms, msAbs, n, name ) => {
    let isPlural = msAbs >= n * 1.5;
    return Math.round( ms / n ) + ' ' + name + ( isPlural ? 's' : '' );
};


module.exports = {
    format: {
        short: ms => {
            let msAbs = Math.abs( ms );
            
            if ( msAbs >= d ) {
                return Math.round( ms / d ) + 'd';
            };
            if ( msAbs >= h ) {
                return Math.round( ms / h ) + 'h';
            };
            if ( msAbs >= m ) {
                return Math.round( ms / m ) + 'm';
            };
            if ( msAbs >= s ) {
                return Math.round( ms / s ) + 's';
            };

            return ms + 'ms';
        },

        long: ms => {
            let msAbs = Math.abs( ms );
            
            if ( msAbs >= d ) {
                return plural( ms, msAbs, d, 'day' );
            };
            if ( msAbs >= h ) {
                return plural( ms, msAbs, h, 'hour' );
            };
            if ( msAbs >= m ) {
                return plural( ms, msAbs, m, 'minute' );
            };
            if ( msAbs >= s ) {
                return plural( ms, msAbs, s, 'second' );
            };

            return ms + ' ms';
        }
    },
    convert: str => {
        str = String( str );
        
        if ( str.length > 100 ) return;
        
        let match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
            str
        );
        if ( !match ) return;
        
        let n = parseFloat( match[ 1 ] );
        let type = ( match[ 2 ] || 'ms' ).toLowerCase();
        
        switch ( type ) {
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
                return n * y;
                
            case 'weeks':
            case 'week':
            case 'w':
                return n * w;
                
            case 'days':
            case 'day':
            case 'd':
                return n * d;
            
            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
                return n * h;
                
            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
                return n * m;
                
            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
                return n * s;
                
            case 'milliseconds':
            case 'millisecond':
            case 'msecs':
            case 'msec':
            case 'ms':
                return n;
                
            default:
                return undefined;
        }
    }
};