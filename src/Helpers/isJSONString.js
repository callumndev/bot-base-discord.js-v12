module.exports = str => {
    try {
        JSON.parse(str, ( k, v ) => {
            if ( k === '' && typeof v === 'number' ) {
                throw 'Invalid JSON';
            };

            return v;
        } );
        
        return true;
    } catch ( e ) {
        return false;
    };
};