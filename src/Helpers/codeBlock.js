module.exports = ( str, escapeStr = false ) => [
    '\`\`\`',
    !!escapeStr ? escape( str ) : str,
    '\`\`\`'
].join( '\n' );