module.exports = {
    isActivity( activity ) {
        return Data( 'activities' )?.includes( activity );
    },
    
    isEvent( event ) {
        return Data( 'events' )?.includes( event );
    },

    isStatus( status ) {
        return Data( 'statuses' )?.includes( status );
    },

    isStructure( structure ) {
        return Data( 'structures' )?.includes( structure );
    },
};