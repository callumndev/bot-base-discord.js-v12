module.exports = {
    get formatted() {
        return moment( new Date() ).format( 'MMMM Do YYYY, h:mm:ss a' );
    }
};