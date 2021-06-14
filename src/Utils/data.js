const _activities = Data( 'activities' ),
    _events = Data( 'events' ),
    _statuses = Data( 'statuses' ),
    _structures = Data( 'structures' );


module.exports = {
    isActivity( activity ) {
        return _activities?.includes( activity );
    },
    
    isEvent( event ) {
        return _events?.includes( event );
    },

    isStatus( status ) {
        return _statuses?.includes( status );
    },

    isStructure( structure ) {
        return _structures?.includes( structure );
    },
};