module.exports = {
    isClass( c ) {
        return !!c?.toString()?.startsWith( 'class' );
    },

    name( c ) {
        return c?.name;
    },

    funcs( c ) {
        return Object.getOwnPropertyNames( c.prototype )?.filter( e => e != 'constructor' );
    }
};