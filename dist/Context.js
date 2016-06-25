"use strict";
var Context = (function () {
    function Context() {
        this.instances = {};
    }
    Context.prototype.register = function (id, instance) {
        this.instances[id] = instance;
    };
    Context.prototype.inject = function (id) {
        var _this = this;
        return function (proto, key) {
            Object.defineProperty(proto, key, {
                configurable: true,
                enumerable: true,
                get: function () { return _this.instances[id]; }
            });
        };
    };
    Context.prototype.resolve = function (idOrType) {
        if (typeof (idOrType) === "string") {
            return this.instances[idOrType];
        }
        else {
            for (var id in this.instances) {
                if (this.instances[id] instanceof idOrType) {
                    return this.instances[id];
                }
            }
        }
    };
    Context.prototype.clear = function () {
        this.instances = {};
    };
    return Context;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Context;
