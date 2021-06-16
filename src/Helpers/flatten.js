module.exports = (obj, roots = [], sep = '.') => Object.keys(obj).reduce((memo, prop) => Object.assign({}, memo, Object.prototype.toString.call(obj[prop]) === '[object Object]' ? flatten(obj[prop], roots.concat([prop])) : {
	[roots.concat([prop]).join(sep)]: obj[prop]
}), {});