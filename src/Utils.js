export default class Utils {
    static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }

    static isBoolean(value) {
        return typeof value === 'boolean';
    }

    static isObject(value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    static isArray(value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    static isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }

    static isFunction(value) {
        return typeof value === "function";
    }

    static isEmpty(obj) {
        if (!obj) {
            return true;
        }
        if (Utils.isArray(obj) && !obj.length) {
            return true;
        }
        if (Utils.isObject(obj)) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        return false;
    }
}
