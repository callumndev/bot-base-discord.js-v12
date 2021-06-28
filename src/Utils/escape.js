const { Util } = dep( 'discord.js' );

module.exports = (
    str, codeBlock = true, inlineCode = true, bold = true, italic = true, 
    underline = true, strikethrough = true, spoiler = true, codeBlockContent = true, inlineCodeContent = true
) => {
    try {
        return Util.escapeMarkdown( str, {
            codeBlock,
            inlineCode,
            bold,
            italic,
            underline,
            strikethrough,
            spoiler,
            codeBlockContent,
            inlineCodeContent
        } );
    } catch ( e ) {
        return str;
    }
};