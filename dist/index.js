"use strict";
var Context_1 = require("./Context");
exports.context = new Context_1.default();
function inject(id) {
    return exports.context.inject(id);
}
exports.inject = inject;
function register(id, instance) {
    exports.context.register(id, instance);
}
exports.register = register;
function resolve(idOrType) {
    return exports.context.resolve(idOrType);
}
exports.resolve = resolve;
